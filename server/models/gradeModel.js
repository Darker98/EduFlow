import supabase from './createClient.js';

// Assign marks to multiple students for a given assignment and room
export const assignMarksForAllStudents = async (studentGrades, assignmentId, roomId) => {
    for (let { studentId, marks } of studentGrades) {
        await assignMarks(studentId, roomId, assignmentId, marks);
    }
};

//Get marks of all the students
export const getMarksForAllStudents = async (studentIds, roomId, assignmentId) => {
    for (let studentId of studentIds){
        await getMarks(studentId, roomId, assignmentId);
    }
}

// Assign marks to a student for an assignment
export const assignMarks = async (studentId, roomId, assignmentId, marks) => {
    // Add a new grade entry
    const { data: grade, error: gradeError } = await supabase
        .from('grade')
        .insert([{ assignment_id: assignmentId, grade:marks }])
        .select();

    if (gradeError) throw new Error(gradeError.message);

    // Get enrollment ID
    const { enrollmentId } = await getEnrollmentId(studentId, roomId);

    // Link the grade entry to the enrollment in the enrollment_grade table
    const { error: linkError } = await supabase
        .from('enrollment_grade')
        .insert([{ enrollment_id: enrollmentId, grade_id: grade[0].grade_id }]);

    if (linkError) throw new Error(linkError.message);
};

// Retrieve marks for a student for an assignment
export const getMarks = async (studentId, roomId, assignmentId) => {
    // Find the enrollment ID for the student and room
    const { enrollmentId } = await getEnrollmentId(studentId, roomId);

    if (enrollmentError) throw new Error(enrollmentError.message);

    // Find the grade linked to the enrollment and assignment
    const { data: gradeId, error: gradeError } = await supabase
        .from('enrollment_grade')
        .select('grade_id')
        .eq('enrollment_id', enrollmentId);
        
    if (gradeError) throw new Error(gradeError.message);

    const gradeIds = gradeId.map((record) => record.grade_id);

    // Get marks 
    const { data: marks, error : newError } = await supabase
        .from('grade')
        .select('grade')
        .in('grade_id', gradeIds)
        .eq('assignment_id', assignmentId);

    if (newError) throw new Error(error.message);

    return marks;
};

// Update marks for a student for an assignment
export const updateMarks = async (studentId, roomId, assignmentId, newMarks) => {
    // Get enrollment ID
    const { enrollmentId } = await getEnrollmentId(studentId, roomId);

    // Find the grade entry
    const { data: gradeLink, error: linkError } = await supabase
        .from('enrollment_grade')
        .select('grade_id')
        .eq('enrollment_id', enrollmentId)
        .single();

    if (linkError) throw new Error(linkError.message);

    // Update the marks in the grade table
    const { error: updateError } = await supabase
        .from('grade')
        .update({ marks: newMarks })
        .eq('id', gradeLink.grade_id)
        .eq('assignment_id', assignmentId);

    if (updateError) throw new Error(updateError.message);

    return "Marks updated successfully.";
};

// Delete marks for a student for an assignment
export const deleteMarks = async (studentId, roomId, assignmentId) => {
    // Get enrollment ID
    const { enrollmentId } = await getEnrollmentId(studentId, roomId);

    // Find the grade entry
    const { data: gradeLink, error: linkError } = await supabase
        .from('enrollment_grade')
        .select('grade_id')
        .eq('enrollment_id', enrollmentId)
        .single();

    if (linkError) throw new Error(linkError.message);

    // Delete the grade entry
    const { error: gradeDeleteError } = await supabase
        .from('grade')
        .delete()
        .eq('id', gradeLink.grade_id)
        .eq('assignment_id', assignmentId);

    if (gradeDeleteError) throw new Error(gradeDeleteError.message);

    // Remove the link from the enrollment_grade table
    const { error: linkDeleteError } = await supabase
        .from('enrollment_grade')
        .delete()
        .eq('enrollment_id', enrollmentId)
        .eq('grade_id', gradeLink.grade_id);

    if (linkDeleteError) throw new Error(linkDeleteError.message);

    return "Marks deleted successfully.";
};

export const getEnrollmentId = async (studentId, roomId) => {
    const { data: enrollment, error } = await supabase
        .from('enrollment')
        .select('id')
        .eq('student_id', studentId)
        .eq('room_id', roomId)
        .single();

    if (error) throw new Error(error.message);

    return enrollment.id;
};
