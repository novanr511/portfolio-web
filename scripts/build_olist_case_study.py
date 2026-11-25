#!/usr/bin/env python3
"""Reproduce the Olist delivery-risk case study.

Downloads the eight public CSVs into /tmp/olist, builds a SQLite database,
runs every SQL file in sql/olist/ against it, writes scripts/olist-metrics.json
and three charts under public/images/olist/.

The SQL files are the analytical artefact. This script only wires them up.
Every number on /data-analytics/olist-delivery-risk comes from the JSON here.
"""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
SQL_DIR = ROOT / "sql" / "olist"
OUT = ROOT / "public" / "images" / "olist"
OUT.mkdir(parents=True, exist_ok=True)
RAW = Path("/tmp/olist")
RAW.mkdir(exist_ok=True)
DB = Path("/tmp/olist.db")

BASE = "https://raw.githubusercontent.com/ruan-narici/brazilian-ecommerce-analytics/main/src/data/"
FILES = {
    "orders": "olist_orders_dataset.csv",
    "order_items": "olist_order_items_dataset.csv",
    "customers": "olist_customers_dataset.csv",
    "sellers": "olist_sellers_dataset.csv",
    "products": "olist_products_dataset.csv",
    "order_reviews": "olist_order_reviews_dataset.csv",
    "order_payments": "olist_order_payments_dataset.csv",
    "category_translation": "product_category_name_translation.csv",
}
EXPECTED = {
    "orders": 99441, "order_items": 112650, "customers": 99441,
    "sellers": 3095, "products": 32951, "order_reviews": 99224,
    "order_payments": 103886, "category_translation": 71,
}

INK = "#1b2a42"
ACC = "#264a80"
SAGE = "#5c6b82"
GRID = "#d7dfe9"


def load_csvs() -> dict[str, pd.DataFrame]:
    frames = {}
    for table, filename in FILES.items():
        target = RAW / filename
        if not target.exists():
            import urllib.request
            urllib.request.urlretrieve(BASE + filename, target)
        frame = pd.read_csv(target, encoding="utf-8-sig")
        assert len(frame) == EXPECTED[table], (
            f"{table}: expected {EXPECTED[table]} rows, got {len(frame)}"
        )
        frames[table] = frame
    return frames


def build_db(frames: dict[str, pd.DataFrame]) -> sqlite3.Connection:
    if DB.exists():
        DB.unlink()
    conn = sqlite3.connect(DB)
    ddl = (SQL_DIR / "00_schema.sql").read_text()
    conn.executescript(ddl)
    for table, frame in frames.items():
        frame.to_sql(table, conn, if_exists="append", index=False)
    conn.commit()
    return conn


def run_queries(conn: sqlite3.Connection) -> dict:
    results = {}
    for path in sorted(SQL_DIR.glob("*.sql")):
        if path.name.startswith("00_"):
            continue
        sql = path.read_text()
        cur = conn.execute(sql)
        columns = [d[0] for d in cur.description]
        rows = [dict(zip(columns, r)) for r in cur.fetchall()]
        results[path.stem] = rows
    return results


def style(ax) -> None:
    ax.set_facecolor("white")
    ax.grid(axis="y", color=GRID, linewidth=0.6, alpha=0.7)
    ax.set_axisbelow(True)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.tick_params(colors=SAGE, labelsize=9)


