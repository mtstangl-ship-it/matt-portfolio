"""
Extract street-grid SVGs for Atlanta, Athens, Savannah from OpenStreetMap.
Major arterials only (motorway through tertiary) for fiche draw-in animation.
"""

import os
import subprocess
import osmnx as ox
import matplotlib.pyplot as plt

CITIES = {
    "atl": {
        "name": "Atlanta, GA",
        "point": (33.7490, -84.3880),   # downtown ATL
        "dist": 5000,                    # meters — captures core grid
    },
    "ath": {
        "name": "Athens, GA",
        "point": (33.9519, -83.3576),   # downtown Athens / UGA
        "dist": 3000,
    },
    "sav": {
        "name": "Savannah, GA",
        "point": (32.0809, -81.0912),   # historic district
        "dist": 3000,                    # captures the famous grid + river
    },
}

TEAL = "#2dd4b2"
BG = "#0a0f0e"

EDGE_WIDTH = 1.0
EDGE_ALPHA = 0.85
FIGURE_SIZE = (12, 12)
CUSTOM_FILTER = '["highway"~"motorway|trunk|primary|secondary|tertiary"]'

OUT_DIR = "./public/maps/cities"
os.makedirs(OUT_DIR, exist_ok=True)


def optimize_svg(path: str) -> None:
    result = subprocess.run(
        ["npx", "--yes", "svgo", path, "--multipass", "-o", path],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"  WARN svgo: {result.stderr.strip() or result.stdout.strip()}")
    else:
        print(f"  Optimized → {path}")


for code, cfg in CITIES.items():
    print(f"Processing {code.upper()} — {cfg['name']}")

    try:
        G = ox.graph_from_point(
            cfg["point"],
            dist=cfg["dist"],
            custom_filter=CUSTOM_FILTER,
            simplify=True,
        )
        print(f"  Fetched: {len(G.nodes)} nodes, {len(G.edges)} edges")
    except Exception as e:
        print(f"  ERROR fetching {code}: {e}")
        continue

    fig, ax = ox.plot_graph(
        G,
        node_size=0,
        edge_color=TEAL,
        edge_linewidth=EDGE_WIDTH,
        edge_alpha=EDGE_ALPHA,
        bgcolor=BG,
        show=False,
        close=False,
        figsize=FIGURE_SIZE,
    )

    ax.set_axis_off()
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)

    out_path = os.path.join(OUT_DIR, f"{code}-grid.svg")
    plt.savefig(
        out_path,
        format="svg",
        bbox_inches="tight",
        pad_inches=0,
        facecolor=BG,
    )
    plt.close(fig)
    print(f"  Saved → {out_path}")

    optimize_svg(out_path)

print("\nDone.")
