import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";

import { verifyToken } from "../api/main";
import { addToken } from "../store/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh"
    },
    margin: {
        margin: theme.spacing(1)
    },
    textField: {
        width: 250
    },
    formGroup: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

function Login({ addToken }) {
    const classes = useStyles();
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [remember, setRemember] = React.useState(true);

    const handleChange = event => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleLogin = () => {
        if (password.length > 10) {
            verifyToken(password).then(data => {
                if (data.verifed) {
                    if (remember) localStorage.setItem("token", password);
                    addToken(password);
                }
            });
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.formGroup}>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel htmlFor="standard-adornment-password">
                        Password
                    </InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
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
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={remember}
                        onChange={() => {
                            setRemember(!remember);
                        }}
                        value="remember"
                    />
                }
                label="Remember Password"
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToken: token => dispatch(addToken(token))
    };
};

const InputAdornments = connect(
    null,
    mapDispatchToProps
)(Login);

export default InputAdornments;
