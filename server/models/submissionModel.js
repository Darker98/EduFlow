import supabase from './createClient.js'

export const uploadSubmission = async (studentID, assignmentID) => {
    const { data, error } = await supabase
        .storage
        .from('assignments')
        .upload(`submissions/${assignmentID}-${studentID}.pdf`, file.buffer, {
            contentType: file.mimetype,
            cacheControl: 3600,
            upsert: true
        });
    
    if (error) throw new Error(error.message);

    const { data: record, error: entryError } = await supabase
        .from('submissions')
        .insert([{ student_id: studentID, assignment_id: assignmentID }]);

    if (entryError) throw new Error(error.message);
}

export const getSubmissionURL = async (studentID, assignmentID) => {
    const { data: url, error } = supabase
        .storage
        .from('assignments')
        .getPublicUrl(`submissions/${assignmentID}-${studentID}.pdf`);

    if (error) throw new Error(error.message);

    return url;
}

export const checkSubmissionStatuses = async (assignmentID) => {
    const { data, error } = supabase
        .from('submissions')
        .get('*')
        .eq('assignment_id', assignmentID);

    if (error) throw new Error(error.message);

    return data;
}

export const deleteSubmission = async (studentID, assignmentID) => {
    const { error } = await supabase
        .storage
        .from('assignments')
        .remove([`submissions/${assignmentID}-${studentID}.pdf`]);

    if (error) throw new Error(error.message);

    const { error: databaseError } = await supabase
        .from('submissions')
        .delete()
        .eq('student_id', studentID)
        .eq('assignment_id', assignmentID);

    if (databaseError) throw new Error(error.message);
}