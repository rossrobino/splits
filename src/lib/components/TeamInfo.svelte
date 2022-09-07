<script>
    import { currentTeams } from "$lib/sessionStore";
    import Card from "$lib/components/Card.svelte";
    import Table from "$lib/components/Table.svelte";
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import { supabase } from "$lib/modules/supabaseClient";

    let roster = [];
    let selectedTeam;
    $: selectedTeam = $currentTeams.filter((team) => team.selected == true)[0];

    async function getRoster(team) {
        const { data, error } = await supabase
            .from("contracts")
            .select(
                `
                team_id,
                profiles (
                    id,
                    first_name,
                    last_name,
                    username
                )
            `
            )
            .eq("team_id", team.id);
        if (error) throw new Error(error.message);
        console.log(data);
        roster = [];
        data.forEach((person) => {
            let id = person.profiles.id;
            let isCoach = id == selectedTeam.coach_id ? true : false;
            roster.push({
                name: `${person.profiles.first_name} ${person.profiles.last_name}`,
                id,
                username: person.profiles.username,
                isCoach,
            });
        });
        roster = roster;
    }

    $: if (selectedTeam) getRoster(selectedTeam);
</script>

{#if selectedTeam}
    <Card title="Roster">
        {#if roster[0]}
            <Table columnNames={["Name", "Username"]}>
                {#each roster as person}
                    <tr>
                        <td>
                            <span class="font-bold">{person.name}</span>
                            {#if person.isCoach}
                                <br />
                                <span class="badge badge-primary badge-sm"
                                    >coach</span
                                >
                            {/if}
                        </td>
                        <td>
                            <a
                                href="/app/profile/{person.username}"
                                class="btn btn-ghost btn-sm"
                                >@{person.username}</a
                            >
                        </td>
                    </tr>
                {/each}
            </Table>
        {:else}
            <LoadingBar />
        {/if}
    </Card>
{/if}
