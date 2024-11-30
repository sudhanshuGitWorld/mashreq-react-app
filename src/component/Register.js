import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlinedIcon from "@mui/icons-material/MailOutline";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";

import { useStyles } from "../utils";
import { text } from '../constant/textConstants';

const Register = ({ handleRegister, handleSigninSwitch }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterToggle = () => {
    handleSigninSwitch(false);
  }

  const handleUserRegistration = async () => {
    handleRegister(email, password, confirmPassword);
  }

  return (
    <>
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
            <Box component="section" sx={{ mb: 1, color: "#C2C4CA" }}>
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
            <Box component="section" sx={{ mb: 1, color: "#C2C4CA" }}>
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
            />
            </Grid>
            <br />
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
            <Box component="section" sx={{ mb: 1, color: "#C2C4CA" }}>
                {text.confirmPassword}
            </Box>
            <InputBase
                required
                fullWidth
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                className={classes.inputBase}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
                {text.alreadyRegistered}{" "}
                <span
                    style={{ color: "#beb4fb", cursor: "pointer" }}
                    onClick={handleRegisterToggle}
                >
                    {text.signin}
                </span>
                </Typography>
                <Button
                variant="contained"
                sx={{
                    width: "26%",
                    color: "#fff",
                    fontWeight: "bold",
                    background: "#1976d2",
                    textTransform: "none",
                    fontSize: "1em"
                }}
                onClick={() => handleUserRegistration()}
                >
                {text.register}
                </Button>
            </Stack>
            </Grid>
        </Grid>
    </>
  );
};

export default Register;
