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
      .upload(`profiles/${userId}-${file.name}`, file);
  
    if (error) throw new Error(error.message);
  
    // Get the URL of the uploaded file
    const { publicURL, error: urlError } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(data.path);
  
    if (urlError) throw new Error(error.message);
  
    // Store the URL in the database
    const { error : databaseError } = await supabase
        .from(tableName)
        .insert([{ pfp_url : publicURL }])
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