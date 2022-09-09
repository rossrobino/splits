<script>
	import { title, newTeamTag } from "$lib/modules/info";
	import PageHeader from "$lib/components/PageHeader.svelte";
</script>

<svelte:head>
	<title>{title} - New Team</title>
	<meta name="description" content={newTeamTag} />
</svelte:head>

<PageHeader>
	<span slot="h1">New Team</span>
	<span slot="h2">{newTeamTag}</span>
</PageHeader>
