import supabase from './createClient.js';

export const enroll = async (student_id, enrollment_key) => {
    const { room_id, key_error } = await supabase
        .from('room')
        .select('id')
        .eq('enrollment_key', enrollment_key)
        .single();

    if (key_error) throw new Error(error.message);

    const { data, error } = await supabase
        .from('enrollment')
        .insert([{ student_id : student_id, room_id : room_id }])
        .select('room_id');

    if (error) throw new Error(error.message);
    return data;
};

export const getEnrollments = async (student_id) => {
    const { data, error } = await supabase
        .from('enrollment')
        .select('room_id')
        .eq('student_id', student_id);

    if (error) throw new Error(error.message);
    return data;
};

export const unenroll = async (student_id, room_id) => {
    const { error } = await supabase
        .from('enrollment')
        .delete()
        .eq('student_id', student_id)
        .eq('room_id', room_id);

    if (error) throw new Error(error.message);
};

export const getStudents = async (room_id) => {
    const { data, error } = await supabase
        .from('enrollment')
        .select('student_id')
        .eq('room_id', room_id);

    if (error) throw new Error(error.message);
    return data;
}
