<script>
    import { supabase } from "$lib/modules/supabaseClient";
    import { page } from '$app/stores';
    import AlertError from "$lib/components/AlertError.svelte";
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
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
    <LoadingBar class="mt-24" />
{:then}
    <div class="bg-base-100 flex">
        <Avatar class="mr-4" />
        <div>
            <h1 class="text-2xl sm:text-5xl font-bold">
                {$routeProfile.first_name} {$routeProfile.last_name}
            </h1> 
            <h2 class="text-xl sm:text-2xl">@{$routeProfile.username}</h2>  
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

