<script>
	import { title } from "$lib/modules/info";
	import Controller from "$lib/components/Event/Controller.svelte";
</script>

<svelte:head>
	<title>{title} - Track</title>
	<meta name="description" content={"Track an event."} />
</svelte:head>

<Controller />