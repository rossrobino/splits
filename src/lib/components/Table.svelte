<script>
    export let columnNames = ["column1", "column2", "column3", "column4"]
</script>

<div class="overflow-x-auto w-full">
    <table class="table w-full">
        <thead>
            <tr>
                {#each columnNames as name}
                    <th>{name}</th>
                {/each}
            </tr>
        </thead>

        <tbody>
            <slot/>
            <!-- 
            <tr>
                <td>
                    <div class="font-bold">Hart Hagerty</div>
                    <div class="text-sm opacity-50">United States</div>
                </td>
                <td>
                    Zemlak, Daniel and Leannon
                    <br>
                    <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>Purple</td>
                <td>
                    <button class="btn btn-ghost btn-xs">details</button>
                </td>
            </tr> 
            -->
        </tbody>

        <tfoot>
            <tr>
                {#each columnNames as name}
                    <th>{name}</th>
                {/each}
            </tr>
        </tfoot>
    </table>
  </div>