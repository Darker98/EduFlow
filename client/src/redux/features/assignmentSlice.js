import { createSlice } from "@reduxjs/toolkit";

export const assignmentSlice = createSlice({
    name:"assignment",
    initialState: {
        assignment_data:null
    },
    reducers: {
        setAssignmentData: (state, action) => {
            state.assignment_data = action.payload;
        }
    }
})

export const { setAssignmentData } = assignmentSlice.actions;
export default assignmentSlice.reducer;