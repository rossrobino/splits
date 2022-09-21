<script>
	import Card from "$lib/components/Card.svelte";
	import {
		title,
		tagline,
		teamTag,
		profileTag,
		eventTag,
		accountTag,
	} from "$lib/modules/info";
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
	title="Quick Start"
	cardLink="/app/event/track"
	class="mb-4 bg-primary text-primary-content"
>
	Start an event to track your splits.
</Card>

<ResponsiveGrid>
	<Card title="Events" cardLink="/app/event">
		{eventTag}
	</Card>
	<Card title="Teams" cardLink="/app/team">
		{teamTag}
	</Card>
	<Card title="Profile" cardLink="/app/profile/{$userProfile.username}">
		{profileTag}
	</Card>
	<Card title="Account" cardLink="/app/account">
		{accountTag}
	</Card>
</ResponsiveGrid>
