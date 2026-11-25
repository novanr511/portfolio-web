#!/usr/bin/env python3
"""Build two diagrams for the RAG research agent build log.

The first shows the graph the agent actually implements. The second shows the
boundary the article argues for: an audit can connect prose to artifacts, but
it cannot connect artifacts to reality. Both are explanatory diagrams, not
screenshots of a running system.
"""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "projects"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#1b2a42"
ACC = "#264a80"
MUTED = "#5c6b82"
FILL = "#eef3f9"
WARN = "#b45309"


def box(ax, x, y, w, h, label, fill=FILL, edge=ACC, color=INK, fs=10):
    p = FancyBboxPatch(
        (x, y), w, h,
        boxstyle="round,pad=0.02,rounding_size=0.06",
        linewidth=1.4, edgecolor=edge, facecolor=fill,
    )
    ax.add_patch(p)
    ax.text(x + w / 2, y + h / 2, label, ha="center", va="center",
            fontsize=fs, color=color, linespacing=1.4)
    return p


def arrow(ax, x1, y1, x2, y2, color=ACC, style="-|>", lw=1.6, ls="-"):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style,
                                 mutation_scale=13, linewidth=lw,
                                 color=color, linestyle=ls,
                                 shrinkA=2, shrinkB=2))


# ---------------------------------------------------------------- pipeline
fig, ax = plt.subplots(figsize=(12, 5.2), dpi=160)
ax.set_xlim(0, 12)
ax.set_ylim(0, 5.2)
ax.axis("off")

ax.text(0.3, 4.85, "RAG research agent, as built", fontsize=14,
        color=INK, ha="left", va="center", fontweight="bold")

box(ax, 0.3, 2.4, 1.9, 1.0, "Artifacts\nindexed locally")
box(ax, 2.6, 2.4, 1.7, 1.0, "Question\nfrom the user")
box(ax, 4.7, 2.4, 2.2, 1.0, "Retrieve\nBM25 + TF-IDF\nRRF fusion")
box(ax, 7.3, 2.4, 1.6, 1.0, "Draft\nfrom chunks")
box(ax, 9.3, 2.4, 2.2, 1.0, "number_audit\ncheck each number")

arrow(ax, 2.2, 2.9, 2.55, 2.9)
arrow(ax, 4.3, 2.9, 4.65, 2.9)
arrow(ax, 6.9, 2.9, 7.25, 2.9)
arrow(ax, 8.9, 2.9, 9.25, 2.9)

# revision loop
ax.plot([10.4, 10.4, 6.6, 6.6], [2.4, 1.35, 1.35, 2.35],
        color=WARN, linewidth=1.5)
arrow(ax, 6.6, 1.35, 6.6, 2.35, color=WARN)
ax.text(8.5, 1.05, "failed number routes back to drafting",
        fontsize=9.5, color=WARN, ha="center")

# persistence
box(ax, 9.3, 3.9, 2.2, 0.7, "SQLite checkpoints + run registry",
    fill="#e8edf5", edge=MUTED, color=MUTED, fs=9)
arrow(ax, 10.4, 3.4, 10.4, 3.85, color=MUTED, style="-|>", lw=1.3)

ax.text(0.3, 0.35,
        "Lexical retrieval is a design decision. The revision path is a routing decision, not a measured benefit.",
        fontsize=9.5, color=MUTED, ha="left")
fig.tight_layout()
fig.savefig(OUT / "rag-pipeline.png", bbox_inches="tight", facecolor="white")
plt.close(fig)

# ---------------------------------------------------------------- boundary
fig, ax = plt.subplots(figsize=(11, 4.6), dpi=160)
ax.set_xlim(0, 11)
ax.set_ylim(0, 4.6)
ax.axis("off")

ax.text(0.3, 4.25, "What the audit checks, and what it cannot",
        fontsize=14, color=INK, ha="left", va="center", fontweight="bold")

box(ax, 0.4, 2.1, 2.5, 1.0, "Generated memo\nnumbers and claims", fs=10)
box(ax, 4.25, 2.1, 2.5, 1.0, "Retrieved artifacts\nmetrics, tables, code", fs=10)
box(ax, 8.1, 2.1, 2.5, 1.0, "Reality\nthe actual protocol", fs=10,
    fill="#fbfaf7", edge=MUTED, color=MUTED)

arrow(ax, 2.9, 2.6, 4.2, 2.6, color=ACC)
ax.text(3.55, 2.95, "number_audit\nchecks this link", fontsize=9.5,
        color=ACC, ha="center")

arrow(ax, 6.8, 2.6, 8.05, 2.6, color=WARN, style="-|>", lw=1.6, ls="--")
ax.text(7.4, 2.95, "not checked", fontsize=9.5, color=WARN, ha="center")

ax.text(5.5, 1.15,
        "A green audit means the memo matches the artifacts. It says nothing about whether the artifacts are right.",
        fontsize=10.5, color=INK, ha="center")
ax.text(5.5, 0.6,
        "Consistency is not validity.",
        fontsize=11.5, color=WARN, ha="center", fontweight="bold")
fig.tight_layout()
fig.savefig(OUT / "rag-audit-boundary.png", bbox_inches="tight", facecolor="white")
plt.close(fig)

print("wrote rag-pipeline.png and rag-audit-boundary.png")
