#!/usr/bin/env python3
"""Build the public-data analytics demos for /data-analytics.

Downloads three public CSVs, computes the metrics quoted in the case studies,
and writes the charts to public/images/data-analytics/. Every number in the
MDX files comes from metrics.json produced by this script.

Figure sizes are exactly figsize * dpi at 160 dpi. Do not pass
bbox_inches="tight": the MDX declares those dimensions and a cropped canvas
would stretch or clip the image.

Sources:
  Sales:  SampleSuperstore.csv, yashbhanu/EDA--Exploratory-Data-Analysis--SampleSuperstore
  HR:     WA_Fn-UseC_-HR-Employee-Attrition.csv, mrc03/IBM-HR-Analytics-Employee-Attrition-Performance
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
}
EXPECTED_ROWS = {"sales": 9994, "hr": 1470}

INK = "#1b2a42"
ACC = "#264a80"
SAGE = "#5c6b82"
GRID = "#d7dfe9"


def load(name: str) -> pd.DataFrame:
    target = CACHE / f"{name}.csv"
    if not target.exists():
        import urllib.request

        urllib.request.urlretrieve(SOURCES[name], target)
    frame = (
        pd.read_csv(target, encoding="utf-8-sig")
        if name == "hr"
        else pd.read_csv(target)
    )
    assert len(frame) == EXPECTED_ROWS[name], (
        f"{name}: expected {EXPECTED_ROWS[name]} rows, got {len(frame)}. "
        "Refusing to compute from a stale or foreign CSV."
    )
    return frame


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
    lambda g: g["Profit"].sum() / g["Sales"].sum() * 100, include_groups=False
)
sales["row_margin"] = sales["Profit"] / sales["Sales"]
corr_discount_margin = sales["Discount"].corr(sales["row_margin"])


def eta_squared(column: str) -> float:
    overall = sales["row_margin"].mean()
    between = sum(
        len(g) * (g["row_margin"].mean() - overall) ** 2
        for _, g in sales.groupby(column, observed=True)
    )
    total = ((sales["row_margin"] - overall) ** 2).sum()
    return float(between / total)


eta_by_band = eta_squared("discount_band")
eta_by_category = eta_squared("Category")
eta_by_segment = eta_squared("Segment")
high_band = sales[sales["discount_band"] == "51%+"]
band_loss = high_band.loc[high_band["Profit"] < 0, "Profit"].abs()
top5_share = band_loss.nlargest(5).sum() / band_loss.sum() * 100

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
    "eta_squared_discount_band": round(eta_by_band, 4),
    "eta_squared_category": round(eta_by_category, 4),
    "eta_squared_segment": round(eta_by_segment, 4),
    "margin_by_discount": {str(k): r2(v) for k, v in band_margin.items()},
    "high_discount_band_rows": len(high_band),
    "high_discount_band_loss_share_pct": r2((high_band["Profit"] < 0).mean() * 100),
    "high_discount_top5_loss_share_pct": r2(top5_share),
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
fig.savefig(OUT / "sales-category.png")
plt.close(fig)

fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
ax.plot(band_margin.index.astype(str), band_margin.values, marker="o", color=ACC, linewidth=2)
ax.axhline(0, color=SAGE, linewidth=0.8)
ax.set_ylabel("Aggregate margin %")
ax.set_title("Aggregate margin by discount band", color=INK, fontsize=12, loc="left")
style(ax)
fig.tight_layout()
fig.savefig(OUT / "sales-discount.png")
plt.close(fig)

# ---------------------------------------------------------------- hr
hr = load("hr")
attr_rate = (hr["Attrition"] == "Yes").mean() * 100
by_ot = hr.groupby("OverTime")["Attrition"].apply(lambda s: (s == "Yes").mean() * 100)
by_dept = hr.groupby("Department")["Attrition"].apply(lambda s: (s == "Yes").mean() * 100).sort_values(ascending=False)
by_role = hr.groupby("JobRole")["Attrition"].apply(lambda s: (s == "Yes").mean() * 100).sort_values(ascending=False)
income_yes = hr.loc[hr["Attrition"] == "Yes", "MonthlyIncome"].mean()
income_no = hr.loc[hr["Attrition"] == "No", "MonthlyIncome"].mean()
by_sat = hr.groupby("JobSatisfaction")["Attrition"].apply(lambda s: (s == "Yes").mean() * 100)
corr_income_attr = hr["MonthlyIncome"].corr((hr["Attrition"] == "Yes").astype(int))

# Rank categorical splits so the article never names a "strongest" split it
# did not actually compute.
categorical = [
    "JobRole", "Department", "JobInvolvement", "JobLevel", "OverTime",
    "BusinessTravel", "MaritalStatus", "JobSatisfaction", "WorkLifeBalance",
    "TrainingTimesLastYear", "StockOptionLevel", "Education", "EducationField",
    "EnvironmentSatisfaction", "RelationshipSatisfaction", "PerformanceRating",
    "Gender", "Over18",
]
split_rows = []
for col in categorical:
    rates = hr.groupby(col)["Attrition"].apply(lambda s: (s == "Yes").mean() * 100)
    spread = rates.max() - rates.min()
    binary_gap = 0.0
    binary_label = ""
    for value, idx in rates.items():
        inside = hr[col] == value
        gap = abs(hr.loc[inside, "Attrition"].eq("Yes").mean() * 100 - attr_rate)
        if gap > binary_gap:
            binary_gap, binary_label = gap, str(value)
    split_rows.append(
        {
            "column": col,
            "spread_pp": r2(spread),
            "best_binary": binary_label,
            "best_binary_gap_pp": r2(binary_gap),
        }
    )
split_ranking = sorted(split_rows, key=lambda r: r["spread_pp"], reverse=True)

metrics["hr"] = {
    "employees": len(hr),
    "attrition_rate_pct": r2(attr_rate),
    "attrition_overtime_yes_pct": r2(by_ot.get("Yes", 0)),
    "attrition_overtime_no_pct": r2(by_ot.get("No", 0)),
    "overtime_gap_pp": r2(by_ot.get("Yes", 0) - by_ot.get("No", 0)),
    "top_attrition_department": str(by_dept.index[0]),
    "top_attrition_department_pct": r2(by_dept.iloc[0]),
    "top_attrition_job_role": str(by_role.index[0]),
    "top_attrition_job_role_pct": r2(by_role.iloc[0]),
    "bottom_attrition_job_role": str(by_role.index[-1]),
    "bottom_attrition_job_role_pct": r2(by_role.iloc[-1]),
    "mean_income_leavers": r2(income_yes),
    "mean_income_stayers": r2(income_no),
    "income_gap_pct": r2((income_no - income_yes) / income_no * 100),
    "corr_income_attrition": r2(corr_income_attr),
    "attrition_by_job_satisfaction": {str(k): r2(v) for k, v in by_sat.items()},
    "split_ranking": split_ranking,
    "columns_available": [
        "PerformanceRating", "YearsWithCurrManager", "YearsInCurrentRole"
    ],
}

fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
ax.bar(by_role.index, by_role.values, color=ACC, width=0.55)
ax.axhline(attr_rate, color=SAGE, linestyle="--", linewidth=1, label=f"Overall {r2(attr_rate)}%")
ax.set_ylabel("Attrition %")
ax.set_title("Attrition by job role", color=INK, fontsize=12, loc="left")
ax.legend(frameon=False, fontsize=9)
ax.tick_params(axis="x", rotation=20)
style(ax)
fig.tight_layout()
fig.savefig(OUT / "hr-jobrole.png")
plt.close(fig)

fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
ax.bar(by_dept.index, by_dept.values, color=ACC, width=0.55)
ax.axhline(attr_rate, color=SAGE, linestyle="--", linewidth=1, label=f"Overall {r2(attr_rate)}%")
ax.set_ylabel("Attrition %")
ax.set_title("Attrition by department", color=INK, fontsize=12, loc="left")
ax.legend(frameon=False, fontsize=9)
style(ax)
fig.tight_layout()
fig.savefig(OUT / "hr-department.png")
plt.close(fig)

fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
ax.bar(["Overtime", "No overtime"], [by_ot["Yes"], by_ot["No"]], color=[ACC, SAGE], width=0.5)
ax.set_ylabel("Attrition %")
ax.set_title("Attrition by overtime status", color=INK, fontsize=12, loc="left")
style(ax)
fig.tight_layout()
fig.savefig(OUT / "hr-overtime.png")
plt.close(fig)

(ROOT / "scripts" / "data-analytics-metrics.json").write_text(
    json.dumps(metrics, indent=2, sort_keys=True) + "\n"
)
print(json.dumps(metrics, indent=2, sort_keys=True))
