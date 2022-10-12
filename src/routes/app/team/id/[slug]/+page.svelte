<script>
	import { page } from "$app/stores";
	import TeamSettingsButton from "./TeamSettingsButton.svelte";
	import TeamRoster from "./rosterComponents/TeamRoster.svelte";
	import { title, selectedTeamTag } from "$lib/modules/info";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import CopyButton from "$lib/components/CopyButton.svelte";
	import ShareButton from "$lib/components/ShareButton.svelte";

	const teamName = $page.params.slug;
</script>

<svelte:head>
	<title>{title} - #{teamName}</title>
	<meta name="description" content={selectedTeamTag} />
</svelte:head>

<PageHeader h2={false}>
	<span slot="h1">#{teamName}</span>
</PageHeader>

<TeamRoster {teamName} />

<CopyButton copyText="https://splits.best/app/team/id/{teamName}" >Copy Invite Link</CopyButton>

<ShareButton shareText="https://splits.best/app/team/id/{teamName}" />

<TeamSettingsButton />
