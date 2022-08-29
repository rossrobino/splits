<script>
    import { createEventDispatcher } from 'svelte';
    import { supabase } from '$lib/modules/supabaseClient';
    import { userProfile } from '$lib/sessionStore';
    import { onMount } from 'svelte';

    export let path;
    export let updateLink = false;

    let loading = false;
    let src;
    let files;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        supabase.storage
            .from('avatars')
            .download(path)
            .then(({ data, error }) => {
                if (error) throw error;
                src = URL.createObjectURL(data);
            })
            .catch((error) =>
                console.error('Error downloading image: ', error.message)
            );
    });
    

    async function uploadAvatar() {
        try {
            loading = true;

            if (!files || files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${$userProfile.username}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            path = filePath;
            dispatch('upload');
        } catch (error) {
            alert(error.message);
        } finally {
            loading = false;
        }
    }
</script>

{#key $userProfile.avatar_url}
    <label for="avatar" class="{updateLink ? "cursor-pointer" : ""}">
        <div class="avatar placeholder">
            <div class="bg-neutral-focus text-neutral-content w-16 sm:w-24 mask mask-squircle">
                {#if src}
                    <img
                        {src}
                        alt="Avatar"
                    />
                {:else}
                    <span class="text-3xl">
                        {$userProfile.first_name[0]}{$userProfile.last_name[0]}
                    </span>
                {/if}
            </div>
        </div> 
    </label>
    {#if updateLink}
        <input
            class="hidden"
            type="file"
            id="avatar"
            accept="image/*"
            bind:files
            on:change="{uploadAvatar}"
            disabled="{loading}"
        />
    {/if}
{/key}