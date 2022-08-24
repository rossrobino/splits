<script>
    import { user, userProfile } from '$lib/sessionStore';
    import { title } from '$lib/modules/info';
    import LoadingBar from '$lib/components/LoadingBar.svelte';
    import AlertError from '$lib/components/AlertError.svelte';
    import { supabase } from '$lib/modules/supabaseClient';

    let email = "";
    let username = "";
    let fname = "";
    let lname = "";
    let loading = false;
    let alert = "";



    // controls the focus outline of the wrapper div for @ prefix
    let usernameFocus = false;
    const onFocus = () => usernameFocus = true;
    const onBlur = () => usernameFocus = false;

    async function updateProfile() {
        try {
            alert = "";
            loading = true;

            const profileUpdates= { updated_at: new Date() };
            if ( username != "" ) profileUpdates.username = username;
            if ( fname != "" ) profileUpdates.first_name = fname;
            if ( lname != "" ) profileUpdates.last_name = lname;
            if ( Object.keys(profileUpdates).length > 1 ) {
                console.log(profileUpdates);
                let { error } = await supabase
                    .from('profiles')
                    .update(profileUpdates)
                    .match({id: $user.id});
                if ( error ) throw error;
                // success:
                $userProfile
            } else {
                alert = "Please enter a new value to submit."
            }
            



        } catch (error) {
            alert = error.message;
        } finally {
            loading = false;
        }
    }

</script>


<svelte:head>
    <title>{title} - Account</title>
    <meta name="description" content="Edit your account information." />
</svelte:head>


{#if ($userProfile)}
    <h1 class="text-5xl font-bold">Account</h1>
    <p class="mt-4 mb-8">Update your information:</p>

    <div class="form-control w-full max-w-sm">
        <label for="email" class="label">
            <span class="label-text">Email</span>
            <span class="label-text-alt">{$user.email}</span>
        </label>
        <input id="email" type="text" placeholder="new email" bind:value={email} class="input input-bordered input-secondary w-full max-w-sm mb-3" />

        <label for="username" class="label">
            <span class="label-text">Username</span>
            <span class="label-text-alt">@{$userProfile.username}</span>
        </label>
        <div class="input input-bordered input-secondary {usernameFocus ? "inputOutline" : ""} w-full max-w-sm mb-3">
            @<input class="h-full w-[90%] focus:outline-0" id="username" type="text" placeholder="new username" on:focus={onFocus} on:blur={onBlur} bind:value={username}  />
        </div>

        <label for="first_name" class="label">
            <span class="label-text">First</span>
            <span class="label-text-alt">{$userProfile.first_name}</span>
        </label>
        <input id="first_name" type="text" placeholder="new first name" bind:value={fname} class="input input-bordered input-secondary w-full max-w-sm mb-3" />

        <label for="last_name" class="label">
            <span class="label-text">Last</span>
            <span class="label-text-alt">{$userProfile.last_name}</span>
        </label>
        <input id="last_name" type="text" placeholder="new last name" bind:value={lname} class="input input-bordered input-secondary w-full max-w-sm mb-3" />

        <button 
            on:click={updateProfile} 
            class="btn btn-secondary {loading ? "loading" : ''} mt-3"
            disabled={loading}
        >
            {loading ? "Loading" : "Submit"}
        </button>

        {#if alert}
            {#if ( alert == 'duplicate key value violates unique constraint "profiles_username_key"')}
                <AlertError error="username is unavailable" class="mt-6"/>
            {:else}
                <AlertError error={alert} class="mt-6"/>
            {/if}
        {/if}
    </div>
{:else}
    <LoadingBar class="mt-24" />
{/if}


<style>
    .inputOutline {
        outline: 2px solid hsl(var(--s));
        outline-offset: 2px;
    }
</style>