def main() -> None:
    frames = load_csvs()
    conn = build_db(frames)
    q = run_queries(conn)

    status = {r["order_status"]: r["orders"] for r in q["01_order_status_mix"]}
    states = q["03_late_rate_by_state"]
    late_gmv = q["04_late_gmv_by_state"]
    cancellations = {r["order_status"]: r for r in q["06_cancellation_gmv"]}
    review = {r["delivery_band"]: r for r in q["07_review_score_vs_late"]}

    total_orders = sum(status.values())
    delivered = status.get("delivered", 0)
    late_orders_all = conn.execute(
        "SELECT COUNT(*) FROM orders WHERE order_delivered_customer_date IS NOT NULL "
        "AND order_delivered_customer_date > order_estimated_delivery_date"
    ).fetchone()[0]
    # q03 keeps only states with at least 100 delivered orders.
    late_orders = sum(r["late_orders"] for r in q["03_late_rate_by_state"])
    late_gmv_total = sum(r["late_gmv_brl"] for r in late_gmv)
    top5_gmv = sum(r["late_gmv_brl"] for r in late_gmv[:5])
    metrics = {
        "rows": {k: len(v) for k, v in frames.items()},
        "purchase_start": frames["orders"]["order_purchase_timestamp"].min()[:10],
        "purchase_end": frames["orders"]["order_purchase_timestamp"].max()[:10],
        "total_orders": total_orders,
        "delivered_orders": delivered,
        "late_orders_all": late_orders_all,
        "late_orders_in_ranked_states": late_orders,
        "late_rate_all_pct": round(100 * late_orders_all / delivered, 2),
        "late_rate_pct": round(100 * late_orders / delivered, 2),
        "late_gmv_brl": round(late_gmv_total, 2),
        "top5_state_late_gmv_brl": round(top5_gmv, 2),
        "top5_state_late_gmv_share_pct": round(100 * top5_gmv / late_gmv_total, 2),
        "cancelled_orders": cancellations.get("canceled", {}).get("orders", 0),
        "cancelled_gmv_brl": cancellations.get("canceled", {}).get("gmv_brl", 0),
        "unavailable_gmv_brl": cancellations.get("unavailable", {}).get("gmv_brl", 0),
        "avg_review_late": review.get("late", {}).get("avg_score"),
        "avg_review_other": review.get("on_time_or_unknown", {}).get("avg_score"),
        "queries": q,
    }
    (ROOT / "scripts" / "olist-metrics.json").write_text(
        json.dumps(metrics, indent=2, sort_keys=True) + "\n"
    )

    top_states = states[:8]
    fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
    ax.bar([r["customer_state"] for r in top_states],
           [r["late_rate_pct"] for r in top_states], color=ACC, width=0.6)
    ax.set_ylabel("Late deliveries %")
    ax.set_title("Late-delivery rate by state", color=INK, fontsize=12, loc="left")
    style(ax)
    fig.tight_layout()
    fig.savefig(OUT / "state-late-rate.png")
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(8, 3.4), dpi=160)
    ax.bar([r["customer_state"] for r in late_gmv[:5]],
           [r["late_gmv_brl"] / 1000 for r in late_gmv[:5]], color=SAGE, width=0.6)
    ax.set_ylabel("BRL thousands")
    ax.set_title("GMV exposed to late delivery, top five states", color=INK, fontsize=12, loc="left")
    style(ax)
    fig.tight_layout()
    fig.savefig(OUT / "late-gmv-state.png")
    plt.close(fig)

    monthly = q["02_monthly_revenue"][:24]
    fig, ax = plt.subplots(figsize=(8, 3.2), dpi=160)
    ax.plot([r["month"] for r in monthly], [r["gmv_brl"] / 1000 for r in monthly],
            color=ACC, linewidth=1.6)
    ax.set_ylabel("GMV, BRL thousands")
    ax.set_title("Monthly GMV, first 24 months", color=INK, fontsize=12, loc="left")
    ax.tick_params(axis="x", rotation=45)
    style(ax)
    fig.tight_layout()
    fig.savefig(OUT / "monthly-gmv.png")
    plt.close(fig)

    # Grain diagram: one fact table with four dimensions and their keys.
    fig, ax = plt.subplots(figsize=(10, 4.4), dpi=160)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.4)
    ax.axis("off")
    from matplotlib.patches import FancyBboxPatch

    def box(x, y, w, h, label, color=ACC):
        p = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.04",
                           linewidth=1.4, edgecolor=color, facecolor="#eef3f9")
        ax.add_patch(p)
        ax.text(x + w / 2, y + h / 2, label, ha="center", va="center", fontsize=9.5, color=INK)

    box(3.6, 1.65, 2.8, 1.05, "fact_orders\ngrain: one order")
    for x, y, label in [(0.4, 2.9, "dim_customer\ncustomer_id"),
                        (0.4, 0.5, "dim_date\norder_purchase_timestamp"),
                        (7.0, 2.9, "dim_seller\nseller_id"),
                        (7.0, 0.5, "dim_product\nproduct_id")]:
        box(x, y, 2.6, 0.9, label, SAGE)
    ax.text(5, 4.15, "Olist analytical model: grain and join keys", fontsize=13,
            color=INK, ha="center", fontweight="bold")
    ax.text(5, 0.12, "order_items bridges orders to sellers and products at line-item grain.",
            fontsize=9.5, color=SAGE, ha="center")
    fig.tight_layout()
    fig.savefig(OUT / "schema.png")
    plt.close(fig)

    print(json.dumps({k: v for k, v in metrics.items() if k != "queries"}, indent=2))


if __name__ == "__main__":
    main()
