<script>
	import { clickOutside } from "$lib/modules/utilities/clickOutside";

	export let confirmed = false;
	export let isCoach = false;
	export let confirmContract;
	export let deleteContract;
	let deleteWarning = false;

	function handleDelete() {
		if (deleteWarning) {
			deleteContract();
		} else {
			deleteWarning = true;
		}
	}

	function onDeleteBlur() {
		deleteWarning = false;
	}
</script>

{#if !isCoach}
	<button
		class="btn btn-sm btn-square {deleteWarning
			? 'btn-error'
			: 'btn-ghost'}"
		on:click={handleDelete}
		use:clickOutside={onDeleteBlur}
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
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	</button>

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
{/if}
