#!/usr/bin/env python3
"""Build the public-data analytics demos for /data-analytics.

Downloads three public CSVs, computes the metrics quoted in the case studies,
and writes the charts to public/images/data-analytics/. Every number in the
MDX files comes from metrics.json produced by this script.

Sources:
  Sales:  SampleSuperstore.csv, yashbhanu/EDA--Exploratory-Data-Analysis--SampleSuperstore
  HR:     WA_Fn-UseC_-HR-Employee-Attrition.csv, mrc03/IBM-HR-Analytics-Employee-Attrition-Performance
  Finance: finance-charts-apple.csv, plotly/datasets (Yahoo Finance OHLC)
"""

from __future__ import annotations

import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "data-analytics"
OUT.mkdir(parents=True, exist_ok=True)
CACHE = Path("/tmp/da-demos")
CACHE.mkdir(exist_ok=True)

SOURCES = {
    "sales": "https://raw.githubusercontent.com/yashbhanu/EDA--Exploratory-Data-Analysis--SampleSuperstore/main/SampleSuperstore.csv",
    "hr": "https://raw.githubusercontent.com/mrc03/IBM-HR-Analytics-Employee-Attrition-Performance/master/WA_Fn-UseC_-HR-Employee-Attrition.csv",
    "finance": "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv",
}

INK = "#1b2a42"
ACC = "#264a80"
SAGE = "#5c6b82"
GRID = "#d7dfe9"


def load(name: str) -> pd.DataFrame:
    target = CACHE / f"{name}.csv"
    if not target.exists():
        import urllib.request

        urllib.request.urlretrieve(SOURCES[name], target)
    if name == "hr":
        return pd.read_csv(target, encoding="utf-8-sig")
    return pd.read_csv(target)


def style(ax) -> None:
    ax.set_facecolor("white")
    ax.grid(axis="y", color=GRID, linewidth=0.6, alpha=0.7)
    ax.set_axisbelow(True)
    for spine in ("top", "right"):
        ax.spines[spine].set_visible(False)
    ax.tick_params(colors=SAGE, labelsize=9)
    ax.yaxis.label.set_color(SAGE)
    ax.xaxis.label.set_color(SAGE)


def r2(x: float) -> float:
    return round(float(x), 2)


metrics: dict = {}

# ---------------------------------------------------------------- sales
sales = load("sales")
sales_total = sales["Sales"].sum()
profit_total = sales["Profit"].sum()
margin = profit_total / sales_total * 100
by_cat = sales.groupby("Category")[["Sales", "Profit"]].sum().sort_values("Sales", ascending=False)
by_seg = sales.groupby("Segment")["Sales"].sum().sort_values(ascending=False)
loss_share = (sales["Profit"] < 0).mean() * 100
sales["discount_band"] = pd.cut(
    sales["Discount"],
    bins=[-0.01, 0.001, 0.15, 0.30, 0.50, 1.0],
    labels=["0%", "1-15%", "16-30%", "31-50%", "51%+"],
)
band_margin = sales.groupby("discount_band", observed=True).apply(
    lambda g: g["Profit"].sum() / g["Sales"].sum() * 100
)
corr_discount_margin = sales["Discount"].corr(sales["Profit"] / sales["Sales"])

metrics["sales"] = {
    "rows": len(sales),
    "sales_total": r2(sales_total),
    "profit_total": r2(profit_total),
    "margin_pct": r2(margin),
    "loss_order_share_pct": r2(loss_share),
    "top_segment": str(by_seg.index[0]),
    "top_segment_sales": r2(by_seg.iloc[0]),
    "best_profit_category": str(by_cat["Profit"].idxmax()),
    "worst_profit_category": str(by_cat["Profit"].idxmin()),
    "worst_profit_value": r2(by_cat["Profit"].min()),
    "corr_discount_margin": r2(corr_discount_margin),
    "margin_by_discount": {str(k): r2(v) for k, v in band_margin.items()},
}

fig, ax = plt.subplots(figsize=(8, 3.6), dpi=160)
x = np.arange(len(by_cat))
w = 0.38
ax.bar(x - w / 2, by_cat["Sales"] / 1000, w, label="Sales", color=ACC)
ax.bar(x + w / 2, by_cat["Profit"] / 1000, w, label="Profit", color=SAGE)
ax.set_xticks(x)
ax.set_xticklabels(by_cat.index)
ax.set_ylabel("USD thousands")
ax.set_title("Sales and profit by category", color=INK, fontsize=12, loc="left")
ax.legend(frameon=False, fontsize=9)
style(ax)
fig.tight_layout()
fig.savefig(OUT / "sales-category.png", bbox_inches="tight")
plt.close(fig)

fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
ax.plot(band_margin.index.astype(str), band_margin.values, marker="o", color=ACC, linewidth=2)
ax.axhline(0, color=SAGE, linewidth=0.8)
ax.set_ylabel("Margin %")
ax.set_title("Margin collapses as discount rises", color=INK, fontsize=12, loc="left")
style(ax)
fig.tight_layout()
fig.savefig(OUT / "sales-discount.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------- hr
hr = load("hr")
attr_rate = (hr["Attrition"] == "Yes").mean() * 100
by_ot = hr.groupby("OverTime")["Attrition"].apply(lambda s: (s == "Yes").mean() * 100)
by_dept = hr.groupby("Department")["Attrition"].apply(lambda s: (s == "Yes").mean() * 100).sort_values(ascending=False)
income_yes = hr.loc[hr["Attrition"] == "Yes", "MonthlyIncome"].mean()
income_no = hr.loc[hr["Attrition"] == "No", "MonthlyIncome"].mean()
by_sat = hr.groupby("JobSatisfaction")["Attrition"].apply(lambda s: (s == "Yes").mean() * 100)
corr_income_attr = hr["MonthlyIncome"].corr((hr["Attrition"] == "Yes").astype(int))

metrics["hr"] = {
    "employees": len(hr),
    "attrition_rate_pct": r2(attr_rate),
    "attrition_overtime_yes_pct": r2(by_ot.get("Yes", 0)),
    "attrition_overtime_no_pct": r2(by_ot.get("No", 0)),
    "top_attrition_department": str(by_dept.index[0]),
    "top_attrition_department_pct": r2(by_dept.iloc[0]),
    "mean_income_leavers": r2(income_yes),
    "mean_income_stayers": r2(income_no),
    "income_gap_pct": r2((income_no - income_yes) / income_no * 100),
    "corr_income_attrition": r2(corr_income_attr),
    "attrition_by_job_satisfaction": {str(k): r2(v) for k, v in by_sat.items()},
}

fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
ax.bar(by_dept.index, by_dept.values, color=ACC, width=0.55)
ax.axhline(attr_rate, color=SAGE, linestyle="--", linewidth=1, label=f"Overall {r2(attr_rate)}%")
ax.set_ylabel("Attrition %")
ax.set_title("Attrition by department", color=INK, fontsize=12, loc="left")
ax.legend(frameon=False, fontsize=9)
style(ax)
fig.tight_layout()
fig.savefig(OUT / "hr-department.png", bbox_inches="tight")
plt.close(fig)

fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
ax.bar(["Overtime", "No overtime"], [by_ot["Yes"], by_ot["No"]], color=[ACC, SAGE], width=0.5)
ax.set_ylabel("Attrition %")
ax.set_title("Overtime is the strongest single split", color=INK, fontsize=12, loc="left")
style(ax)
fig.tight_layout()
fig.savefig(OUT / "hr-overtime.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------- finance
fin = load("finance")
fin["date"] = pd.to_datetime(fin["Date"])
fin = fin.sort_values("date").reset_index(drop=True)
price = fin["AAPL.Adjusted"].astype(float)
ret = price.pct_change().dropna()
cum = (1 + ret).prod() - 1
vol = ret.std() * np.sqrt(252) * 100
running_max = price.cummax()
drawdown = (price / running_max - 1) * 100
max_dd = drawdown.min()
var95 = np.percentile(ret, 5) * 100
pos_share = (ret > 0).mean() * 100

metrics["finance"] = {
    "rows": len(fin),
    "start": str(fin["date"].iloc[0].date()),
    "end": str(fin["date"].iloc[-1].date()),
    "start_price": r2(price.iloc[0]),
    "end_price": r2(price.iloc[-1]),
    "cumulative_return_pct": r2(cum * 100),
    "annualized_volatility_pct": r2(vol),
    "max_drawdown_pct": r2(max_dd),
    "historical_var95_daily_pct": r2(var95),
    "positive_day_share_pct": r2(pos_share),
}

fig, ax = plt.subplots(figsize=(8, 3.2), dpi=160)
ax.plot(fin["date"], price, color=ACC, linewidth=1.5)
ax.set_ylabel("Adjusted close (USD)")
ax.set_title("Apple adjusted close, 2015-2017", color=INK, fontsize=12, loc="left")
style(ax)
fig.tight_layout()
fig.savefig(OUT / "finance-price.png", bbox_inches="tight")
plt.close(fig)

fig, ax = plt.subplots(figsize=(8, 3.2), dpi=160)
ax.plot(fin["date"], drawdown, color=SAGE, linewidth=1.2)
ax.fill_between(fin["date"], drawdown, 0, color=SAGE, alpha=0.18)
ax.set_ylabel("Drawdown %")
ax.set_title("Drawdown from running peak", color=INK, fontsize=12, loc="left")
style(ax)
fig.tight_layout()
fig.savefig(OUT / "finance-drawdown.png", bbox_inches="tight")
plt.close(fig)

(ROOT / "scripts" / "data-analytics-metrics.json").write_text(
    json.dumps(metrics, indent=2, sort_keys=True) + "\n"
)
print(json.dumps(metrics, indent=2, sort_keys=True))
