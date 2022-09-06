<script>
    import { supabase } from "$lib/modules/supabaseClient";
    import { page } from '$app/stores';
    import AlertError from "$lib/components/AlertError.svelte";
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import Card from "$lib/components/Card.svelte";
    import { routeProfile } from "$lib/sessionStore";

    const username = $page.params.username; // params are passed into the url

    async function getRouteProfile() {
        const { data, error } = await supabase
            .from("profiles")
            .select(`id, username, first_name, last_name, avatar_url`)
            .eq("username", username)
            .single();
        if (error) throw new Error(error.message);
        routeProfile.set(data);
    }

</script>

{#await getRouteProfile()}
    <LoadingBar class="mt-24" />
{:then}
    <PageHeader>
        <span slot="h1">{$routeProfile.first_name} {$routeProfile.last_name}</span>
        <span slot="h2">@{$routeProfile.username}</span>
    </PageHeader>

    <slot />

{:catch error}
    {#if (error=="Error: JSON object requested, multiple (or no) rows returned")}
        <AlertError error="@{username} not found!" />
    {:else}
        <AlertError error={error} />
    {/if}
{/await}
