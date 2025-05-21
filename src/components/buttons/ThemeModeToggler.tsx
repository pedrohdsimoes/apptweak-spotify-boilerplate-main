import * as React from "react";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useColorScheme } from "@mui/material/styles";

interface ThemeModeTogglerProps {}

const ThemeModeToggler: React.FC<ThemeModeTogglerProps> = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Box>
      <FormControl>
        <RadioGroup
          aria-labelledby="theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) => setMode(event.target.value as "system" | "light" | "dark")}
        >
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ThemeModeToggler;
