<script>
	import { page } from "$app/stores";

	export let title = "";
	export let text = "";
	export let url = $page.url.pathname;

	async function handleClick() {
		try {
			await navigator.share({ title, text, url });
		} catch (error) {
			console.log(error);
		}
	}
</script>

<button class="btn w-full flex max-w-sm my-4" on:click={handleClick}>
	Invite
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-4 h-4 ml-1"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
		/>
	</svg>
</button>
