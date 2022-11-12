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
function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="Navbar">
          <Box
            component="img"
            sx={{ height: 60, width: 250, mr: 120, ml: 5 }}
            src={logo}
            alt="bruh"
          ></Box>
          <Button variant="text" size="large" className="Button">
            Analysis
          </Button>
          <Button variant="text" size="large">
            Plans
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
