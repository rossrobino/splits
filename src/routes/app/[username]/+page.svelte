<script>
    import { routeProfile } from "$lib/sessionStore";
    import { title, tagline } from '$lib/modules/info';
</script>

<svelte:head>
    <title>{title} - @{routeProfile.username}</title>
    <meta name="description" content={tagline} />
</svelte:head>

