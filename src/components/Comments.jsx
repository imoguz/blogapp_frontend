import { Divider, Avatar, Typography } from "@mui/material";
import { Box, Button, TextField } from "@mui/material";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";
import useBlogs from "../hooks/useBlogs";

export default function Comments({ activeBlog: { _id, comments } }) {
  const { userData } = useAuthContext();
  const { postBlogData } = useBlogs();
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      post: _id,
      user: userData.user?._id,
      content: newComment,
    };
    postBlogData("comments", data);
    setNewComment("");
  };
  return (
    <>
      <Typography
        variant="h5"
        pl={3}
        mt={3}
        color="text.primary"
        sx={{ textShadow: "0px 0px 3px #ff8585" }}
      >
        Comments...
      </Typography>
      {comments?.map((item, index) => (
        <Box
          key={item?._id}
          sx={{ display: "flex", gap: 2, my: 2, pl: 3, pr: 5 }}
        >
          <Avatar sx={{ bgcolor: "crimson" }}>
            {item.user.username?.charAt(0)}
          </Avatar>
          <Box sx={{ width: "100%" }}>
            <Typography variant="p" component="p">
              {item.user?.username}
            </Typography>
            <Typography color="text.secondary" variant="p" component="p">
              {new Date(item?.createdAt).toLocaleString("en-US", {
                timeZone: "America/New_York",
              })}
            </Typography>
            <Typography color="text.secondary" variant="p" component="p">
              {item?.content}
            </Typography>
            {index !== comments?.length - 1 && (
              <Divider sx={{ mt: 1 }} variant="fullWidth" />
            )}
          </Box>
        </Box>
      ))}
      <Box component="form" onSubmit={handleSubmit} px={5}>
        <TextField
          id="content"
          label="Your comments"
          required
          fullWidth
          multiline
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
          Add Comment
        </Button>
      </Box>
    </>
  );
}
