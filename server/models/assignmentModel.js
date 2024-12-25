import supabase from './createClient.js';

// Create a new assignment
export const createAssignment = async (file, assignmentDetails, roomID) => {
    const {
        title,
        maxMarks,
        details,
        dueDate,
        setVisibleDate
    } = assignmentDetails;

    if (!roomID || !title || !maxMarks || !dueDate || !setVisibleDate) {
        throw new Error("Missing required assignment details.");
    }

    const { data, error } = await supabase
        .storage
        .from('assignments')
        .upload(`${roomID}-${file.name}.pdf`, file.buffer, {
            contentType: file.mimetype,
            cacheControl: 3600,
            upsert: true
        }
        );

    if (error) throw new Error(error.message);

    const { publicURL, error: urlError } = supabase
        .storage
        .from('assignments')
        .getPublicUrl(`${roomID}-${file.name}.pdf`);

    if (urlError) throw new Error(urlError.message);

    const { error: databaseError } = await supabase
        .from('assignment')
        .insert([{
            room_id: roomID,
            title: title,
            max_marks: maxMarks,
            details: details,
            due_date: dueDate,
            set_visible_at: setVisibleDate,
            assignment_url: publicURL
        }])
        .select('id');

    if (databaseError) throw new Error(databaseError.message);

    return id;
};

// Retrieve assignments by roomId
export const getAssignments = async (roomID) => {
    if (!roomID) {
        throw new Error("roomId is required to fetch assignments.");
    }

    const { data, error } = await supabase
        .from('assignment')
        .select('*')
        .eq('room_id', roomID);

    if (error) throw new Error(error.message);

    return data;
};

// Delete an assignment by assignmentId
export const deleteAssignment = async (assignmentID) => {
    if (!assignmentID) {
        throw new Error("assignmentId is required to delete an assignment.");
    }

    const { data: assignment, error: fetchError } = await supabase
        .from('assignment')
        .select('assignment_url')
        .eq('id', assignmentID)
        .single();

    if (fetchError) throw new Error(fetchError.message);

    const currentAssignmentUrl = assignment.assignment_url;

    if (!currentAssignmentUrl) {
        throw new Error("No URL found for the specified assignment.");
    }

    const path = currentAssignmentUrl.split('/storage/v1/object/public/assignments/')[1];

    if (!path) {
        throw new Error("Invalid assignment URL format.");
    }

    const { error: deleteError } = await supabase.storage
        .from('assignments')
        .remove([path]);

    if (deleteError) throw new Error(deleteError.message);

    const { error: databaseError } = await supabase
        .from('assignment')
        .delete()
        .eq('id', assignmentID);

    if (databaseError) throw new Error(databaseError.message);
};

// Update an assignment
export const updateAssignment = async (assignmentID, updatedDetails, file) => {
    if (!assignmentID) {
        throw new Error("assignmentId is required to update an assignment.");
    }

    if (file) {
        const { data, error } = await supabase
        .storage
        .from('assignments')
        .upload(`${roomID}-${file.name}.pdf`, file.buffer, {
            contentType: file.mimetype,
            cacheControl: 3600,
            upsert: true
        }
        );

        if (error) throw new Error(error.message);

        const { assignment_url, error: urlError } = supabase
            .storage
            .from('assignments')
            .getPublicUrl(`${roomID}-${file.name}.pdf`);

        if (urlError) throw new Error(urlError.message);
    }

    const allowedFields = ["title", "max_marks", "details", "due_date", "set_visible_date"];
    const updateData = {};

    for (const key in updatedDetails) {
        if (allowedFields.includes(key) && updatedDetails[key] !== undefined) {
            updateData[key] = updatedDetails[key];
        }
    }

    if (assignment_url !== undefined) {
        updateData["assignment_url"] = assignment_url;
    }

    if (Object.keys(updateData).length === 0) {
        throw new Error("No valid fields provided for update.");
    }

    const { error } = await supabase
        .from('assignment')
        .update(updateData)
        .eq('id', assignmentID);

    if (error) throw new Error(error.message);

    return "Assignment updated successfully.";
};
