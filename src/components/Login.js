import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress
} from "@material-ui/core";

import { verifyMerchant } from "../api/main";
import { addToken, setMerchant, setSnackbar } from "../store/actions";
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

function Login({ addToken, setMerchant, setSnackbar }) {
    const classes = useStyles();
    const [password, setPassword] = React.useState("");
    const [remember, setRemember] = React.useState(true);
    const [active, setActive] = React.useState(false);

    const handleChange = event => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if (password.length > 10) {
            setActive(true);
            verifyMerchant(password)
                .then(data => {
                    if (!data.error) {
                        setMerchant(data.result);
                        if (remember) localStorage.setItem("token", password);
                        addToken(password);
                    } else {
                        setSnackbar({
                            isSnackBarOpen: true,
                            message: "Error verifying merchant!",
                            variant: "error"
                        });
                    }
                    setActive(false);
                })
                .catch(err => {
                    console.error(err);
                    setActive(false);
                    setSnackbar({
                        isSnackBarOpen: true,
                        message: "Something wrong happened!",
                        variant: "error"
                    });
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
                        Merchant ID
                    </InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type="text"
                        value={password}
                        onChange={handleChange}
                    />
                </FormControl>
                {active ? (
                    <CircularProgress />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Proceed
                    </Button>
                )}
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
                label="Remember ID"
            />
        </div>
    );
}

const mapDispatchToProps = {
    addToken,
    setMerchant,
    setSnackbar
};

const InputAdornments = connect(null, mapDispatchToProps)(Login);

export default InputAdornments;
