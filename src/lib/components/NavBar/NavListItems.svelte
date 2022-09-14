<script>
    import { userProfile } from "$lib/sessionStore.js";
</script>

{#if $userProfile}
    <li><a href="/app/profile/{$userProfile.username}">Profile</a></li>
    <li><a href="/app/team">Teams</a></li>
    <li><a href="/app/account">Account</a></li>
{/if}
