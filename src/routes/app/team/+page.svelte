<script>
	import { title, teamTag } from "$lib/modules/info";
	import { userProfile } from "$lib/sessionStore";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import TeamSelect from "$lib/components/TeamSelect.svelte";
</script>

<svelte:head>
	<title>{title} - Team</title>
	<meta name="description" content={teamTag} />
</svelte:head>

<PageHeader>
	<span slot="h1">Team</span>
	<span slot="h2">{teamTag}</span>
</PageHeader>

<TeamSelect profileId={$userProfile.id} />

<a href="/app/team/new" class="btn w-full max-w-md">
	New Team
</a>
