import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (t) => {
  token = t;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
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

export default { setToken, getAll, addBlog, updateLikes, deleteBlog };
