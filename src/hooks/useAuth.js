import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toastifySuccess, toastifyError } from "../helper/Toastify";

const useAuth = () => {
  const baseURL = "https://blogapp-backend-sigma.vercel.app/blog";
  const { setUserData } = useAuthContext();
  const navigate = useNavigate();

  const signin = async (formValue) => {
    try {
      const { data } = await axios.post(`${baseURL}/auth/login/`, formValue);
      localStorage.setItem("userData", JSON.stringify(data));
      setUserData(JSON.parse(localStorage.getItem("userData")) || {});
      navigate("/");
      toastifySuccess("You have successfully logged in.");
    } catch (error) {
      toastifyError(
        "You have not successfully logged in. Check your login information."
      );
    }
  };

  const signup = async (formValue) => {
    try {
      const { data } = await axios.post(`${baseURL}/users`, formValue);
      toastifySuccess("You have successfully registered.");
      setUserData(data);
      navigate("/login");
    } catch (error) {
      toastifyError(
        "You have not successfully registered. Check your login information."
      );
    }
  };

  const logout = async (msg) => {
    try {
      localStorage.removeItem("userData");
      setUserData({});
      msg || toastifySuccess("You have successfully logged out.");
      navigate("/login");
    } catch (error) {
      toastifySuccess("You have not successfully logged out.");
    }
  };

  const update = async (formValue, id, accessToken) => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      await axios.put(`${baseURL}/users/${id}`, formValue, config);
      toastifySuccess(
        "User information successfully updated. You need to login again..."
      );
      logout("update");
      navigate("/login");
    } catch (error) {
      toastifyError(
        "User information can not be updated. Check your user information."
      );
    }
  };

  return { signin, signup, logout, update };
};

export default useAuth;
