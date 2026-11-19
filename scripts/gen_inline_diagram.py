#!/usr/bin/env python3
"""Generate a consistent conceptual diagram for an article's inline figure.

Usage (from a small per-article script):
    from scripts.gen_inline_diagram import render
    render(
        out="public/images/articles/inline/<slug>-1.png",
        title="Short claim-style title",
        subtitle="Conceptual - one-line framing",
        layout="flow",           # flow | cycle | compare | stack
        boxes=["First", "Second", "Third"],
        note="Optional bottom line",
    )

All figures share the site palette and are explicitly labelled conceptual so a
schematic is never mistaken for measured data.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

BLUE = "#264a80"
INK = "#1d1d1f"
MUTED = "#6e6e73"
LIGHT = "#eef3f9"
GREY = "#c7ced6"


def _canvas(title, subtitle):
    fig, ax = plt.subplots(figsize=(16, 9), dpi=100)
    fig.patch.set_facecolor("white")
    ax.set_facecolor("white")
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 9)
    ax.axis("off")
    ax.set_title(title, fontsize=22, color=INK, fontweight="bold", loc="left", pad=18)
    fig.text(0.085, 0.9, subtitle, fontsize=13, color=MUTED)
    fig.subplots_adjust(top=0.80, bottom=0.08, left=0.06, right=0.97)
    return fig, ax


def _box(ax, x, y, w, h, text, fc=LIGHT, ec=BLUE, tc=INK, fs=12):
    ax.add_patch(
        FancyBboxPatch(
            (x, y), w, h,
            boxstyle="round,pad=0.12,rounding_size=0.16",
            fc=fc, ec=ec, lw=1.8,
        )
    )
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center",
            fontsize=fs, color=tc, wrap=True)


def _arrow(ax, x1, y1, x2, y2, color=BLUE):
    ax.add_patch(
        FancyArrowPatch((x1, y1), (x2, y2), arrowstyle="->",
                        mutation_scale=16, lw=2, color=color)
    )


def render(out, title, subtitle, layout, boxes, note=""):
    layout = (layout or "flow").lower()
    fig, ax = _canvas(title, subtitle)

    if layout == "flow":
        n = max(1, len(boxes))
        gap = 15.0 / n
        w = min(2.6, gap - 0.4)
        for i, label in enumerate(boxes):
            x = 0.6 + i * gap
            fc = BLUE if i % 2 == 0 else LIGHT
            tc = "white" if i % 2 == 0 else INK
            _box(ax, x, 3.6, w, 1.8, label, fc=fc, tc=tc)
            if i < n - 1:
                _arrow(ax, x + w + 0.05, 4.5, x + gap - 0.15, 4.5)

    elif layout == "cycle":
        n = max(2, len(boxes))
        cx, cy, rx, ry = 8, 4.5, 5.2, 2.6
        import math
        pts = []
        for i in range(n):
            a = 2 * math.pi * i / n - math.pi / 2
            pts.append((cx + rx * math.cos(a), cy + ry * math.sin(a)))
        for i, (x, y) in enumerate(pts):
            fc = BLUE if i % 2 == 0 else LIGHT
            tc = "white" if i % 2 == 0 else INK
            _box(ax, x - 1.3, y - 0.6, 2.6, 1.2, boxes[i], fc=fc, tc=tc, fs=11)
            nx, ny = pts[(i + 1) % n]
            dx, dy = nx - x, ny - y
            L = math.hypot(dx, dy)
            if L > 2.9:
                _arrow(ax, x + dx / L * 1.4, y + dy / L * 0.7,
                       nx - dx / L * 1.4, ny - dy / L * 0.7)

    elif layout == "compare":
        left = boxes[0] if len(boxes) > 0 else "Left"
        right = boxes[1] if len(boxes) > 1 else "Right"
        _box(ax, 1.2, 3.2, 5.4, 2.2, left, fc=LIGHT, fs=13)
        _box(ax, 9.4, 3.2, 5.4, 2.2, right, fc=BLUE, tc="white", fs=13)
        _arrow(ax, 6.8, 4.3, 9.2, 4.3)
        ax.text(8, 2.2, "versus", fontsize=12, color=MUTED, ha="center")

    elif layout == "stack":
        n = max(1, len(boxes))
        h = min(1.1, 5.0 / n)
        gap = 0.3
        total = n * h + (n - 1) * gap
        y0 = 4.5 - total / 2
        for i, label in enumerate(boxes):
            y = y0 + (n - 1 - i) * (h + gap)
            fc = BLUE if i == 0 else LIGHT
            tc = "white" if i == 0 else INK
            _box(ax, 4.0, y, 8.0, h, label, fc=fc, tc=tc, fs=12)

    else:
        raise ValueError(f"unknown layout: {layout}")

    if note:
        ax.text(8, 1.1, note, fontsize=12.5, color=MUTED, ha="center")
    fig.savefig(out, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(out)


if __name__ == "__main__":
    raise SystemExit("Import render() from a per-article script instead.")
