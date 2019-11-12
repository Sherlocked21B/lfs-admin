import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { addToken, toggleAddDialog } from "../store/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

function AppDrawer({ toggleAddDialog, addToken }) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open, event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const addMerchants = () => event => {
        toggleAddDialog(true);
        toggleDrawer(false, { type: "Pass" });
    };

    const logout = () => event => {
        localStorage.removeItem("token");
        addToken(null);
        toggleDrawer(false, { type: "Pass" });
    };

    return (
        <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={e => {
                    toggleDrawer(true, e);
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={state}
                onClose={e => {
                    toggleDrawer(false, e);
                }}
            >
                <div className={classes.list} role="presentation">
                    <List>
                        <ListItem
                            button
                            key="Add Merchants"
                            onClick={addMerchants()}
                            onKeyDown={addMerchants()}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Merchants" />
                        </ListItem>
                        <ListItem
                            button
                            key="Logout"
                            onClick={logout()}
                            onKeyDown={logout()}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToken: token => dispatch(addToken(token)),
        toggleAddDialog: status => dispatch(toggleAddDialog(status))
    };
};

const TemporaryDrawer = connect(
    null,
    mapDispatchToProps
)(AppDrawer);

export default TemporaryDrawer;
