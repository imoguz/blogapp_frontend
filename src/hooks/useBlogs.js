import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail } from "../features/blogSlice";
import { useAuthContext } from "../context/authContext";
import { toastifySuccess, toastifyError } from "../helper/Toastify";

const useBlogs = () => {
  const baseURL = "https://blogapp-backend-sigma.vercel.app/blog";
  const dispatch = useDispatch();
  const { userData } = useAuthContext();
  const config = {
    headers: { Authorization: `Bearer ${userData.tokenData?.accessToken}` },
  };

  const getApiData = async (path, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(`${baseURL}/${path}/${id}`);
      dispatch(fetchSuccess({ path, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };
  const getUserBlogs = async (path, author) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${baseURL}/blogs/?search[author]=${author}`,
        config
      );
      dispatch(fetchSuccess({ path, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };

  const getCurrentData = async (path, blogName, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(`${baseURL}/${blogName}/${id}/`);
      dispatch(fetchSuccess({ path, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };

  const delBlog = async (id) => {
    dispatch(fetchStart());
    try {
      await axios.delete(`${baseURL}/blogs/${id}/`, config);
      getApiData("blogs", "");
      dispatch(fetchSuccess({ path: "activeBlog", data: {} }));
      toastifySuccess("The blog has been successfully deleted.");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };
  const updateBlog = async (id, formValues) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.put(
        `${baseURL}/blogs/${id}/`,
        formValues,
        config
      );
      getApiData("blogs", "");
      dispatch(fetchSuccess({ path: "activeBlog", data }));
      toastifySuccess("The blog has been successfully updated.");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };
  const postBlogData = async (path, formValues, msg) => {
    dispatch(fetchStart());
    try {
      await axios.post(`${baseURL}/${path}`, formValues, config);
      getApiData("blogs", "");
      path === "blogs" &&
        toastifySuccess(`Your blog has been successfully created.`);
      path === "comments" &&
        toastifySuccess(`Your comment has been successfully added.`);
    } catch (error) {
      dispatch(fetchFail());
      path !== "views" && toastifyError(error.message);
    }
  };

  return {
    getApiData,
    postBlogData,
    getCurrentData,
    delBlog,
    updateBlog,
    getUserBlogs,
  };
};
export default useBlogs;
