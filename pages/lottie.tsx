import React from "react";
import Lottie from "react-lottie-player";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
// @ts-ignore
import lottieJson from "https://assets3.lottiefiles.com/packages/lf20_pwohahvd.json";

const LottiePage = () => (
  <Container>
    <Stack direction="row" justifyContent="center">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 700, height: 700 }}
      />
    </Stack>
  </Container>
);

export default LottiePage;
