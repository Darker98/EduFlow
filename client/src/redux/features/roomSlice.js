import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name:"room",
    initialState: {
        room_id: null,
        room_data: null
    },
    reducers:{
        setRoomId: (state, action) => {
            state.room_id = action.payload;
        },
        setRoomData: (state, action) => {
            state.room_data = action.payload;
        }
    }
});

export const {setRoomId, setRoomData} = roomSlice.actions;
export default roomSlice.reducer;