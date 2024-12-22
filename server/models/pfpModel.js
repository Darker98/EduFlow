import supabase from './createClient.js'

export const uploadProfilePicture = async (file, userId, role) => {
    // Select correct table
    let tableName;
    if (role == "student") {
        tableName = "student";
    } else if (role == "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    // Upload the profile picture to the "profile-pictures" bucket
    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(`profiles/${userId}-${file.name}`, file, {
        contentType : file.type
      });
  
    if (error) throw new Error(error.message);

    // Get the URL of the uploaded file
    const { publicURL, error: urlError } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(data.path);

    if (urlError) throw new Error(error.message);

    // Store the URL in the database
    const { error: databaseError } = await supabase
        .from(tableName)
        .insert([{ pfp_url: publicURL }])
        .eq('id', userId)

    if (databaseError) throw new Error(error.message);

    return publicURL;
}

export const getProfilePictureUrl = async (userId, role) => {
    // Select correct table
    let tableName;
    if (role == "student") {
        tableName = "student";
    } else if (role == "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    // Store the URL in the database
    const { url, error } = await supabase
        .from(tableName)
        .select('pfp_url')
        .eq('id', userId)

    if (error) throw new Error(error.message);

    return url;
}

export const updateProfilePicture = async (file, userId, role) => {
    // Select correct table
    let tableName;
    if (role === "student") {
        tableName = "student";
    } else if (role === "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    // Retrieve the current profile picture URL from the database
    const { data: user, error: fetchError } = await supabase
        .from(tableName)
        .select('pfp_url')
        .eq('id', userId)
        .single();

    if (fetchError) throw new Error(fetchError.message);

    const currentPfpUrl = user.pfp_url;

    // Validate the URL
    if (!currentPfpUrl) {
        throw new Error("No existing profile picture URL found for this user.");
    }

    // Extract the path from the URL
    const path = currentPfpUrl.split('/storage/v1/object/public/profile-pictures/')[1];

    if (!path) {
        throw new Error("Invalid profile picture URL format.");
    }

    // Overwrite the file in the "profile-pictures" bucket
    const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .update(path, file, {
            contentType: file.type
        });

    if (uploadError) throw new Error(uploadError.message);

    return currentPfpUrl; // Return the same URL since the file was replaced
};

export const deleteProfilePicture = async (userId, role) => {
    // Select correct table
    let tableName;
    if (role === "student") {
        tableName = "student";
    } else if (role === "instructor") {
        tableName = "instructor";
    } else {
        throw new Error("Incorrect role provided!");
    }

    // Retrieve the current profile picture URL from the database
    const { data: user, error: fetchError } = await supabase
        .from(tableName)
        .select('pfp_url')
        .eq('id', userId)
        .single();

    if (fetchError) throw new Error(fetchError.message);

    const currentPfpUrl = user.pfp_url;

    // Validate the URL
    if (!currentPfpUrl) {
        throw new Error("No profile picture URL found for this user.");
    }

    // Extract the path from the URL
    const path = currentPfpUrl.split('/storage/v1/object/public/profile-pictures/')[1];

    if (!path) {
        throw new Error("Invalid profile picture URL format.");
    }

    // Delete the file from the "profile-pictures" bucket
    const { error: deleteError } = await supabase.storage
        .from('profile-pictures')
        .remove([path]);

    if (deleteError) throw new Error(deleteError.message);

    // Remove the URL from the database
    const { error: databaseError } = await supabase
        .from(tableName)
        .update({ pfp_url: null })
        .eq('id', userId);

    if (databaseError) throw new Error(databaseError.message);
};
