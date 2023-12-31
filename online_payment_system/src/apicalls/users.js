const {axiosInstance} = require(".");

// Login User
export const LoginUser = async (payload) => {
  try {
    const  {data}  = await axiosInstance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// Register User
export const RegisterUser = async (payload) => {
  try {
    const {data } = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//get user details
export const getUserDetails = async () => {
  try {
    const {data} = await axiosInstance.post("/api/users/get-user-info");
    return data;
  } catch (error) {
    return error.response.data;
  }
};


