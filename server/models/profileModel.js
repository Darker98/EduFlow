import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://atbslsglwtyaamyszvme.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YnNsc2dsd3R5YWFteXN6dm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMzg0MTIsImV4cCI6MjA0NzYxNDQxMn0.si38mDjqblQZ46wsNw3havc7vwGdcr_UoDDj7tlyGes'
const supabase = createClient(supabaseUrl, supabaseKey)

const createProfile = async (profileData) => {
    const { first_name, last_name, email, date_of_birth, password } = profileData;

    const { data, error } = await supabase
        .from('student') 
        .insert([
            { first_name : first_name, last_name : last_name, email : email, date_of_birth : date_of_birth, password : password }
        ])
        .select(); 

    if (error) throw new Error(error.message);
};

const getProfile = async (email) => {
    const { data, error } = await supabase
        .from('student')
        .select('*')
        .eq('email', email)
        .single();
    if (error) throw new Error(error.message);
    return data;
};

const updateProfile = async (profileData) => {
    const { first_name, last_name, email, date_of_birth, password } = profileData;

    const { data, error } = await supabase
        .from('student')
        .update({ first_name: first_name, last_name : last_name, email : email, date_of_birth : date_of_birth, password : password })
        .eq('email', email)
        .select();
    
    if (error) throw new Error(error.message);
    return data;
}

const deleteProfile = async (email) => {
    const { error } = await supabase
        .from('student')
        .delete()
        .eq('email', email);
    
    if (error) throw new Error(error.message);
}

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };