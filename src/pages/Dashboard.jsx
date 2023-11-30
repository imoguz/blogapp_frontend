import useBlogs from "../hooks/useBlogs";
import { Box, Button, Grid, Radio, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { fetchSuccess } from "../features/blogSlice";
import Cards from "../components/Cards";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function Dashboard() {
  const [radioValue, setRadioValue] = useState("publish_date");
  const [sortDirection, setSortDirection] = useState(false);
  const { getApiData } = useBlogs();
  const { userData, myBlog, darkMode } = useAuthContext();

  useEffect(() => {
    getApiData("blogs", "");
    getApiData("categories", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const sortFn = () => {
    const data = [...blogs];
    data.sort((a, b) => {
      if (radioValue === "publish_date") {
        return sortDirection
          ? new Date(b.publish_date) - new Date(a.publish_date)
          : new Date(a.publish_date) - new Date(b.publish_date);
      } else {
        return sortDirection
          ? b[radioValue] - a[radioValue]
          : a[radioValue] - b[radioValue];
      }
    });
    dispatch(fetchSuccess({ path: "blogs", data }));
  };
  useEffect(() => {
    sortFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, sortDirection]);
  const style = {
    "& .MuiFormControlLabel-label": {
      fontSize: { xs: "0.8rem", md: "1rem" },
      marginLeft: { xs: "0rem" },
      marginInlineStart: { xs: "-6px" },
    },
  };
  const radioStyle = {
    "& .MuiSvgIcon-root": {
      fontSize: { xs: "20px", md: "normal" },
    },
  };
  return (
    <Box>
      <Grid item>
        <FormControl
          onChange={(e) => setRadioValue(e.target.value)}
          sx={{
            display: "flex",
            position: "fixed",
            width: "100%",
            minHeight: "3rem",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 1,
            backgroundColor: darkMode ? "#333376" : "#87c2fd",
          }}
        >
          <FormLabel id="radio-buttons">SortBy:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons"
            name="row-radio-buttons-group"
            defaultValue="publish_date"
            sx={style}
          >
            <FormControlLabel
              value="publish_date"
              control={<Radio sx={radioStyle} />}
              label="Date"
              sx={style}
            />
            <FormControlLabel
              value="likes"
              control={<Radio sx={radioStyle} />}
              label="Likes"
              sx={style}
            />
            <FormControlLabel
              value="comment_count"
              control={<Radio sx={radioStyle} />}
              label="Comments"
              sx={style}
            />
            <FormControlLabel
              value="post_views"
              control={<Radio sx={radioStyle} />}
              label="Views"
              sx={style}
            />
          </RadioGroup>
          <Button
            onClick={() => {
              setSortDirection(!sortDirection);
            }}
          >
            {sortDirection ? (
              <ArrowCircleUpIcon
                sx={{
                  color: "#1976d2",
                  fontSize: 30,
                  "&:hover": { color: "#023d79" },
                }}
              />
            ) : (
              <ArrowCircleDownIcon
                sx={{
                  color: "#1976d2",
                  fontSize: 30,
                  "&:hover": { color: "#023d79" },
                }}
              />
            )}
          </Button>
        </FormControl>
        <div style={{ height: "3rem" }}></div>
      </Grid>
      <Grid
        container
        justifyContent="center"
        p={4}
        sx={{ gap: 3 }}
        className="minheight1"
      >
        {blogs?.map((item) => (
          <React.Fragment key={item._id}>
            {myBlog && item.author === userData.user.username && (
              <Cards item={item} />
            )}
            {!myBlog && item.status === "p" && <Cards item={item} />}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}
export default Dashboard;
