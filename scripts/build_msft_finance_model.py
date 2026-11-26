#!/usr/bin/env python3
"""Build the Microsoft company finance model for /data-analytics.

Downloads the SEC XBRL companyfacts JSON for Microsoft (CIK 0000789019),
extracts annual FY facts, and writes scripts/msft-finance-metrics.json plus
three charts under public/images/msft-finance/.

Historical figures are reported facts from 10-K filings. Scenario assumptions
are explicitly ILLUSTRATIVE: they are choices made for this exercise, not
management guidance and not a forecast.
"""

from __future__ import annotations

import datetime as dt
import json
from pathlib import Path
from urllib.request import Request, urlopen

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "msft-finance"
OUT.mkdir(parents=True, exist_ok=True)
CACHE = Path("/tmp/msft-facts.json")
URL = "https://data.sec.gov/api/xbrl/companyfacts/CIK0000789019.json"

INK = "#1b2a42"
ACC = "#264a80"
SAGE = "#5c6b82"
GRID = "#d7dfe9"


def fetch() -> dict:
    if not CACHE.exists():
        req = Request(URL, headers={"User-Agent": "PortfolioResearch/1.0 research@example.com"})
        CACHE.write_bytes(urlopen(req, timeout=60).read())
    return json.loads(CACHE.read_text())


def annual_series(facts: dict, tag: str, instant: bool = False) -> dict[int, float]:
    node = facts["facts"]["us-gaap"].get(tag)
    if not node:
        return {}
    out: dict[int, float] = {}
    for u in node["units"].get("USD", []):
        if u.get("form") != "10-K" or u.get("fp") != "FY":
            continue
        end = dt.date.fromisoformat(u["end"])
        if end.month != 6:
            continue
        if not instant:
            if "start" not in u:
                continue
            start = dt.date.fromisoformat(u["start"])
            if not 350 <= (end - start).days <= 380:
                continue
        year = end.year
        prev = out.get(year)
        if prev is None or u["filed"] > prev[1]:
            out[year] = (float(u["val"]), u["filed"])
    return {y: v[0] for y, v in out.items()}


def style(ax) -> None:
    ax.set_facecolor("white")
    ax.grid(axis="y", color=GRID, linewidth=0.6, alpha=0.7)
    ax.set_axisbelow(True)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.tick_params(colors=SAGE, labelsize=9)


