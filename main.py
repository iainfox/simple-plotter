import numpy as np
import pandas as pd
import json

LENGTH = 500

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


def generate_json(length, filename="output.json"):
    data = {
        "heading": "Example heading",
        "subheading": "Example sub heading",
        "x-title": "X-Axis",
        "y-title": "Y-Axis",
        "data": {
            "trace1": generate_trace(length),
            "trace2": generate_trace(length)
        }
    }

    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

    print(f"Saved {filename}")

generate_json(LENGTH, "medium.json")