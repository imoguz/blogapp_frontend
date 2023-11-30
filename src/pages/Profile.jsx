import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Button, Typography } from "@mui/material";
import { useAuthContext } from "../context/authContext";
import Container from "@mui/material/Container";
import UpdateUser from "../components/UpdateUser";
import { useState } from "react";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const {
    userData: {
      user: { bio, email, image, username },
    },
  } = useAuthContext();
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ pt: 4 }}
      className="minheight2"
    >
      <Card sx={{ minWidth: 345, p: 2 }}>
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: "contain" }}
          image={image || ""}
          title={username || ""}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {username || ""}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" align="center">
            {email || ""}
          </Typography>
          <Typography variant="h6" align="center">
            {bio || ""}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}
          >
            Update Account
          </Button>
        </CardActions>
      </Card>
      <UpdateUser open={open} setOpen={setOpen} />
    </Container>
  );
}
