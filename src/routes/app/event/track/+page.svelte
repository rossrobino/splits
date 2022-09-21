<script>
	import { title } from "$lib/modules/info";
	import {
		eventType,
		eventStarted,
		eventName,
		athletes,
	} from "$lib/sessionStore";
	import { capitalizeFirstLetter } from "$lib/modules/utilities/capitalizeFirstLetter";
	import { getCurrentDate } from "$lib/modules/utilities/getCurrentDate";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import Timer from "./components/Timer/Timer.svelte";
	import SetEventType from "./components/SetEventType.svelte";
	import Tiles from "./components/Tiles.svelte";
	import ResetButton from "./components/ResetButton.svelte";
	import SetAthletes from "./components/SetAthletes.svelte";
	import StartButton from "./components/StartButton.svelte";
	import LapTable from "$lib/components/LapTable/LapTable.svelte";

	$: $eventName = `${getCurrentDate()}-${capitalizeFirstLetter(
		$eventType
	)}-Event`;
</script>

<svelte:head>
	<title>{title} - Track</title>
	<meta name="description" content={"Track an event."} />
</svelte:head>

{#if $eventType}
	{#if !$eventStarted}
		<TextInput label="Event Name" id="eventName" value={$eventName} />
		{#if $eventType === "group"}
			<SetAthletes />
		{/if}
		<StartButton />
	{:else}
		<Timer />
		<!-- LapAll in Tiles -->
		<Tiles />
		<LapTable athletes={$athletes} finishButton={true} />
	{/if}
	<ResetButton />
{:else}
	<PageHeader>
		<span slot="h1">Start Event</span>
		<span slot="h2">Select and event type to get started.</span>
	</PageHeader>

	<SetEventType />
{/if}
