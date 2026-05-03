const file_input = document.getElementById("file-input");
if (!file_input) { throw new Error("No file input found")};

const data_template = document.getElementById("data-template");
if (!data_template) { throw new Error("No template found")};

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