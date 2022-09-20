<script>
	import { title } from "$lib/modules/info";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";

	let loading = false;
	let event = {};

	onMount(async () => {
		loading = true;
		await getEvent();
		loading = false;
	});

	async function getEvent() {
		try {
			const { data, error } = await supabase
				.from("events")
				.select(
					`
					id,
					name,
					date,
					profiles(
						username
					)
				`
				)
				.eq("id", $page.params.slug)
				.single();
			if (error) throw new Error(error.message);
			event = data;
		} catch (error) {
			console.log(error.message);
		}
	}

	async function getLaps() {
		try {
			loading = true;
			const { data, error } = await supabase
				.from("laps")
				.select(
					`
					id,
					name,
					date,
					profiles(
						username
					)
				`
				)
				.eq("id", $page.params.slug)
				.single();
			if (error) throw new Error(error.message);
			event = data;
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{title} - {event.name ? event.name : "Event"}</title>
	<meta name="description" content={"Track an event."} />
</svelte:head>

{#if loading}
	<LoadingBar />
{:else if event.name}
	<PageHeader>
		<span slot="h1">{event.name}</span>
		<span slot="h2">
			<span>{event.date}</span>
			<a href="/app/profile/{event.profiles.username}" class="badge">
				organizer @{event.profiles.username}
			</a>
		</span>
	</PageHeader>

	{JSON.stringify(event)}
{/if}
