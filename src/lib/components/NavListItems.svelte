<script>
    import { userProfile } from '$lib/sessionStore.js';
</script>


{#if $userProfile}
    <li><a href="/app/{ $userProfile.username }">Profile</a></li>
    <li><a href="/app/account">Account</a></li>
{/if}