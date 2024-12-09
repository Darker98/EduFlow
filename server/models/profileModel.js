// import { createClient } from '@supabase/supabase-js';
// import dotenv from "dotenv";
// dotenv.config();

// const supabaseUrl = process.env.CONNECTION_URL;
// const supabaseKey = process.env.CONNECTION_STRING;
// const supabase = createClient(supabaseUrl, supabaseKey);

export const createProfile = async (profileData, role) => {
    const { id, first_name, last_name, email, date_of_birth } = profileData;

    let tableName;
    if (role == "student") {
        tableName = "student";
    } else if (role == "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    const { data, error } = await supabase
        .from(tableName)
        .insert([{ id : id, first_name : first_name, last_name : last_name, email : email, date_of_birth : date_of_birth }])
        .select();

    if (error) throw new Error(error.message);
    return data;
};

export const getProfile = async (id, role) => {
    let tableName;
    if (role === "student") {
        tableName = "student";
    } else if (role === "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

export const updateProfile = async (profileData, role) => {
    const { id, first_name, last_name, email, date_of_birth } = profileData;

    let tableName;
    if (role === "student") {
        tableName = "student";
    } else if (role === "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    // Remove null or undefined values from the update object
    const updateData = Object.fromEntries(
        Object.entries({ first_name : first_name, last_name : last_name, email : email, date_of_birth : date_of_birth })
            .filter(([_, value]) => value != null)
    );

    if (Object.keys(updateData).length === 0) {
        throw new Error("No valid fields provided for update.");
    }

    const { data, error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('id', id)
        .select();

    if (error) throw new Error(error.message);
    return data;
};

export const deleteProfile = async (id, role) => {
    let tableName;
    if (role === "student") {
        tableName = "student";
    } else if (role === "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};


// Example usage
// const profileData = {
//     id: "2a3743c6-e8b6-4a73-9096-7e64670bc600",
//     first_name: "Zaid",
//     last_name: "Sidd",
//     email: "someone@example.com",
//     date_of_birth: "2000-10-27",
// };

// createProfile(profileData, "student")
//     .then((data) => {
//         console.log("Profile created successfully:", data);
//     })
//     .catch((error) => {
//         console.error("Error creating profile:", error.message);
//     });