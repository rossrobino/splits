<script>
    import Card from '$lib/components/Card.svelte';
    import { title, tagline } from '$lib/modules/info';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import ResponsiveGrid from '$lib/components/ResponsiveGrid.svelte';
</script>

<svelte:head>
    <title>{title} - Dashboard</title>
    <meta name="description" content={tagline} />
</svelte:head>

<PageHeader h2={false} >
    <span slot="h1">Dashboard</span>
</PageHeader>

<Card 
    title="Start"
    buttonText="Go"
    buttonLink="/app/event"
    class="mb-4 bg-primary"
>
    Track your splits - start or add an event to track your performance. 
</Card>

<ResponsiveGrid>
    <Card 
        title="Pace"
        buttonText="Go" 
        buttonLink="/app/"
    >
        Calculate pace for your next event.
    </Card>
    <Card 
        title="Teams"
        buttonText="Go" 
        buttonLink="/app"
    >
        View your teams upcoming events, races and more.
    </Card>
    <Card 
        title="Friends"
        buttonText="Go" 
        buttonLink="/app"
    >
        View your friends list and see their { title } profiles.
    </Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
</ResponsiveGrid>

