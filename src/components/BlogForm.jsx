import { Box, Button, TextField, Select } from "@mui/material";
import { InputLabel, MenuItem, FormControl } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import useBlogs from "../hooks/useBlogs";
import { useNavigate } from "react-router-dom";

export default function BlogForm({ activeBlog, setOpen }) {
  const { categories } = useSelector((state) => state.blog);
  const { postBlogData, updateBlog } = useBlogs();
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      title: activeBlog?.title || "",
      content: activeBlog?.content || "",
      image: activeBlog?.image || "",
      category: activeBlog?.category || "",
      status: activeBlog?.status || "",
    },

    onSubmit: (values, action) => {
      activeBlog
        ? updateBlog(activeBlog._id, values)
        : postBlogData("blogs", values);
      action.resetForm();
      activeBlog && setOpen(false);
      activeBlog || navigate("/");
    },
  });
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <TextField
        required
        fullWidth
        id="title"
        label="Title"
        autoFocus
        onChange={handleChange}
        value={values.title}
      />
      <TextField
        required
        fullWidth
        id="image"
        label="Image URL"
        type="url"
        onChange={handleChange}
        value={values.image}
      />
      <FormControl fullWidth>
        <InputLabel id="categories">Category</InputLabel>
        <Select
          required
          labelId="categories"
          id="category"
          label="category"
          name="category"
          value={values.category}
          onChange={handleChange}
        >
          {categories?.map((item) => (
            <MenuItem key={item?._id} value={item?.name}>
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="Status">Status</InputLabel>
        <Select
          required
          labelId="Status"
          id="status"
          label="status"
          name="status"
          value={values.status}
          onChange={handleChange}
        >
          <MenuItem value={"d"}>Draft</MenuItem>
          <MenuItem value={"p"}>Published</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        id="content"
        label="Content"
        multiline
        rows={2}
        onChange={handleChange}
        value={values.content}
      />

      <Button type="submit" fullWidth variant="contained">
        {activeBlog ? "Update Blog" : "New Blog"}
      </Button>
    </Box>
  );
}
