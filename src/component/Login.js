import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Stack from "@mui/material/Stack";

import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlinedIcon from "@mui/icons-material/MailOutline";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";

import Register from "./Register";
import AppSnackbar from './Snackbar';
import GuidelineContainer from "./GuidelineContainer";
import { getUser, addUser } from '../redux/userSlice';
import { useStyles, darkTheme } from "../utils";
import { text } from '../constant/textConstants';
import { LOGIN_API, SIGNUP_API, WITH_CREDENTIALS } from '../constant/apiUrls';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isRegister, setRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const classes = useStyles();

  const boxstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "auto",
    bgcolor: "#378FFB",
    boxShadow: 24,
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

 const handleLogin = async () => {
    try {
      const payload = { email, password };
      const response = await axios.post(LOGIN_API, payload, WITH_CREDENTIALS);
      const data = Object.keys(response?.data?.data)?.length > 0 ? response.data.data : [];

      if (data) {
        dispatch(getUser({ ...data, isLoggedin: true }));
        setError('');
        setOpen(true);
        navigate('/dashboard');
      }
    } catch (error) {
        const errorMsg = error.response.data.message;
        setError(errorMsg);
        setOpen(true);
    }
  }

  const handleRegister = async (email, password, confirmPassword) => {
    try {
      const payload = { email, password, confirmPassword };
      const response = await axios.post(SIGNUP_API, payload, WITH_CREDENTIALS);
      const data = response?.data;

      if (data) {
        dispatch(addUser({ data, email }));
        setError('');
        navigate('/dashboard');
        setOpen(true);
      }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error?.response?.data;
        setError(errorMsg);
        setOpen(true);
    }
  }

  return (
    <>
      <AppSnackbar open={open} error={error} handleClose={handleClose} isRegister={isRegister} />
      <div
        style={{
          background: "#0050b7",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              >
                <GuidelineContainer />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#fff",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={isRegister ? { mt: "2em" } : { mt: "4em" }}>
                      {isRegister ? (
                        <Register
                          open={open}
                          error={error}
                          handleClose={handleClose}
                          handleRegister={handleRegister}
                          handleSigninSwitch={setRegister} />
                      ) : (
                        <Grid container spacing={1}>
                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Box
                              component="section"
                              sx={{ mb: 1, color: "#C2C4CA" }}
                            >
                              {text.email}
                            </Box>
                            <InputBase
                              required
                              fullWidth
                              id="email"
                              name="email"
                              autoComplete="email"
                              className={classes.inputBase}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              sx={{
                                input: { color: "#4e524f" },
                                button: { color: "#C2C4CA" },
                              }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <IconButton>
                                    <EmailOutlinedIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </Grid>
                          <br />
                          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Box
                              component="section"
                              sx={{ mb: 1, color: "#C2C4CA" }}
                            >
                              {text.password}
                            </Box>
                            <InputBase
                              required
                              fullWidth
                              name="password"
                              type={showPassword ? "text" : "password"}
                              id="password"
                              autoComplete="new-password"
                              className={classes.inputBase}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              sx={{
                                input: { color: "#4e524f" },
                                button: { color: "#C2C4CA" },
                              }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <IconButton>
                                    <HttpsOutlinedIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label={
                                      showPassword
                                        ? "hide the password"
                                        : "display the password"
                                    }
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Stack
                              direction="row"
                              spacing={2}
                              sx={{ justifyContent: "space-evenly", mt: "3em" }}
                            >
                              <Typography
                                variant="body1"
                                component="span"
                                style={{ marginTop: "10px", color: "#c2c4ca" }}
                              >
                                {text.notRegistered}{" "}
                                <span
                                  style={{
                                    color: "#beb4fb",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setRegister(true)}
                                >
                                  {text.createAccount}
                                </span>
                              </Typography>
                              <Button
                                variant="contained"
                                fontSize="large"
                                sx={{
                                  width: "26%",
                                  color: "#fff",
                                  fontWeight: "bold",
                                  background: "#1976d2",
                                  textTransform: "none",
                                  fontSize: "1em"
                                }}
                                onClick={handleLogin}
                              >
                                {text.login}
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Login;
