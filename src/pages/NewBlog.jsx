import * as React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import BlogForm from "../components/BlogForm";

export default function NewBlog() {
  return (
    <Grid container justifyContent="center" pt={5} className="minheight2">
      <Paper elevation={5} sx={{ width: 400, height: 500, p: 3 }}>
        <Typography component="h1" variant="h5" align="center">
          New Blog
        </Typography>
        <BlogForm />
      </Paper>
    </Grid>
  );
}
