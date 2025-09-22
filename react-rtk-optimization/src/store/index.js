import { configureStore, createSlice } from "@reduxjs/toolkit";

// Posts Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    toggleVerify: (state, action) => {
      const post = state.find(p => p.id === action.payload);
      if (post) post.verifyPost = !post.verifyPost;
    },
  },
});

export const { addPost, toggleVerify } = postsSlice.actions;

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});
