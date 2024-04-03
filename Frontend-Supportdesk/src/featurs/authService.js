import axios from "axios";

const register = async (formsData) => {
  
  const response = await axios.post("/api/user/", formsData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
const login = async (formData) => {
  const response = await axios.post("/api/user/login", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
