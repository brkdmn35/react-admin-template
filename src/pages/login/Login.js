import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import classnames from "classnames";
import { useNavigate } from 'react-router-dom';

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { useAuth } from 'qreal-auth-provider/src';

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("burak@qreal.io");
  var [passwordValue, setPasswordValue] = useState("BD1qaz.xsw2");

  const { token, onLogin } = useAuth();
  let navigate = useNavigate();


  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>QMM Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                Something is wrong with your login or password :(
              </Typography>
            </Fade>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Email Adress"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={() => {
                    onLogin({ email: loginValue, password: passwordValue }).then((response) => {
                      if (response.success) {
                        navigate('/')
                      } else {
                        setError(response.message);
                      }
                    });
                  }
                  }
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              )}
              <Button
                color="primary"
                size="large"
                className={classes.forgetButton}
              >
                Forget Password
              </Button>
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()} QReal
        </Typography>
      </div>
    </Grid>
  );
}

export default Login;
