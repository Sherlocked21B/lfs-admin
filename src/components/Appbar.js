import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { addToken } from "../store/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

function FAppBar({ addToken }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        LFS cards
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => {
                            addToken(null);
                            localStorage.removeItem("token");
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapDispatchToProps = {
    addToken
};
const ButtonAppBar = connect(null, mapDispatchToProps)(FAppBar);
export default ButtonAppBar;
