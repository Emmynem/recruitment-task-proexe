import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data");
    const users = await response.json();
    return users;
});

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: [],
        loading: false
    },
    reducers: {
        userAdded(state, action) {
            state.entities.push(action.payload);
        },
        userUpdated(state, action) {
            const { id, name, email } = action.payload;
            const existingUser = state.entities.find((user) => user.id === id);
            if (existingUser) {
                existingUser.name = name;
                existingUser.email = email;
            }
        },
        userDeleted(state, action) {
            const { id } = action.payload;
            const existingUser = state.entities.find((user) => user.id === id);
            if (existingUser) {
                state.entities = state.entities.filter((user) => user.id !== id);
            }
        },
        usersAscending(state){
            state.entities = state.entities.sort((a, b) => (a.username > b.username) ? 1 : -1);
        },
        usersDescending(state) {
            state.entities = state.entities.sort((a, b) => (a.username < b.username) ? 1 : -1);
        }
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.entities = [...state.entities, ...action.payload];
        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

export const { userAdded, userUpdated, userDeleted, usersAscending, usersDescending } = usersSlice.actions;

export default usersSlice.reducer;