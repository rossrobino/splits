<script>
    import { title } from '$lib/modules/info.js';
    import NavListItems from './NavListItems.svelte';
    import LogInOutButton from './LogInOutButton.svelte';
    import SwapTheme from './SwapTheme.svelte';
</script>


<div class="navbar bg-base-200">
    <div class="navbar-start">
        <div class="dropdown dropdown-hover">
            <label for="hamburger" tabindex="0" class="btn btn-ghost lg:hidden">
                <svg id='hamburger' xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
                <NavListItems />
            </ul>
        </div>
        <a href="/app" class="btn btn-ghost normal-case text-xl">{title.toLowerCase()}</a>
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
            <NavListItems />
        </ul>
    </div>
    <div class="navbar-end">
        <SwapTheme />
        <LogInOutButton />
    </div>
</div>