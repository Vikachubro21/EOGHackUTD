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
    <Box sx={{ flexGrow: 1 }}>
      <Typography color="white">
        {" "}
        UI designed by Vikas Thoutam and Logan Cheng
      </Typography>
      <Typography color="white"> Copyright 2023 </Typography>
    </Box>
  );
}
export default Footer;
