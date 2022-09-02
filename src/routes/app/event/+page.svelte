<script>
    import PageHeader from "$lib/components/PageHeader.svelte";
    import Card from "$lib/components/Card.svelte";
    import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
    import Table from "$lib/components/Table.svelte";
    import {title} from "$lib/modules/info";
</script>

<svelte:head>
    <title>{title} - Event</title>
    <meta name="description" content={"Track, add, or schedule an event."} />
</svelte:head>

<PageHeader>
    <span slot="h1">Event</span>
    <span slot="h2">race, practice, or workout</span>
</PageHeader>

<ResponsiveGrid>
    <Card
        title="Track"
        buttonText="Start"
        buttonLink="/app/event/track"
    >
        Start a new event to track in real time.
    </Card>
    <Card
        title="Add"
        buttonText="Create"
        buttonLink="/app/event/add"
    >
        Add a past event. 
    </Card>
    <Card
        title="Schedule"
        buttonText="Schedule"
        buttonLink="/app/event/add"
    >
        Schedule a future event, invite teams and athletes. 
    </Card>
</ResponsiveGrid>

<Card 
    title="Upcoming Events"
    class="mt-4"
>
    <Table columnNames={["Event", "Date", "Description"]}>
        <tr>
            <td>
                <div class="font-bold">Prefontaine Memorial Run</div>
                <div class="text-sm opacity-50">Coos Bay, Oregon</div>
            </td>
            <td>
                September 17th, 2022
                <br>
                <span class="badge badge-ghost badge-sm">10:00am</span>
            </td>
            <td>41st Annual Prefontaine Memorial Run</td>
        </tr> 
        <tr>
            <td>
                <div class="font-bold">Prefontaine Memorial Run</div>
                <div class="text-sm opacity-50">Coos Bay, Oregon</div>
            </td>
            <td>
                September 17th, 2022
                <br>
                <span class="badge badge-ghost badge-sm">10:00am</span>
            </td>
            <td>41st Annual Prefontaine Memorial Run</td>
        </tr> 
    </Table>    
</Card>