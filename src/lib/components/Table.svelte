<script>
	export let columnNames; // list
	let className = "";
	export { className as class };
	let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="card bg-base-100 shadow-xl {className}">
	<div class="card-body p-0">
		<div class="overflow-x-auto w-full">
			<table class="table table-zebra w-full {windowWidth < 370 ? 'table-compact' : ''}">
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

				<!-- <tfoot>
            <tr>
                {#each columnNames as name}
                    <th>{name}</th>
                {/each}
            </tr>
        </tfoot> -->
			</table>
		</div>
	</div>
</div>
