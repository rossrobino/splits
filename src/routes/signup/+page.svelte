<script>
    import SignUp from "./SignUp.svelte";
    import { title } from '$lib/modules/info.js';
</script>

<svelte:head>
    <title>{title} - Sign Up</title>
    <meta name="description" content="Create an account." />
</svelte:head>

<SignUp />