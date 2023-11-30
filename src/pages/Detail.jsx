import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Typography, Avatar, Box, Button, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../components/Comments";
import useBlogs from "../hooks/useBlogs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuthContext } from "../context/authContext";
import DetailModal from "../components/DetailModal";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const { userData } = useAuthContext();
  const { postBlogData, getCurrentData } = useBlogs();
  const { activeBlog } = useSelector((state) => state.blog);
  const [isComment, setIsComment] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState();

  const {
    _id,
    title,
    image,
    author,
    publish_date,
    likes_n,
    category,
    content,
    likes,
    comment_count,
    post_views,
  } = activeBlog;

  const date = new Date(publish_date).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  const checkLike = likes_n?.some(
    (item) => item.user_id === userData.user?._id
  );

  const handleFav = () => {
    postBlogData("likes", {
      user_id: userData.user?._id,
      post_id: _id,
    });
  };

  useEffect(() => {
    getCurrentData("activeBlog", "blogs", id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFav]);

  useEffect(() => {
    postBlogData("views", { user: userData.user._id, post_id: _id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      className="minheight"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Card sx={{ width: 600, p: 2, my: 2, boxShadow: 5 }}>
        <CardMedia
          component="img"
          alt="content image"
          height="200"
          image={image}
          sx={{ objectFit: "contain", mb: 2 }}
        />
        <CardContent>
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Avatar
              alt={author}
              src="/static/images/avatar/2.jpg"
              sx={{ bgcolor: "#1976D2" }}
            />
            <Grid item>
              <Typography variant="body2" color="text.primary">
                {author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {date}
              </Typography>
            </Grid>
          </Box>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="hbody1">
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 4,
          }}
        >
          <Grid item sx={{ display: "flex", gap: 1 }}>
            <Box
              component="span"
              onClick={handleFav}
              className="hoverIcon"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 1 }}
            >
              <FavoriteIcon sx={{ color: checkLike && "red" }}></FavoriteIcon>
              <Typography variant="span" color="text.secondary" fontSize={16}>
                {likes}
              </Typography>
            </Box>
            <Box
              component="span"
              onClick={() => setIsComment(!isComment)}
              className="hoverIcon"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 1 }}
            >
              <CommentIcon />
              <Typography variant="span" color="text.secondary" fontSize={16}>
                {comment_count}
              </Typography>
            </Box>
            <Box
              component="span"
              className="hoverIcon"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 1 }}
            >
              <VisibilityIcon />
              <Typography variant="span" color="text.secondary" fontSize={16}>
                {post_views}
              </Typography>
            </Box>
          </Grid>

          {userData.user?.username === author && (
            <Box
              component="span"
              mx="auto"
              sx={{
                display: "flex",
                gap: 4,
              }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<UpdateIcon />}
                onClick={() => {
                  setAction("update");
                  setOpen(true);
                }}
              >
                Update Blog
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => {
                  setAction("delete");
                  setOpen(true);
                }}
              >
                Delete Blog
              </Button>
            </Box>
          )}
        </CardActions>
        {isComment && <Comments activeBlog={activeBlog} />}
      </Card>
      <DetailModal {...{ open, setOpen, action }} />
    </Grid>
  );
};

export default Detail;
