import axios from "axios";
const baseUrl = "/api/login";

const login = async (userDetails) => {
  const response = await axios.post(baseUrl, userDetails);
  return response.data;
};

const loginService = {
  login,
};

export default loginService;
