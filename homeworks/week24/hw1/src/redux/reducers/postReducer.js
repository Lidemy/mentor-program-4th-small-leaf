import { createSlice } from "@reduxjs/toolkit";
import { pagination } from "../../utils";
import {
  getPost as getPostAPI,
  getPosts as getPostsAPI,
  getPaginationPost as getPaginationPostAPI,
  addPost as addPostAPI,
  editPost as editPostAPI,
  deletePost as deletePostAPI,
} from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    pages: [],
    post: null,
    isLoadingPost: false,
    errorMessage: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setPages: (state, action) => {
      state.pages = action.payload;
    },

    setPost: (state, action) => {
      state.post = action.payload;
    },

    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setPosts,
  setPages,
  setPost,
  setIsLoadingPost,
  setErrorMessage,
} = postReducer.actions;

export const getPosts = () => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostsAPI().then((res) => {
    dispatch(setPosts(res));
    dispatch(setIsLoadingPost(false));
  });
};

export const getPaginationPost = (page, limit) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPaginationPostAPI(page, limit).then((res) => {
    const dataCount = res.headers.get("x-total-count");
    const totalPage = Math.ceil(dataCount / limit);
    dispatch(setPages(pagination(totalPage)));
    return res.json().then((res) => {
      dispatch(setPosts(res));
      dispatch(setIsLoadingPost(false));
    });
  });
};

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  return getPostAPI(id).then((res) => {
    dispatch(setPost(res[0]));
    dispatch(setIsLoadingPost(false));
    return res[0];
  });
};

export const addPost = (title, body) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  dispatch(setErrorMessage(null));
  return addPostAPI(title, body).then((res) => {
    if (res.ok === 0) {
      dispatch(setIsLoadingPost(false));
      return dispatch(setErrorMessage(res.message));
    }
    dispatch(setIsLoadingPost(false));
    return res;
  });
};

export const editPost = (id, title, body) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  dispatch(setErrorMessage(null));
  return editPostAPI(id, title, body).then((res) => {
    if (res.ok === 0) {
      dispatch(setIsLoadingPost(false));
      return dispatch(setErrorMessage(res.message));
    }
    dispatch(setIsLoadingPost(false));
    return res;
  });
};

export const deletePost = (id) => (dispatch) => {
  return deletePostAPI(id).then((res) => res);
};

export default postReducer.reducer;
