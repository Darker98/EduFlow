import supabase from './createClient.js';

export const enroll = async (student_id, enrollment_key) => {
    const { data: room_id, key_error } = await supabase
        .from('room')
        .select('id')
        .eq('enrollment_key', enrollment_key)
        .single();
    if (key_error) throw new Error(error.message);

    const { data, error } = await supabase
        .from('enrollment')
        .insert([{ student_id : student_id, room_id : room_id.id }])
        .select('room_id');

    if (error) throw new Error(error.message);

    return data[0];
};

export const getEnrollments = async (student_id) => {
    const { data, error } = await supabase
        .from('enrollment')
        .select('room_id')
        .eq('student_id', student_id);
//first fetch the room_id of of the student
    if (error) throw new Error(error.message);
//then from that room_id we fetch the room details of the student
    const {data:room_data, error:room_error} = await supabase
        .from('room')
        .select('*')
        .in('id', data.map((record) => record.room_id));

    if (room_error) throw new Error(room_error.message);

    return room_data;
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
    const { data: enrollmentData, error } = await supabase
        .from('enrollment')
        .select('student_id')
        .eq('room_id', room_id);
    const studentIds = enrollmentData.map((record) => record.student_id);
    if (error) throw new Error(error.message);
    const { data: students, error : newError } = await supabase
        .from('student')
        .select('*')
        .in('id', studentIds);
    
    return students;
};
