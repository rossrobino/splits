<script>
	import Card from "$lib/components/Card.svelte";
	import { title, tagline, teamTag, profileTag } from "$lib/modules/info";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
	import { userProfile } from "$lib/sessionStore.js";
</script>

<svelte:head>
	<title>{title} - Dashboard</title>
	<meta name="description" content={tagline} />
</svelte:head>

<PageHeader h2={false}>
	<span slot="h1">Dashboard</span>
</PageHeader>

<Card
	title="Start"
	cardLink="/app/event"
	class="mb-4 bg-primary text-primary-content"
>
	Track splits - start or add an event.
</Card>

<ResponsiveGrid>
	<Card
		title="Profile"
		cardLink="/app/profile/{$userProfile.username}"
	>
		{profileTag}
	</Card>
	<Card title="Pace" cardLink="/app/">
		Calculate pace for your next event.
	</Card>
	<Card title="Team" cardLink="/app/team">
		{teamTag}
	</Card>
</ResponsiveGrid>
