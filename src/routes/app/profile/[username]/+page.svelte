<script>
    import { routeProfile } from "$lib/sessionStore";
    import { title, profileTag } from "$lib/modules/info";
    import Card from "$lib/components/Card.svelte";
</script>

<svelte:head>
    <title>{title} - @{$routeProfile.username}</title>
    <meta name="description" content={profileTag} />
</svelte:head>

<div class="grid grid-cols-1 gap-4">
    <Card title="Personal Records" />
    <Card title="Teams">

    </Card>
</div>
