<script>
    import { routeProfile, userProfile } from "$lib/sessionStore";
    import { title, profileTag } from '$lib/modules/info';
    import Card from "$lib/components/Card.svelte";
    import TeamSelect from "$lib/components/TeamSelect.svelte";
</script>

<svelte:head>
    <title>{title} - @{$routeProfile.username}</title>
    <meta name="description" content={profileTag} />
</svelte:head>



<div class="grid grid-cols-1 gap-4">
    <Card
        title="Personal Records"
    >
    </Card>
    <Card
        title="Teams"
    >
        <TeamSelect profileId={$routeProfile.id}></TeamSelect>
    </Card>
</div>