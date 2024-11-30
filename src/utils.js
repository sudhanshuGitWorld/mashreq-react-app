
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

export const useStyles = makeStyles(() => ({
    inputBase: {
      border: `1px solid #C2C4CA`,
      height: '7vh',
      padding: '1em'
    }
  }))

  export const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  export const getFirstLetterUppercase = (str) => {
    if (!str) return '';
    const name = str?.split('@')[0];
    const firstLetter = name.charAt(0).toUpperCase();
    const remainLetters = name.slice(1);
    const concatStr = `${firstLetter}${remainLetters}`
    return concatStr;
  }
