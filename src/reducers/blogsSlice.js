import { createSlice } from "@reduxjs/toolkit";

import blogsService from "../services/blogs";
import { showNotification } from "./notificationSlice";

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    addBlog: (state, action) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const newBlog = action.payload;
      newBlog.user = {
        id: newBlog.user,
        name: storedUser.name,
        username: storedUser.username,
      };
      return [...state, newBlog].sort((a, b) => b.likes - a.likes);
    },
    deleteBlog: (state, action) => {
      return state.filter((b) => b.id !== action.payload).sort((a, b) => b.likes - a.likes);
    },
    addLike: (state, action) => {
      return state
        .map((b) => (b.id === action.payload ? { ...b, likes: b.likes + 1 } : b))
        .sort((a, b) => b.likes - a.likes);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(blogsSlice.actions.setBlogs(blogs));
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.addBlog(blog);
      dispatch(blogsSlice.actions.addBlog(newBlog));
      dispatch(showNotification(`success.${blog.title} by ${blog.author} was added`));
    } catch (error) {
      console.log("Could not add blog! \n", error);
      if (error.response) {
        dispatch(showNotification(`failure.Could not add blog - ${error.response.data.error}`));
      } else {
        dispatch(showNotification(`failure.Could not add blog`));
      }
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.deleteBlog(blog.id);
      dispatch(blogsSlice.actions.deleteBlog(blog.id));
      dispatch(showNotification(`success.${blog.title} by ${blog.author} was deleted`));
    } catch (error) {
      console.log(error);
      dispatch(showNotification(`failure.Could not delete blog - ${error.response.data.error}`));
    }
  };
};

export const addLike = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.updateLikes(blog);
      dispatch(blogsSlice.actions.addLike(blog.id));
    } catch (error) {
      console.log(error);
      dispatch(showNotification("failure.Error occured when liking"));
    }
  };
};

export default blogsSlice.reducer;
