<script>
    import { title, teamTag } from "$lib/modules/info";
    import { userProfile } from "$lib/sessionStore";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import TeamSelect from "$lib/components/TeamSelect.svelte";
    import TeamInfo from "$lib/components/TeamInfo.svelte";
</script>

<svelte:head>
    <title>{title} - Team</title>
    <meta name="description" content={teamTag} />
</svelte:head>

<PageHeader h2={false}>
    <span slot="h1">Team</span>
</PageHeader>

<TeamSelect profileId={$userProfile.id} />

<TeamInfo />
