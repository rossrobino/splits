<script>
	import { msToTime } from "$lib/modules/utilities/msToTime";
	import Table from "$lib/components/Table.svelte";
	import FinishButton from "./FinishButton.svelte";

	export let finishButton = false;
	export let athletes = []; // [{first_name, last_name, laps[int]}, ...]
	let columnNames = ["Athlete"];
	let totalLaps = 0;

	$: {
		columnNames = ["Athlete"];
		totalLaps = 0;
		athletes.forEach((athlete) => {
			if (athlete.laps.length > totalLaps) {
				totalLaps = athlete.laps.length;
			}
		});
		for (let index = 0; index < totalLaps; index++) {
			columnNames.push(`Lap ${index + 1}`);
		}
		columnNames = columnNames;
	}
</script>

{#if totalLaps > 0}
	<Table {columnNames} class="mb-8">
		{#each athletes as athlete}
			<tr>
				<th>
					<span>{athlete.first_name} {athlete.last_name}</span>
					<br />
					<a
						href="/app/profile/{athlete.username}"
						class="badge badge-secondary badge-sm"
					>
						@{athlete.username}
					</a>
				</th>
				{#each [...Array(totalLaps).keys()] as i}
					<td>
						{#if athlete.laps[i]}
							{msToTime(athlete.laps[i])}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</Table>
	{#if finishButton}
		<FinishButton />
	{/if}
{/if}
