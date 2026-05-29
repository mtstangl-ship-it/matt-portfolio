"""
Extract street-grid SVGs for Atlanta, Athens, Savannah from OpenStreetMap.
Major arterials only (motorway through tertiary), grouped by road class for
staggered draw-in animation.
"""

import os
import subprocess
import xml.etree.ElementTree as ET

import matplotlib.pyplot as plt
import osmnx as ox

CITIES = {
    "atl": {
        "name": "Atlanta, GA",
        "point": (33.7490, -84.3880),
        "dist": 5000,
    },
    "ath": {
        "name": "Athens, GA",
        "point": (33.9519, -83.3576),
        "dist": 3000,
    },
    "sav": {
        "name": "Savannah, GA",
        "point": (32.0809, -81.0912),
        "dist": 3000,
    },
}

TEAL = "#2dd4b2"
BG = "#0a0f0e"

EDGE_WIDTH = 1.0
EDGE_ALPHA = 0.85
FIGURE_SIZE = (12, 12)
CUSTOM_FILTER = '["highway"~"motorway|trunk|primary|secondary|tertiary"]'

# Plot minor classes first (bottom), arterials last (top).
ROAD_CLASSES = ["tertiary", "secondary", "primary", "trunk", "motorway"]

OUT_DIR = "./public/maps/cities"
SVG_NS = "http://www.w3.org/2000/svg"
os.makedirs(OUT_DIR, exist_ok=True)


def matches_road_class(highway, road_class: str) -> bool:
    if isinstance(highway, list):
        return road_class in highway
    return highway == road_class


def optimize_svg(path: str) -> None:
    config = os.path.join(os.path.dirname(__file__), "svgo-city-grid.config.mjs")
    result = subprocess.run(
        ["npx", "--yes", "svgo", path, "--config", config, "-o", path],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"  WARN svgo: {result.stderr.strip() or result.stdout.strip()}")
    else:
        print(f"  Optimized → {path}")


def inject_road_classes(path: str, classes_present: list[str]) -> None:
    """Assign road-* classes to matplotlib collection groups in plot order."""
    ET.register_namespace("", SVG_NS)
    tree = ET.parse(path)
    root = tree.getroot()

    collection_groups: list[ET.Element] = []
    for elem in root.iter():
        if not elem.tag.endswith("g"):
            continue
        elem_id = elem.get("id", "")
        if "Collection" not in elem_id:
            continue
        if any(child.tag.endswith("path") for child in elem):
            collection_groups.append(elem)

    if len(collection_groups) < len(classes_present):
        # Fallback: any g with path children under axes, excluding clip defs
        collection_groups = []
        for elem in root.iter():
            if not elem.tag.endswith("g"):
                continue
            if elem.get("id", "").startswith("patch"):
                continue
            paths = [c for c in elem if c.tag.endswith("path")]
            if paths:
                collection_groups.append(elem)

    for group, road_class in zip(collection_groups, classes_present):
        group.set("class", f"road-{road_class}")

    tree.write(path, encoding="unicode", xml_declaration=True)


for code, cfg in CITIES.items():
    print(f"Processing {code.upper()} — {cfg['name']}")

    try:
        G = ox.graph_from_point(
            cfg["point"],
            dist=cfg["dist"],
            custom_filter=CUSTOM_FILTER,
            simplify=True,
        )
        _nodes, edges = ox.graph_to_gdfs(G)
        print(f"  Fetched: {len(G.nodes)} nodes, {len(G.edges)} edges")
    except Exception as e:
        print(f"  ERROR fetching {code}: {e}")
        continue

    fig, ax = plt.subplots(figsize=FIGURE_SIZE, facecolor=BG)
    ax.set_facecolor(BG)

    xmin, ymin, xmax, ymax = edges.total_bounds
    ax.set_xlim(xmin, xmax)
    ax.set_ylim(ymin, ymax)
    ax.set_aspect("equal")
    ax.set_axis_off()

    classes_present: list[str] = []
    for road_class in ROAD_CLASSES:
        mask = edges["highway"].apply(lambda h: matches_road_class(h, road_class))
        subset = edges[mask]
        if subset.empty:
            continue
        subset.plot(
            ax=ax,
            color=TEAL,
            linewidth=EDGE_WIDTH,
            alpha=EDGE_ALPHA,
        )
        classes_present.append(road_class)
        print(f"    {road_class}: {len(subset)} segments")

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

    inject_road_classes(out_path, classes_present)
    optimize_svg(out_path)

print("\nDone.")
