import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isloading:false
    },
    reducers:{
        setLoading: (state) => {
            state.isloading = true;
        },
        hideLoading: (state) => {
            state.isloading = false;
        }
    }
})

export const { setLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice.reducer;