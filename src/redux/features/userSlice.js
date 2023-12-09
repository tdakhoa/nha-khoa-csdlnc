import { createSlice } from "@reduxjs/toolkit";

const initialState = { uid: "", premium: false };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userData: (state, action) => {
            state.uid = action.payload.uid;
            state.premium = action.payload.premium;
        }
    }
});

export const { userData } = userSlice.actions;

export default userSlice.reducer;
