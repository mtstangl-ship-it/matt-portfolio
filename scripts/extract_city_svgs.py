"""
Extract street-grid SVGs for Atlanta, Athens, Savannah from OpenStreetMap,
plus Georgia state-level highways (motorway/trunk/primary only).
Major arterials grouped by road class for staggered draw-in animation.
"""

import json
import os
import re
import subprocess
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict

import matplotlib.pyplot as plt
import osmnx as ox
from shapely.geometry import LineString, MultiLineString
from shapely.ops import transform as shapely_transform

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
        "dist": 1500,
    },
}

STATE_LEVEL = {
    "ga": {
        "name": "Georgia, USA",
        "place": "Georgia, USA",
        "filter": '["highway"~"motorway|trunk|primary"]',
    },
}

TEAL = "#1dcfaa"
BG = "#0a0f0e"

EDGE_WIDTH = 1.0
EDGE_ALPHA = 0.85
FIGURE_SIZE = (12, 12)
CITY_CUSTOM_FILTER = '["highway"~"motorway|trunk|primary|secondary|tertiary"]'

CITY_ROAD_CLASSES = ["tertiary", "secondary", "primary", "trunk", "motorway"]
STATE_ROAD_CLASSES = ["primary", "trunk", "motorway"]
STATE_HIGHWAY_TAGS = {"motorway", "trunk", "primary"}

OUT_DIR = "./public/maps/cities"
SVG_NS = "http://www.w3.org/2000/svg"
BRIEFING_PATH = "./src/content/impact-dashboard-briefing.ts"
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


def outline_bbox_from_briefing() -> tuple[float, float, float, float]:
    briefing = open(BRIEFING_PATH, encoding="utf-8").read()
    match = re.search(r'GEORGIA_PATH_D =\s*"([^"]+)"', briefing)
    if not match:
        return 0.0, 0.0, 274.5, 320.0
    nums = re.findall(r"[\d.]+", match.group(1))
    xs = [float(nums[i]) for i in range(0, len(nums) - 1, 2)]
    ys = [float(nums[i + 1]) for i in range(0, len(nums) - 1, 2)]
    return min(xs), min(ys), max(xs) - min(xs), max(ys) - min(ys)


def transform_edges_to_outline(edges, place: str):
    """Map WGS84 edge geometries into Georgia outline SVG coordinate space."""
    min_x, min_y, width, height = outline_bbox_from_briefing()
    state_gdf = ox.geocode_to_gdf(place)
    min_lon, min_lat, max_lon, max_lat = state_gdf.total_bounds

    def mapper(x: float, y: float, z=None):
        sx = min_x + (x - min_lon) / (max_lon - min_lon) * width
        sy = min_y + (max_lat - y) / (max_lat - min_lat) * height
        return sx, sy

    edges = edges.to_crs(epsg=4326)
    edges = edges.copy()
    edges["geometry"] = edges["geometry"].apply(lambda geom: shapely_transform(mapper, geom))
    return edges, (min_x, min_x + width), (min_y + height, min_y)


def render_edges(
    edges,
    road_classes: list[str],
    out_path: str,
    xlim: tuple[float, float],
    ylim: tuple[float, float],
) -> None:
    fig, ax = plt.subplots(figsize=FIGURE_SIZE, facecolor=BG)
    ax.set_facecolor(BG)
    ax.set_xlim(*xlim)
    ax.set_ylim(*ylim)
    ax.set_aspect("equal")
    ax.set_axis_off()

    classes_present: list[str] = []
    for road_class in road_classes:
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


