import { fetchData } from "./FetchData.js";
import error from "eslint-plugin-react/lib/util/error.js";

export const getLoggedInUser = async () => {
  try {
    const user = await fetchData("/api/users", {
      method: "GET",
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const Login = async ({ email, password }) => {
  try {
    const response = await fetchData("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const Signup = async ({ username, email, password }) => {
  try {
    const response = await fetchData("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    return response; // Return response on success
  } catch (error) {

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};


export const Logout = async () => {
  await fetchData("/api/users/logout", { method: "POST" });
};
