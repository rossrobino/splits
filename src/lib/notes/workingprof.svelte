<script>
    import { supabase } from "$lib/modules/supabaseClient";
    import { user } from '$lib/sessionStore';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let username = null;
    let firstname = null;
    let lastname = null;
    let avatar = null;
    let loading = true;

    onMount(async () => {
        getProfile();
    });


    function getProfile() {
        try {
            loading = true;
            const user = supabase.auth.user(); 

            supabase
            .from("profiles")
            .select(`username, first_name, last_name, avatar_url`)
            .eq("username", $page.params.username)
            .single()
            .then(({ data, error, status }) => {
                if (data) {
                    username = data.username;
                    firstname = data.first_name;
                    lastname = data.last_name;
                    avatar = data.avatar_url;
                }
                if (error && status !== 406) throw error;
            });
        } catch (error) {
            console.log(error.message);
        } finally {
            loading = false;
        }
    }


    
</script>

<h1>Profile</h1>

<form
    class="form-widget"
    >
    <div>
        <label for="username">username:</label>
        <input id="username" type="text" bind:value="{username}" />
    </div>
    <div>
        <label for="username">First Name: </label>
        <input id="username" type="text" bind:value="{firstname}" />
    </div>
    <div>
        <label for="username">Last Name: </label>
        <input id="username" type="text" bind:value="{lastname}" />
    </div>
</form>