def fetch_state_highways_overpass(place: str) -> dict:
    """Fetch motorway/trunk/primary ways for a place bbox via Overpass API."""
    state_gdf = ox.geocode_to_gdf(place)
    min_lon, min_lat, max_lon, max_lat = [float(v) for v in state_gdf.total_bounds]
    query = (
        f'[out:json][timeout:240];'
        f'(way["highway"~"motorway|trunk|primary"]({min_lat},{min_lon},{max_lat},{max_lon}););'
        f"out geom;"
    )
    req = urllib.request.Request(
        "https://overpass-api.de/api/interpreter",
        data=query.encode("utf-8"),
        headers={"User-Agent": "matt-portfolio-ga-extract/1.0"},
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        return json.loads(resp.read().decode("utf-8"))


def extract_state_svg(code: str, cfg: dict) -> None:
    """
    Extract state-level highway SVG aligned to Georgia outline coordinates.
    Uses graph_from_place when available; falls back to Overpass + clip + SVG emit.
    """
    min_x, min_y, width, height = outline_bbox_from_briefing()
    out_path = os.path.join(OUT_DIR, f"{code}-grid.svg")

    try:
        print("  Trying graph_from_place…")
        G = ox.graph_from_place(
            cfg["place"],
            custom_filter=cfg["filter"],
            simplify=True,
        )
        _nodes, edges = ox.graph_to_gdfs(G)
        print(f"  Fetched: {len(G.nodes)} nodes, {len(G.edges)} edges")
        edges, xlim, ylim = transform_edges_to_outline(edges, cfg["place"])
        render_edges(edges, STATE_ROAD_CLASSES, out_path, xlim, ylim)
        return
    except Exception as exc:
        print(f"  graph_from_place unavailable ({exc}); using Overpass fallback…")

    data = fetch_state_highways_overpass(cfg["place"])
    state_gdf = ox.geocode_to_gdf(cfg["place"])
    state_poly = state_gdf.geometry.iloc[0]
    min_lon, min_lat, max_lon, max_lat = [float(v) for v in state_gdf.total_bounds]

    def to_svg(lon: float, lat: float) -> tuple[float, float]:
        x = min_x + (lon - min_lon) / (max_lon - min_lon) * width
        y = min_y + (max_lat - lat) / (max_lat - min_lat) * height
        return x, y

    by_class: dict[str, list[LineString]] = defaultdict(list)
    for el in data.get("elements", []):
        if el.get("type") != "way":
            continue
        hw = el.get("tags", {}).get("highway")
        if hw not in STATE_HIGHWAY_TAGS:
            continue
        geom = el.get("geometry")
        if not geom or len(geom) < 2:
            continue
        coords = [(pt["lon"], pt["lat"]) for pt in geom]
        line = LineString(coords).intersection(state_poly)
        if line.is_empty:
            continue
        parts = list(line.geoms) if isinstance(line, MultiLineString) else [line]
        for part in parts:
            if part.geom_type != "LineString" or len(part.coords) < 2:
                continue
            svg_coords = [to_svg(lon, lat) for lon, lat in part.coords]
            simplified = LineString(svg_coords).simplify(0.35, preserve_topology=True)
            if simplified.length >= 0.5:
                by_class[hw].append(simplified)

    svg = ET.Element(
        "svg",
        xmlns=SVG_NS,
        viewBox=f"{min_x} {min_y} {width} {height}",
    )
    for road_class in STATE_ROAD_CLASSES:
        lines = by_class.get(road_class, [])
        if not lines:
            continue
        group = ET.SubElement(svg, "g", {"class": f"road-{road_class}"})
        for ls in lines:
            d = "M " + " L ".join(f"{x:.2f},{y:.2f}" for x, y in ls.coords)
            ET.SubElement(
                group,
                "path",
                {"d": d, "fill": "none", "stroke": TEAL, "stroke-width": "1"},
            )
        print(f"    {road_class}: {len(lines)} segments")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write(ET.tostring(svg, encoding="unicode"))
    print(f"  Saved → {out_path}")
    optimize_svg(out_path)


for code, cfg in CITIES.items():
    print(f"Processing {code.upper()} — {cfg['name']}")

    try:
        G = ox.graph_from_point(
            cfg["point"],
            dist=cfg["dist"],
            custom_filter=CITY_CUSTOM_FILTER,
            simplify=True,
        )
        _nodes, edges = ox.graph_to_gdfs(G)
        print(f"  Fetched: {len(G.nodes)} nodes, {len(G.edges)} edges")
    except Exception as e:
        print(f"  ERROR fetching {code}: {e}")
        continue

    xmin, ymin, xmax, ymax = edges.total_bounds
    out_path = os.path.join(OUT_DIR, f"{code}-grid.svg")
    render_edges(
        edges,
        CITY_ROAD_CLASSES,
        out_path,
        xlim=(xmin, xmax),
        ylim=(ymax, ymin),
    )

for code, cfg in STATE_LEVEL.items():
    print(f"Processing state {code.upper()} — {cfg['name']}")
    try:
        extract_state_svg(code, cfg)
    except Exception as e:
        print(f"  ERROR fetching {code}: {e}")

print("\nDone.")
