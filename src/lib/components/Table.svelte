<script>
	export let columnNames; // list
	let className = "";
	export { className as class };
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body p-0">
		<div class="overflow-x-auto w-full {className}">
			<table class="table table-zebra w-full">
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
