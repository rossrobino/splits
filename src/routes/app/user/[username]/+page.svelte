<script>
    import { routeProfile } from "$lib/sessionStore";
    import { title, tagline } from '$lib/modules/info';
    import Card from "$lib/components/Card.svelte";
</script>

<svelte:head>
    <title>{title} - @{$routeProfile.username}</title>
    <meta name="description" content={tagline} />
</svelte:head>

<div class="grid grid-cols-1 gap-4">
    <Card
        title="Personal Records"
    >
    </Card>
    <Card
        title="Teams"
    >
    </Card>
    <Card
        title="Charts?"
    >
    </Card>
</div>