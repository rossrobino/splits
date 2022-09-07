<script>
    export let columnNames; // list
</script>

<div class="overflow-x-auto w-full">
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
