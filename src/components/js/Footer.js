import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Stack,
  Button,
} from "@mui/material";
import logo from "../images/EOG_Resources_logo.svg";
// NOTE TO SELF Make the buttons contain typography
function Footer() {
  return (
    <Box
      sx={{
        height: "100px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography color="white" sx={{}}>
          UI designed by Vikas Thoutam and Logan Cheng
        </Typography>
        <Typography color="white"> © Copyright 2023 </Typography>
      </div>
    </Box>
  );
}
export default Footer;
