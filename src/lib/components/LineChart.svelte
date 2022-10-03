<script>
	import { colorList } from "$lib/sessionStore";
	import { Line } from "svelte-chartjs";
	import { msToTime } from "$lib/modules/utilities/msToTime";
	import "chart.js/auto";

	export let athletes = [];

	let colorIndex = 0;
	let datasets = [];
	let labels = [];
	athletes.forEach((athlete) => {
		let color = colorIndex++ % 5;
		datasets.push({
			label: "@" + athlete.username,
			lineTension: 0.2,
			borderColor: $colorList[color],
			backgroundColor: $colorList[color],
			data: athlete.laps,
		});

		// if athletes have different numbers of laps...
		if (athlete.laps.length > labels.length) {
			labels = [];
			for (let index = 0; index < athlete.laps.length; index++) {
				labels.push(`Lap ${index + 1}`);
			}
		}
	});

	const data = {
		labels,
		datasets,
	};
</script>

<div class="mb-8">
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
					},
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						label: function (context) {
							let label = context.parsed.y;
							return msToTime(label);
						},
					},
				},
			},
		}}
	/>
	<!-- 
	{JSON.stringify(athletes)}
	{JSON.stringify(data)} -->
</div>
