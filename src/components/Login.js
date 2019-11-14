import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";

import { verifyMerchant } from "../api/main";
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
    const [remember, setRemember] = React.useState(true);

    const handleChange = event => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if (password.length > 10) {
            verifyMerchant(password).then(data => {
                if (!data.error) {
                    console.log(data.result);
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
                        Merchant ID
                    </InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type="text"
                        value={password}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Proceed
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
                label="Remember ID"
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToken: token => dispatch(addToken(token))
    };
};

const InputAdornments = connect(null, mapDispatchToProps)(Login);

export default InputAdornments;
