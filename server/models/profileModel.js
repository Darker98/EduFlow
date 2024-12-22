import supabase from './createClient.js';
import { uploadProfilePicture, updateProfilePicture, deleteProfilePicture } from './pfpModel.js';

export const createProfile = async (profileData, role) => {
    const { id, first_name, last_name, email, date_of_birth, user_name, pfpFile } = profileData;

    let tableName;
    if (role == "student") {
        tableName = "student";
    } else if (role == "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    pfpUrl = await uploadProfilePicture(pfpFile, id, role);

    const { data, error } = await supabase
        .from(tableName)
        .insert([{ id : id, first_name : first_name, last_name : last_name, email : email, date_of_birth : date_of_birth, user_name : user_name, pfp_url : pfpUrl }])
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
    const { id, first_name, user_name, last_name, email, date_of_birth, pfpFile } = profileData;

    let tableName;
    if (role === "student") {
        tableName = "student";
    } else if (role === "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    if (pfpFile != null) await updateProfilePicture(pfpFile, id, role);

    // Remove null or undefined values from the update object
    const updateData = Object.fromEntries(
        Object.entries({ first_name : first_name, last_name : last_name, email : email, date_of_birth : 
            date_of_birth, user_name : user_name })
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
    return data[0];
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

    await deleteProfilePicture(id, role);

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
//     last_name: "",
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