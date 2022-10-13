<script>
	import { title } from "$lib/modules/info";
	import { demoFinished, athletes } from "$lib/sessionStore";
	import Controller from "$lib/components/Event/Controller.svelte";
	import LineChart from "$lib/components/LineChart.svelte";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import ResetButton from "../../lib/components/Event/ResetButton.svelte";
	import LapTable from "../../lib/components/LapTable/LapTable.svelte";
</script>

<svelte:head>
	<title>{title} - Demo</title>
	<meta name="description" content={"Track an event."} />
</svelte:head>

<div class="p-4 sm:p-8 max-w-6xl mx-auto overflow-hidden">
	<PageHeader>
		<span slot="h1">Demo</span>
		<span slot="h2">
			<a href="/app" class="underline">Sign in</a>
			or
			<a href="/signup" class="underline">create an account</a>
			to add teammates and save results.
		</span>
	</PageHeader>
	<hr class="mb-4 sm:mb-8">
	{#if $demoFinished}
		<LineChart athletes={$athletes} />
		<LapTable athletes={$athletes} />
		<ResetButton demo={true} />
	{:else}
		<Controller demo={true} />
	{/if}
</div>
