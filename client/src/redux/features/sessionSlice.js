import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name:"session",
    initialState: {
        session_id: null
    },
    reducers:{
        setSessionId: (state, action) => {
            state.session_id = action.payload;
        }
    }
})

export const {setSessionId} = sessionSlice.actions;
export default sessionSlice.reducer;