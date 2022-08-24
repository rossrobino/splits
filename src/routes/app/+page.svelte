<script>
    import Card from '$lib/components/Card.svelte';
    import { title, tagline } from '$lib/modules/info';
</script>

<svelte:head>
    <title>{title} - Dashboard</title>
    <meta name="description" content={tagline} />
</svelte:head>


<Card></Card>
