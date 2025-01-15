import supabase from './createClient.js';

export const createSession = async (sessionData, room_id) => {
    const { start_time, end_time } = sessionData;

    // Insert session data
    const { data, error } = await supabase
        .from('session')
        .insert([{ room_id : room_id, start_time : start_time, end_time : end_time }])
        .select('id');

    if (error) throw new Error(error.message);
    return data[0];
};

export const getSession = async (id) => {
    // Get session data
    const { data, error } = await supabase
        .from('session')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

export const updateSession = async (sessionData, session_id) => {
    const { start_time, end_time } = sessionData;

    // Remove null or undefined values from the update object
    const updateData = Object.fromEntries(
        Object.entries({ start_time : start_time, end_time : end_time })
            .filter(([_, value]) => value != null)
    );

    if (Object.keys(updateData).length === 0) {
        throw new Error("No valid fields provided for update.");
    }

    // Update relevant data
    const { data, error } = await supabase
        .from('session')
        .update(updateData)
        .eq('id', session_id)
        .select();

    if (error) throw new Error(error.message);
    return data;
};

export const deleteSession = async (session_id) => {
    const { error } = await supabase
        .from('session')
        .delete()
        .eq('id', session_id);

    if (error) throw new Error(error.message);
};

export const getSessions = async (room_id) => {
    // Get all session_ids in room
    const { data, error } = await supabase
        .from('session')
        .select('id')
        .eq('room_id', room_id);

    if (error) throw new Error(error.message);
    return data;
}
