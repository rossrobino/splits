<script>
	export let confirmed = false;

	export let confirmContract;
	export let deleteContract;
</script>

{#if !confirmed}
	<button
		class="btn btn-sm btn-square btn-success"
		on:click={confirmContract}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.5 12.75l6 6 9-13.5"
			/>
		</svg>
	</button>
{/if}

<button class="btn btn-sm btn-square btn-error" on:click={deleteContract}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-6 h-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
</button>
