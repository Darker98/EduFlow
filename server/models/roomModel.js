import supabase from './createClient.js';

export const createRoom = async (roomData) => {
    const { section_name, room_name, enrollment_key, instructor_id } = roomData;

    const { data, error } = await supabase
        .from('room')
        .insert([{ section_name : section_name, room_name : room_name, enrollment_key : enrollment_key, instructor_id : instructor_id }])
        .select('id');

    if (error) throw new Error(error.message);
    return data[0]; //should return the first row of the result
};

//making this function here to get one specific room
export const getRoom = async (room_id) => {
    const {data, error} = await supabase
    .from("room")
    .select("*")
    .eq("id", room_id);
    
    if(error) throw new Error(error.message);
    return data[0];
}

export const getRooms = async (instructor_id) => {
    const { data, error } = await supabase
        .from('room')
        .select('*') //made the change of returing all the room data of that specfic id
        .eq('instructor_id', instructor_id);

    if (error) throw new Error(error.message);
    return data;
};

export const updateRoom = async (roomData, room_id) => {
    const { section_name, room_name, enrollment_key } = roomData;

    // Remove null or undefined values from the update object
    const updateData = Object.fromEntries(
        Object.entries({ section_name : section_name, room_name : room_name, enrollment_key : enrollment_key })
            .filter(([_, value]) => value != null)
    );

    if (Object.keys(updateData).length === 0) {
        throw new Error("No valid fields provided for update.");
    }

    const { data, error } = await supabase
        .from('room')
        .update(updateData)
        .eq('id', room_id)
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

export const deleteRoom = async (room_id) => {
    const { error } = await supabase
        .from('room')
        .delete()
        .eq('id', room_id);

    if (error) throw new Error(error.message);
};
