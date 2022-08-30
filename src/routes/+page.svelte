<script>
    import { title, tagline } from '$lib/modules/info.js';
    import { onMount } from 'svelte';
    import AlertError from '$lib/components/AlertError.svelte';
    import ResetPassword from '$lib/components/ResetPassword.svelte';

    let hash;
    let hashType;
    let hashToken;
    let hashError;

    onMount(async () => {
        // password reset
        if( window.location.hash ) {
            // hash exists
            hash = new URLSearchParams(window.location.hash.substring(1));
            if ( hash ) {
                if ( hash.get("error_description") ) {
                    hashError = hash.get("error_description");
                } else {
                    hashType = hash.get("type");
                    hashToken = hash.get("access_token");
                }
            }
        }
    });
    
</script>

<svelte:head>
    <title>{ title }</title>
    <meta name="description" content={ tagline } />
</svelte:head>

{#if ( hashType === "recovery" )}
    <!-- password recovery -->
    {#if ( hashToken )}
        <ResetPassword token={hashToken}/>
    {:else}
        <AlertError error={ hashError } />
    {/if}
{:else}
    <div class="hero bg-base-100 py-24">
        <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">{title}</h1>
            <p class="py-6">{tagline}</p>
            <a href="/signup" class="btn btn-primary">Get Started</a>
        </div>
        </div>
    </div>
{/if}

    

    