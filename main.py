import numpy as np
import pandas as pd
import json

LENGTH = 1000

def generate_trace(length):
    x = pd.date_range(start="2026-05-01", periods=length).strftime("%Y-%m-%d").tolist()
    
    trend = np.linspace(0, 50, length)
    noise = np.random.normal(0, 5, length)

    y = trend + noise

    y = np.round(y).astype(int)
    y = np.clip(y, 0, None).tolist()

    return {
        "x-axis": {
            "data": x
        },
        "y-axis": {
            "data": y
        }
    }


def generate_bar_chart():
    labels = ["Gen 1", "Gen 2", "Gen 3", "Gen 4"]

    y1 = np.random.randint(20, 500, size=4).tolist()
    y2 = np.random.randint(500, 700, size=4).tolist()

    return {
        "x-axis": labels,
        "y1": y1,
        "y2": y2
    }


def generate_json(length, filename="output.json"):
    data = {
        "heading": "Example heading",
        "subheading": "Example sub heading",

        "bar-chart": generate_bar_chart(),

        "time-series": {
            "x-title": "X-Axis",
            "y-title": "Y-Axis",
            "data": {
                "trace1": generate_trace(length),
                "trace2": generate_trace(length)
            }
        }
    }

    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

    print(f"Saved {filename}")

generate_json(LENGTH, "large.json")