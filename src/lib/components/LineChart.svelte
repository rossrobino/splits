<script>
	import { colorList, theme } from "$lib/sessionStore";
	import { msToTime } from "$lib/modules/utilities/msToTime";
	import { Line } from "svelte-chartjs";
	import { abbrDist } from "$lib/modules/utilities/abbrDist";
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
	} from "chart.js";
	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	);

	export let athletes = [];

	let colorIndex = 0;
	let datasets = [];
	let labels = [];
	athletes.forEach((athlete) => {
		let color = colorIndex++ % 5;
		let label;
		if (athlete.username) {
			label = "@" + athlete.username;
		} else {
			label = `athlete${athlete.guestId}`;
		}
		datasets.push({
			label,
			lineTension: 0.2,
			borderColor: $colorList[color],
			backgroundColor: $colorList[color],
			data: athlete.laps.map(({ time }) => time),
		});

		// if athletes have different numbers of laps...
		if (athlete.laps.length > labels.length) {
			labels = [];
			let lapIndex = 1;
			athlete.laps.forEach((lap) => {
				let label = "";
				if (lap.len) {
					label = `${lap.len}${abbrDist(lap.units)}`;
				} else if (lap.units == "rest") {
					label = "Rest";
				} else {
					label = "Lap #" + lapIndex++;
				}
				labels.push(label);
			});
		}
	});

	const data = {
		labels,
		datasets,
	};

	let tickColor = "";
	let gridColor = "";
	$: tickColor = $theme === "light" ? "rgb(34,39,49)" : "rgb(150,156,172)";
	$: gridColor = $theme === "light" ? "#dfdfdf" : "rgb(80,86,102)";
</script>

<div class="mb-8 bg-base-200 rounded-xl p-2 font-mono">
	<Line
		{data}
		options={{
			responsive: true,
			scales: {
				y: {
					ticks: {
						callback: function (value, index, ticks) {
							return msToTime(value);
						},
						color: tickColor,
						font: {
							family: "Menlo",
						},
					},
					grid: {
						color: gridColor,
					},
				},
				x: {
					ticks: {
						color: tickColor,
						font: {
							family: "Menlo",
						},
					},
					grid: {
						color: gridColor,
					},
				},
			},
			plugins: {
				legend: {
					labels: {
						color: tickColor,
					},
				},
				tooltip: {
					callbacks: {
						label: function (context) {
							let label =
								context.dataset.label +
								": " +
								msToTime(context.parsed.y);
							return label;
						},
					},
				},
			},
		}}
	/>
</div>
