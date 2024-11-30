
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

  export const guidelines = [
    'Secure and reliable for users',
    'Even your grandma can use it',
    'Works 15% faster than others'
  ]

  export const text = {
    loginFailedMsg: 'Failed! Enter correct username and password.',
    loginSuccessMsg: "Success! You're logged in.",
    welcome: 'Welcome',
    subline: 'to online help center!',
    email: 'E-mail',
    password: 'Password',
    login: 'Log in',
    signin: 'Sign-in',
    register: 'Register',
    createAccount: 'Sign-up',
    notRegistered: 'Not registered yet?',
    confirmPassword: 'Confirm Password',
    alreadyRegistered: 'Already Registered?',
  }