<script>
	import { msToTime } from "$lib/modules/utilities/msToTime";
	import { clickOutside } from "$lib/modules/utilities/clickOutside";
	import { abbrDist } from "$lib/modules/utilities/abbrDist";
	import Table from "$lib/components/Table.svelte";
	import FinishButton from "./FinishButton.svelte";
	import { theme } from "$lib/sessionStore";

	export let live = false;
	export let athletes = []; // [{first_name, last_name, laps[{}]}, ...]
	let columnNames = ["Athlete"];
	let totalLaps = 0;

	if (live) {
		athletes.forEach((athlete) => {
			athlete.deleteWarning = false;
		});
	}

	$: {
		columnNames = ["Athlete"];
		totalLaps = 0;
		athletes.forEach((athlete) => {
			if (athlete.laps.length > totalLaps) {
				columnNames = ["Athlete"];
				totalLaps = athlete.laps.length;
				let index = 1;
				athlete.laps.forEach((lap) => {
					columnNames.push(
						`${lap.units == "lap" || lap.units == "rest" ? "" : lap.len}${abbrDist(lap.units)}${lap.units == "lap" ? (" #" + index++) : ""}`
					);
				});
			}
		});
		if (live) columnNames.push("");
		columnNames = columnNames;
	}

	function removeLast(athlete) {
		if (athlete.deleteWarning) {
			athlete.laps.pop();
			removeWarning(athlete);
		} else {
			athlete.deleteWarning = true;
			athletes = athletes;
		}
	}

	function removeWarning(athlete) {
		athlete.deleteWarning = false;
		athletes = athletes;
	}

	function getLapUnits(lap) {
		if (lap) {
			return lap.units;
		}
		return "";
	}
</script>

{#if totalLaps > 0}
	<Table {columnNames} class="mb-4">
		{#each athletes as athlete}
			<tr>
				<th>
					<span>
						{athlete.first_name}
						{athlete.username
							? athlete.last_name
							: `#${athlete.last_name}`}
					</span>
					<br />
					{#if athlete.username}
						<a
							href="/app/profile/{athlete.username}"
							class="badge badge-sm badge-secondary"
						>
							@{athlete.username}
						</a>
					{/if}
				</th>
				{#each [...Array(totalLaps).keys()] as i}
					<td
						class:text-gray-400={$theme == "light" &&
							getLapUnits(athlete.laps[i]) == "rest"}
						class:text-gray-500={$theme == "dark" &&
							getLapUnits(athlete.laps[i]) == "rest"}
						class="font-mono text-sm"
					>
						{#if athlete.laps[i]}
							{msToTime(athlete.laps[i].time)}
						{/if}
					</td>
				{/each}
				{#if live}
					<td>
						{#if athlete.laps.length > 0}
							<button
								class="btn btn-square btn-sm {athlete.deleteWarning
									? 'btn-error'
									: ''}"
								on:click={() => {
									removeLast(athlete);
								}}
								use:clickOutside={() => {
									removeWarning(athlete);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						{/if}
					</td>
				{/if}
			</tr>
		{/each}
	</Table>
	{#if live}
		<FinishButton />
	{/if}
{/if}
