import {
    createSlice,
    configureStore,
    createAsyncThunk,
} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
        addCount: (state, action) => {
            // state.value = state.value + action.payload;
            state.value = state.value + action.step * action.step2;
        },
    },
});
const Todos = createSlice({
    name: "todos",
    initialState: { list: [] },
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.todo);
        },
    },
});

const comments = createSlice({
    name: "comments",
    initialState: {
        value: [],
        status: "Welcome",
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncUpFetch.pending, (state, action) => {
            state.status = "Loading";
        });
        builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
            state.value = action.payload;
            state.status = "complete";
        });
        builder.addCase(asyncUpFetch.rejected, (state, action) => {
            state.status = "fail";
        });
    },
});

const asyncUpFetch = createAsyncThunk("counterSlice/asyncUpFetch", async () => {
    const resp = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1/comments"
    );
    const data = await resp.json();
    return data.value;
});

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        todos: Todos.reducer,
        comments: comments.reducer,
    },
});

export default store;
export { asyncUpFetch };
export const { update } = comments.actions;
