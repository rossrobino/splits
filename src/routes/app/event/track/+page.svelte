<script>
	import { title } from "$lib/modules/info";
	import { eventType, eventStarted } from "$lib/sessionStore";
	import { capitalizeFirstLetter } from "$lib/modules/utilities/capitalizeFirstLetter";
	import { getCurrentDate } from "$lib/modules/utilities/getCurrentDate";
	import Table from "$lib/components/Table.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import Timer from "./components/Timer/Timer.svelte";
	import SetEventType from "./components/SetEventType.svelte";
	import Tiles from "./components/Tiles.svelte";
	import ResetButton from "./components/ResetButton.svelte";
	import SetAthletes from "./components/SetAthletes.svelte";
	import StartButton from "./components/StartButton.svelte";

	let eventName = "";
	$: eventName = `${getCurrentDate()}-${capitalizeFirstLetter(
		$eventType
	)}-Event`;
</script>

<svelte:head>
	<title>{title} - Track</title>
	<meta name="description" content={"Track an event."} />
</svelte:head>

{#if $eventType}
	{#if !$eventStarted}
		<TextInput label="Event Name" id="eventName" value={eventName} />

		{#if $eventType === "group"}
			<SetAthletes />
		{/if}
		<StartButton />
	{:else}
		<Timer />
		<Tiles />
	{/if}

	<!-- <Table columnNames={["Athlete", "lap 1", "lap 3"]} class="mb-4">
		<tr>
			<th>Ross Robino</th>
			<td>00:50:24</td>
			<td />
		</tr>
		<tr>
			<th>Keely Robino</th>
			<td>00:50:24</td>
			<td>00:50:24</td>
		</tr>
	</Table> -->

	<ResetButton />
{:else}
	<SetEventType />
{/if}
