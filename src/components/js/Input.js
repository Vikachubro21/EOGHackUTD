import {
  AppBar,
  Autocomplete,
  Box,
  Toolbar,
  Typography,
  Container,
  Stack,
  Button,
  TextField,
} from "@mui/material";

function Input() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography> Enter your information here! </Typography>
      <div className="inputField">
        <TextField id="outlined-basic" label="Depth" variant="outlined" />
      </div>
      <div className="inputField">
        <TextField id="outlined-basic" label="Pressure" variant="outlined" />
      </div>
      <div className="inputField">
        <TextField id="outlined-basic" label="Hardness" variant="outlined" />
      </div>
    </Box>
  );
}
export default Input;
