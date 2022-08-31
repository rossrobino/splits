<script>
    import { userProfile } from '$lib/sessionStore.js';
</script>


{#if $userProfile}
    <li><a href="/app">Dashboard</a></li>
    <li><a href="/app/user/{ $userProfile.username }">Profile</a></li>
    <li><a href="/app/account">Account</a></li>
    
{/if}