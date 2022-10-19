/* eslint-disable react-hooks/exhaustive-deps */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Container, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsDetail from "./NewsDetail";
// -------------------------------------------
export default function NewsList() {
  const fiveNewsItems = useSelector((state) => state.News.fiveNewsItems);
  const SelectedNewsItems = useSelector((state) => state.News.selectedItem);
  const NewsWithCommentItems = useSelector((state) => state.News.commentItems);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //================ get api ====*** Weak network ***============
  //   const getNews = async () => {
  // const response = await axios
  //   .get("https://feeds.npr.org/1004/feed.json")
  //   .catch((err) => {
  //     console.log("err", err);
  //   });
  //   const myArr = JSON.parse(text);
  // dispatch({ type: "all", payload: response.data });
  // console.log(response);
  //   };
  //   // ==========================================
  const fiveNewsHandle = () => {
    dispatch({ type: "fiveNews" });
  };

  useEffect(() => {
    fiveNewsHandle();
    setInterval(() => {
      fiveNewsHandle();
    }, 30000);
  }, []);

  return (
    <Container sx={{ color: "#fff" }}>
      <Stack spacing={5} justifyContent="center">
        <Typography align="center" sx={{ mt: 5 }}>
          last news in the world
        </Typography>

        <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Stack
              sx={{
                borderColor: "divider",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="last five news"
                  style={{ color: "#fff" }}
                  value="1"
                />
                <Tab label="Select" value="2" style={{ color: "#fff" }} />
                <Tab label="with comment" value="3" style={{ color: "#fff" }} />
              </TabList>
            </Stack>
            <TabPanel value="1" style={{ height: "100%" }}>
              <Stack sx={{ p: 3 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {fiveNewsItems.map((item) => (
                    <Grid item xs={12} sm={4} md={4} key={item.id}>
                      <NewsDetail item={item} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </TabPanel>
            <TabPanel value="2">
              <Stack sx={{ p: 3 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {SelectedNewsItems.map((item) => (
                    <Grid item xs={12} sm={4} md={4} key={item.id}>
                      <NewsDetail item={item} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </TabPanel>
            <TabPanel value="3">
              <Stack sx={{ p: 3 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {NewsWithCommentItems.map((item) => (
                    <Grid item xs={12} sm={4} md={4} key={item.id}>
                      <NewsDetail item={item} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </Container>
  );
}
