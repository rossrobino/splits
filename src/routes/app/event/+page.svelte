<script>
	import PageHeader from "$lib/components/PageHeader.svelte";
	import Card from "$lib/components/Card.svelte";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
	import Table from "$lib/components/Table.svelte";
	import PastEventsTable from "$lib/components/PastEventsTable.svelte";
	import { title, eventTag } from "$lib/modules/info";
	import { userProfile } from "$lib/sessionStore";
</script>

<svelte:head>
	<title>{title} - Event</title>
	<meta name="description" content={eventTag} />
</svelte:head>

<PageHeader>
	<span slot="h1">Event</span>
	<span slot="h2">{eventTag}</span>
</PageHeader>

<!-- <ResponsiveGrid class="mb-8"> -->
<Card
	title="Track"
	primary={true}
	cardLink="/app/event/track"
	class="mb-8"
	
>
	Start a new event to track in real time.
</Card>
<!-- <Card title="Add" cardLink="/app/event/add">
		Add a past event.
	</Card>
	<Card title="Schedule" cardLink="/app/event/">
		Schedule a future event, invite teams and athletes.
	</Card> -->
<!-- </ResponsiveGrid> -->

<PastEventsTable profileId={$userProfile.id}/>
<PastEventsTable profileId={$userProfile.id} organized={true} />
