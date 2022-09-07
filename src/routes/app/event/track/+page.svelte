<script>
    import { title } from "$lib/modules/info";
    import Table from "$lib/components/Table.svelte";
    import Timer from "$lib/components/Timer/Timer.svelte";
    import Tiles from "./Tiles.svelte";
</script>

<svelte:head>
    <title>{title} - Track</title>
    <meta name="description" content={"Track an event."} />
</svelte:head>

<Timer />

<Tiles />

<!-- <Table columnNames={["split","lap 1","lap 3"]}>
    <tr>
        <td>Ross Robino</td>
        <td>00:50:24</td>
        <td></td>
    </tr>
    <tr>
        <td>Keely Robino</td>
        <td>00:50:24</td>
        <td>00:50:24</td>
    </tr>
</Table> -->
