<script>
    import { supabase } from "$lib/modules/supabaseClient";
    import { page } from '$app/stores';
    import AlertError from "$lib/components/AlertError.svelte";
    import { routeProfile } from "$lib/sessionStore";

    async function getRouteProfile() {
        const { data, error } = await supabase
            .from("profiles")
            .select(`username, first_name, last_name, avatar_url`)
            .eq("username", $page.params.username) // params are passed into the url
            .single();
        if (error) throw new Error(error.message);
        routeProfile.set(data);
    }
</script>





{#await getRouteProfile()}
    <progress class="progress w-56"></progress>
{:then}

    <div class="p-4 bg-base-100">
        <div class="prose my-8">
            <h1>{$routeProfile.first_name} {$routeProfile.last_name}</h1> 
        </div>
        <div class="tabs tabs-boxed w-full">
            <a href="/app/{$routeProfile.username}" class="tab tab-active">Profile</a> 
            <a href="/app" class="tab">Teams</a> 
            <a href="/app" class="tab">Splits</a>
        </div>
    
        <slot />
    </div>
    
{:catch error}
    {#if (error=="Error: JSON object requested, multiple (or no) rows returned")}
        <AlertError error="User not found" />
    {:else}
        <AlertError error={error} />
    {/if}
{/await}

