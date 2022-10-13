<script>
	import {
		eventType,
		eventStarted,
		eventName,
		athletes,
	} from "$lib/sessionStore";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import SetDistanceRest from "$lib/components/Event/SetDistanceRest.svelte";
	import Timer from "$lib/components/Event/Timer/Timer.svelte";
	import SetEventType from "$lib/components/Event/SetEventType.svelte";
	import Tiles from "$lib/components/Event/Tiles.svelte";
	import ResetButton from "$lib/components/Event/ResetButton.svelte";
	import SetAthletes from "$lib/components/Event/SetAthletes.svelte";
	import StartButton from "$lib/components/Event/StartButton.svelte";
	import LapTable from "$lib/components/LapTable/LapTable.svelte";
	import SetGuests from "$lib/components/Event/SetGuests.svelte";

	export let demo = false;
	if (demo) {
		$eventType = "group";
		$eventName = "Demo";
	}
</script>

{#if $eventType}
	{#if !$eventStarted}
		{#if !demo}
			<TextInput
				label="Event Name"
				id="eventName"
				bind:value={$eventName}
			/>
		{/if}
		<SetDistanceRest />
		{#if $eventType === "group"}
			<SetAthletes />
			<SetGuests />
		{/if}
		<StartButton {demo} />
	{:else}
		<Timer />
		<Tiles />
		<!-- Lap All button in Tiles -->
		<LapTable athletes={$athletes} live={true} {demo} />
	{/if}
	<ResetButton {demo} />
{:else}
	<PageHeader>
		<span slot="h1">Start Event</span>
		<span slot="h2">Select and event type to get started.</span>
	</PageHeader>

	<SetEventType />
{/if}
