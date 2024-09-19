import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (t) => {
  token = t;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (blogData) => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;
  const response = await axios.post(baseUrl, blogData, config || {});
  return response.data;
};

const addComment = async (comment, blogId) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment });
  return response.data;
};

const updateLikes = async (blogData) => {
  blogData.likes = blogData.likes + 1;
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;
  const response = await axios.put(`${baseUrl}/${blogData.id}`, blogData, config || {});
  return response.data;
};

const deleteBlog = async (blog) => {
  const blogId = blog.id;
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : null;
  const response = await axios.delete(`${baseUrl}/${blogId}`, config || {});
  return response.data;
};

const blogsService = {
  setToken,
  getAll,
  addBlog,
  addComment,
  updateLikes,
  deleteBlog,
};

export default blogsService;
