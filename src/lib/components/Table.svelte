<script>
	export let columnNames; // list
	let className = "";
	export { className as class };
	let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="card bg-base-100 border border-base-200 {className}">
	<div class="card-body p-0">
		<div class="overflow-x-auto w-full">
			<table class="table w-full" class:table-compact={windowWidth < 640}>
				{#if columnNames}
					<thead>
						<tr>
							{#each columnNames as name}
								<th>{name}</th>
							{/each}
						</tr>
					</thead>
				{/if}
				<tbody>
					<slot />
				</tbody>
			</table>
		</div>
	</div>
</div>