def main() -> None:
    facts = fetch()
    tags = {
        "revenue": "RevenueFromContractWithCustomerExcludingAssessedTax",
        "gross_profit": "GrossProfit",
        "operating_income": "OperatingIncomeLoss",
        "net_income": "NetIncomeLoss",
        "rnd": "ResearchAndDevelopmentExpense",
        "ocf": "NetCashProvidedByUsedInOperatingActivities",
        "capex": "PaymentsToAcquirePropertyPlantAndEquipment",
        "assets": "Assets",
        "liabilities": "Liabilities",
    }
    series = {k: annual_series(facts, t, instant=k in ("assets", "liabilities"))
              for k, t in tags.items()}
    years = [2022, 2023, 2024, 2025, 2026]
    missing = [k for k in series if any(y not in series[k] for y in years)]
    if missing:
        raise RuntimeError(f"missing FY facts for: {missing}")

    hist = {}
    for k in series:
        hist[k] = [round(series[k][y] / 1e6, 1) for y in years]
    growth = [round((hist["revenue"][i] / hist["revenue"][i - 1] - 1) * 100, 2)
              for i in range(1, len(years))]
    gm = [round(hist["gross_profit"][i] / hist["revenue"][i] * 100, 2)
          for i in range(len(years))]
    other_opex = [round(hist["gross_profit"][i] - hist["rnd"][i] - hist["operating_income"][i], 1)
                  for i in range(len(years))]
    other_pct = [round(other_opex[i] / hist["revenue"][i] * 100, 2) for i in range(len(years))]
    rnd_pct = [round(hist["rnd"][i] / hist["revenue"][i] * 100, 2) for i in range(len(years))]

    base_growth = float(np.median(growth))
    base_gm = float(np.median(gm))
    base_rnd = float(np.median(rnd_pct))
    base_other = float(np.median(other_pct))

    scenarios = {
        "base": {"growth": round(base_growth, 2), "gm": round(base_gm, 2)},
        "upside": {"growth": round(base_growth + 2, 2), "gm": round(base_gm + 1, 2)},
        "downside": {"growth": round(base_growth - 3, 2), "gm": round(base_gm - 2, 2)},
    }
    projections = {}
    for name, a in scenarios.items():
        rev = hist["revenue"][-1]
        rows = []
        for y in (2027, 2028, 2029):
            rev = rev * (1 + a["growth"] / 100)
            gp = rev * a["gm"] / 100
            rnd = rev * base_rnd / 100
            other = rev * base_other / 100
            op = gp - rnd - other
            rows.append({"year": y, "revenue": round(rev, 1), "gross_profit": round(gp, 1),
                         "operating_income": round(op, 1), "operating_margin_pct": round(op / rev * 100, 2)})
        projections[name] = rows

    # Sensitivity: FY2029 operating income across growth and gross margin.
    sens = []
    for g in [base_growth - 3, base_growth - 1.5, base_growth, base_growth + 1.5, base_growth + 3]:
        row = []
        for m in [base_gm - 2, base_gm - 1, base_gm, base_gm + 1, base_gm + 2]:
            rev = hist["revenue"][-1] * (1 + g / 100) ** 3
            op = rev * (m - base_rnd - base_other) / 100
            row.append(round(op, 1))
        sens.append({"growth_pct": round(g, 2), "values": row})
    gm_axis = [round(base_gm + d, 2) for d in (-2, -1, 0, 1, 2)]

    metrics = {
        "entity": facts.get("entityName"),
        "cik": "0000789019",
        "source": URL,
        "fiscal_years": years,
        "historical_usd_m": hist,
        "revenue_growth_pct": growth,
        "gross_margin_pct": gm,
        "rnd_pct_of_revenue": rnd_pct,
        "other_opex_pct_of_revenue": other_pct,
        "assumptions_illustrative": {
            "growth_pct": round(base_growth, 2),
            "gross_margin_pct": round(base_gm, 2),
            "rnd_pct": round(base_rnd, 2),
            "other_opex_pct": round(base_other, 2),
        },
        "scenarios": scenarios,
        "projections": projections,
        "sensitivity_growth_axis": [round(r["growth_pct"], 2) for r in sens],
        "sensitivity_gm_axis": gm_axis,
        "sensitivity_operating_income_usd_m": [r["values"] for r in sens],
    }
    (ROOT / "scripts" / "msft-finance-metrics.json").write_text(
        json.dumps(metrics, indent=2, sort_keys=True) + "\n"
    )

    fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
    ax.bar([str(y) for y in years], hist["revenue"], color=ACC, width=0.6)
    ax2 = ax.twinx()
    ax2.plot([str(y) for y in years], gm, color=SAGE, marker="o", linewidth=2)
    ax2.set_ylabel("Gross margin %", color=SAGE)
    ax.set_ylabel("Revenue, USD m")
    ax.set_title("Microsoft revenue and gross margin, FY2022-FY2026", color=INK, fontsize=12, loc="left")
    style(ax)
    fig.tight_layout()
    fig.savefig(OUT / "history.png")
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
    xs = [2026, 2027, 2028, 2029]
    for label, color in [("base", ACC), ("upside", SAGE), ("downside", "#b45309")]:
        vals = [hist["revenue"][-1]] + [r["revenue"] for r in projections[label]]
        ax.plot(xs, vals, marker="o", label=label, color=color, linewidth=1.8)
    ax.set_ylabel("Revenue, USD m")
    ax.set_title("Illustrative revenue scenarios", color=INK, fontsize=12, loc="left")
    ax.legend(frameon=False, fontsize=9)
    style(ax)
    fig.tight_layout()
    fig.savefig(OUT / "scenarios.png")
    plt.close(fig)

    data = np.array([r["values"] for r in sens]) / 1000
    fig, ax = plt.subplots(figsize=(8, 3.6), dpi=160)
    im = ax.imshow(data, cmap="Blues", aspect="auto")
    ax.set_xticks(range(len(gm_axis)))
    ax.set_xticklabels([f"{g:.0f}%" for g in gm_axis])
    ax.set_yticks(range(len(sens)))
    ax.set_yticklabels([f"{r['growth_pct']:.1f}%" for r in sens])
    ax.set_xlabel("Gross margin")
    ax.set_ylabel("Revenue growth")
    for i in range(data.shape[0]):
        for j in range(data.shape[1]):
            ax.text(j, i, f"{data[i, j]:.0f}", ha="center", va="center",
                    color="white" if data[i, j] > np.median(data) else INK, fontsize=9)
    ax.set_title("FY2029 operating income, USD bn", color=INK, fontsize=12, loc="left")
    fig.colorbar(im, ax=ax, shrink=0.8)
    fig.tight_layout()
    fig.savefig(OUT / "sensitivity.png")
    plt.close(fig)

    print(json.dumps({"entity": metrics["entity"], "assumptions": metrics["assumptions_illustrative"],
                      "base_projection": projections["base"]}, indent=2))


if __name__ == "__main__":
    main()
