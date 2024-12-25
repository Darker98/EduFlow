import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user_id: null,
        user_data: null,
    },
    reducers:{
        setUserId : (state, action) => {
            state.user_id = action.payload;
        },
        setUserData : (state, action) => {
            state.user_data = action.payload;
        },
        setUserPfpUrl : (state, action) => {
            state.user_data.pfp_url = action.payload;
        }
    }
});

export const { setUserId, setUserData, setUserPfpUrl } = userSlice.actions;
export default userSlice.reducer;