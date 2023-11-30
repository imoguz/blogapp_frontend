import { Box, Button, Grid, Typography } from "@mui/material";
import useBlogs from "../hooks/useBlogs";
import { useNavigate } from "react-router-dom";

const DeleteBlog = ({ setOpen, id }) => {
  const { delBlog } = useBlogs();
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h6" component="h2">
        Do you really want to delete your blog?
      </Typography>
      <Typography sx={{ mt: 2 }}>This process cannot be undone!</Typography>
      <Grid
        item
        sx={{ display: "flex", gap: 6, mt: 3, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            delBlog(id);
            setOpen(false);
            navigate("/");
          }}
        >
          Delete
        </Button>
      </Grid>
    </Box>
  );
};

export default DeleteBlog;
