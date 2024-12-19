import supabase from './createClient.js';

export const markAttendances = async (session_id, attendanceArray) => {
    // attendanceArray format: [{ student_id: 1, attended: true }, { student_id: 2, attended: false }, ...]
    const attendanceData = attendanceArray.map(({ student_id, attended }) => ({
        session_id,
        student_id,
        attended
    }));

    const { data, error } = await supabase
        .from('student_attendance')
        .insert(attendanceData);

    if (error) throw new Error(error.message);
    return data;
};

export const getAttendanceData = async (student_id, room_id) => {
    // Fetch sessions for the given room_id
    const { data: sessions, error: sessionError } = await supabase
        .from('session')
        .select('id')
        .eq('room_id', room_id);

    if (sessionError) throw new Error(sessionError.message);

    const sessionIds = sessions.map(session => session.id);

    // Fetch attendance data for the given student and session IDs
    const { data: attendanceData, error: attendanceError } = await supabase
        .from('student_attendance')
        .select('attended')
        .eq('student_id', student_id)
        .in('session_id', sessionIds);

    if (attendanceError) throw new Error(attendanceError.message);

    // Calculate present and absent counts
    const summary = {
        presents: attendanceData.filter(row => row.attended).length,
        absences: attendanceData.filter(row => !row.attended).length
    };

    return summary;
};

export const updateAttendance = async (session_id, attendanceArray) => {
    // attendanceArray format: [{ student_id: 1, attended: true }, { student_id: 2, attended: false }, ...]
    const updates = attendanceArray.map(async ({ student_id, attended }) => {
        const { data, error } = await supabase
            .from('student_attendance')
            .update({ attended })
            .eq('session_id', session_id)
            .eq('student_id', student_id);

        if (error) throw new Error(`Error updating student ${student_id}: ${error.message}`);
        return data;
    });

    // Execute all updates in parallel
    const results = await Promise.all(updates);
    return results;
};
