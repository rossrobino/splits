import { supabase } from "$lib/modules/supabaseClient";

export async function load({ params }) {
    const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("username", params.username)
        .single()
    if (error) throw new Error(error.message);
    console.log(data);
    return data;
}