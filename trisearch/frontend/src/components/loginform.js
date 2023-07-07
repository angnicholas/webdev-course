import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import React, { useState } from "react";

const LoginForm = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          marginTop: 8,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Therapist Login
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => props.handle_login(e, username, password)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            type="text"
            onChange={handleUsernameChange}
            className="login_input"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
            className="login_input"
          />
          {props.errorMessage ? (
            <Typography sx={{ color: '#1976D2' }}>Incorrect Login Details</Typography>
          ) : (
            <></>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#1976D2' }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );

}

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
  errorMessage: PropTypes.bool,
};

export default LoginForm;