import * as React from "react";
import { Box, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import Avatar from "../assets/Avatar.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import MailIcon from "@mui/icons-material/Mail";

export default function About() {
  return (
    <Grid pt={5} display="flex" justifyContent="center" className="minheight2">
      <Box>
        <Card sx={{ width: 350, p: 2 }}>
          <CardMedia
            component="img"
            sx={{ height: 160, objectFit: "contain" }}
            image={Avatar}
            title="Abdullah Oğuz"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h5" align="center">
              Abdullah Oğuz
            </Typography>
            <Typography variant="body2" color="text.secondary" align="justify">
              For over two years, I have been a Full Stack Developer with a
              strong emphasis on writing clean and efficient code, developing
              complex solutions, and creating responsive designs. I possess a
              high-energy and honest approach to my work. My experience in both
              front-end and back-end development has allowed me to establish a
              solid foundation for projects.
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <LinkedInIcon
              fontSize="large"
              className="hover"
              onClick={() =>
                window.open("https://linkedin.com/in/imoguz", "_blank")
              }
            />
            <GitHubIcon
              fontSize="large"
              className="hover"
              onClick={() => window.open("https://github.com/imoguz", "_blank")}
            />
            <LanguageIcon
              fontSize="large"
              className="hover"
              onClick={() =>
                window.open("https://portfolio-imoguz.vercel.app/", "_blank")
              }
            />
            <MailIcon
              fontSize="large"
              className="hover"
              onClick={() =>
                window.open("mailto:imoguz0510@gmail.com", "_blank")
              }
            />
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}
