<script>
	import PageHeader from "$lib/components/PageHeader.svelte";
	import Card from "$lib/components/Card.svelte";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
	import Table from "$lib/components/Table.svelte";
	import { title, eventTag } from "$lib/modules/info";
</script>

<svelte:head>
	<title>{title} - Event</title>
	<meta name="description" content={eventTag} />
</svelte:head>

<PageHeader>
	<span slot="h1">Event</span>
	<span slot="h2">{eventTag}</span>
</PageHeader>

<ResponsiveGrid>
	<Card
		title="Track"
		cardLink="/app/event/track"
		class="bg-primary text-primary-content"
	>
		Start a new event to track in real time.
	</Card>
	<Card title="Add" cardLink="/app/event/add">
		Add a past event.
	</Card>
	<Card title="Schedule" cardLink="/app/event/">
		Schedule a future event, invite teams and athletes.
	</Card>
</ResponsiveGrid>

<Table columnNames={["Event", "Date", "Description"]}>
	<tr>
		<th>
			<div class="font-bold">Prefontaine Memorial</div>
			<div class="text-sm opacity-50">Coos Bay, Oregon</div>
		</th>
		<td>
			September 17th, 2022
			<br />
			<span class="badge badge-ghost badge-sm">10:00am</span>
		</td>
		<td>41st Annual Prefontaine Memorial Run</td>
	</tr>
	<tr>
		<th>
			<div class="font-bold">Prefontaine Memorial</div>
			<div class="text-sm opacity-50">Coos Bay, Oregon</div>
		</th>
		<td>
			September 17th, 2022
			<br />
			<span class="badge badge-ghost badge-sm">10:00am</span>
		</td>
		<td>41st Annual Prefontaine Memorial Run</td>
	</tr>
</Table>