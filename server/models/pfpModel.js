import { decode, encode } from 'base64-arraybuffer'
import supabase from './createClient.js'

export const uploadProfilePicture = async (file, userId) => {
    // Upload the profile picture to the "profile-pictures" bucket
    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(`${userId}`, encode(file.buffer), {
        cacheControl: '3600',
        upsert: true,
        contentType : file.mimetype
      });
    if (error) throw new Error(error.message);
}

export const getProfilePicture = async (userId) => {
    const { data, error } = await supabase
        .storage
        .from('profile-pictures')
        .download(`${userId}`);

    if (error) throw new Error(error.message);

    return data;
}

export const deleteProfilePicture = async (userId) => {
    const { data, error } = await supabase
        .storage
        .from('profile-pictures')
        .remove([`${userId}`]);
};
