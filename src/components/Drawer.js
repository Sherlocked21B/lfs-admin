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

export default function TemporaryDrawer({ setOpen, addToken }) {
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

    const addCards = () => event => {
        console.log(event, "Add Cards");
        toggleDrawer(false, { type: "Pass" });
    };

    const addMerchants = () => event => {
        setOpen(true);
        console.log(event, "Add Merchants");
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
                            key="Add Cards"
                            onClick={addCards()}
                            onKeyDown={addCards()}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Cards" />
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
