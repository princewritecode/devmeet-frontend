import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addUsersInFeed: (state, action) =>
        {
            return action.payload;
        },
        removeUserFromFeed: () =>
        {
            return null;
        }
    }
});

export const { addUsersInFeed } = feedSlice.actions;
export default feedSlice.reducer;