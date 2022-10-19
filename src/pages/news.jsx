import { Box, Container, styled } from "@mui/material";

import React from "react";
import NewsList from "../sections/NewsList";

const BoxStyle = styled(Box)((theme) => ({
  backgroundImage: "linear-gradient(to top, #09203f 0%, #537895 100%)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
}));

export default function News() {
  return (
    <BoxStyle>
      <NewsList />
    </BoxStyle>
  );
}
