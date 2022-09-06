<!-- 
    gets the teams that the profileId passed in has a contract with
    sets $currentTeams store with data
    controls which team is selected
-->

<script>
    import { supabase } from '$lib/modules/supabaseClient';
    import { currentTeams } from '$lib/sessionStore';

    export let profileId;
    async function getContracts(pId) {
        if (profileId) {
            const { data, error } = await supabase
                .from("contracts")
                .select(`
                    team_id,
                    teams (
                        team_name,
                        profiles (
                            first_name,
                            last_name
                        )
                    )
                `).eq('profile_id', pId);
            if (error) throw new Error(error.message);
            $currentTeams = [];
            data.forEach(team => {
                $currentTeams.push(
                    { 
                        id: team.team_id, 
                        team_name: team.teams.team_name, 
                        coach: `${team.teams.profiles.first_name} ${team.teams.profiles.last_name}`,
                        selected: false,
                    }
                )
            });
            $currentTeams[0].selected = true;
        }
    }

    function changeTeam(selectedTeam) {
        $currentTeams.forEach(team => {
            team.selected = false;
        });
        selectedTeam.selected = true;
        $currentTeams = $currentTeams;
    }

    $: getContracts(profileId);

</script>

<div class="dropdown dropdown-hover">
    <label for="teamSelect" tabindex="0" class="btn mb-1">
        {#if $currentTeams[0]}
            #{$currentTeams.filter(team => team.selected == true)[0].team_name}
        {:else}
            Loading
        {/if}
    </label>
    {#if $currentTeams[0]}
        <ul 
            id="teamSelect" 
            tabindex="0" 
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
            {#each $currentTeams as team}
                <li>
                    <span 
                        on:click={changeTeam(team)}
                        class='{team.selected ? "bg-base-200" : ""}'
                    >
                        #{team.team_name}
                    </span>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<p class="my-8">
    $currentTeams: {JSON.stringify($currentTeams)}
</p>