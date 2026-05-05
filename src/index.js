const file_input = document.getElementById("file-input");
if (!file_input) { throw new Error("No file input found") };

const data_template = document.getElementById("data-template");
if (!data_template) { throw new Error("No template found") };

file_input.addEventListener("cancel", () => {
	console.log("Cancelled.");
});
file_input.addEventListener("change", () => {
	if (file_input.files.length !== 1) return

	const file = file_input.files[0];

	const reader = new FileReader();
	reader.onload = () => {
		fillTemplate(JSON.parse(reader.result))
	};
	reader.onerror = () => {
		console.log("Error reading the file. Please try again.", "error");
	};
	reader.readAsText(file);
});

function fillTemplate(file) {
	document.body.replaceChildren()

	const clone = data_template.content.cloneNode(true);
	document.body.appendChild(clone);

	const heading_elem = document.getElementById("heading")
	const subheading_elem = document.getElementById("subheading")
	heading_elem.textContent = file["heading"];
	subheading_elem.textContent = file["subheading"];

	fillTimeSeries(file["time-series"])
	fillBarChart(file["bar-chart"]);
}

function fillBarChart(barchart) {
	const x = barchart["x-axis"]

	const y1 = barchart["y1"]

	const y2 = barchart["y2"].map((v1, index) => {
		const v2 = y1[index];
		return v1 - v2;
	});

	const yLabel = y1.map((v1, index) => {
		const v2 = y2[index];
		return Math.round((v1 / (v1 + v2)) * 1000) / 10;
	});

	const trace1 = {
		x: x,
		y: y1,
		name: barchart["y1-name"],
		type: 'bar',
		marker: {
			color: 'rgb(20, 75, 255)',
		}
	};

	const trace2 = {
		x: x,
		y: y2,
		name: barchart["y2-name"],
		type: 'bar',

		text: yLabel.map(String),
		textposition: 'auto',
		hoverinfo: 'none',
		marker: {
			color: 'rgb(172, 172, 172)',
		}
	};

	const data = [trace1, trace2];

	const config = {
		responsive: true,
	}

	const layout = {
		barmode: 'stack',
		xaxis: {
			title: { text: barchart["x-label"] }
		},
		yaxis: {
			title: { text: barchart["y-label"] }
		}
	};

	Plotly.newPlot('barchart-plot', data, layout);
}

function fillTimeSeries(time_series) {
	const data = time_series["data"];
	const parsed_data = [];

	for (const trace of Object.values(data)) {
		let final_trace = {};

		final_trace["x"] = trace["x-axis"]["data"];
		final_trace["y"] = trace["y-axis"]["data"];
		final_trace["type"] = "scatter";

		parsed_data.push(final_trace);
	}

	const config = {
		responsive: true,
	}

	const layout = {
		xaxis: {
			title: { text: time_series["x-title"] }
		},
		yaxis: {
			title: { text: time_series["y-title"] }
		}
	};

	Plotly.newPlot('timeseries-plot', parsed_data, layout, config);
}