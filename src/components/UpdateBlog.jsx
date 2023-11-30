import { Box, Typography } from "@mui/material";
import BlogForm from "./BlogForm";

const UpdateBlog = ({ activeBlog, setOpen }) => {
  return (
    <Box>
      <Typography align="center" component="h1" variant="h5" mb={2}>
        Update Blog
      </Typography>
      <BlogForm activeBlog={activeBlog} setOpen={setOpen} />
    </Box>
  );
};

export default UpdateBlog;
