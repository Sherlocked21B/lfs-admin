import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import InputWithIcon from "./Input";

import { createMerchant } from "../api/main";
import {
    toggleAddDialog,
    toggleSnackBar,
    addMerchants
} from "../store/actions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddDialog({
    isAddDialogOpen,
    toggleAddDialog,
    token,
    toggleSnackBar,
    addMerchants
}) {
    const classes = useStyles();
    const handleClose = () => {
        toggleAddDialog(false);
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    });
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");

    const handleSave = () => {
        const data = Object.freeze({
            name: name,
            email: email || "",
            address: address,
            location: [location.latitude, location.longitude],
            category: category,
            // description: description ,
            contact: contact
        });
        createMerchant({ token, body: JSON.stringify(data) }).then(res => {
            if (res.message) {
                if (res.merchant) {
                    addMerchants([{ ...res.merchant, key: res.merchant._id }]);
                }
                toggleSnackBar({
                    open: true,
                    message: "Merchant created successfully!",
                    variant: "success"
                });
                handleClose();
            } else {
                toggleSnackBar({
                    open: true,
                    message: "Error creating merchant!",
                    variant: "error"
                });
            }
        });
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={isAddDialogOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add Merchants
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <InputWithIcon
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        address={address}
                        setAddress={setAddress}
                        location={location}
                        setLocation={setLocation}
                        category={category}
                        setCategory={setCategory}
                        description={description}
                        setDescription={setDescription}
                        contact={contact}
                        setContact={setContact}
                    />
                </List>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = {
    toggleAddDialog,
    toggleSnackBar,
    addMerchants
};

const mapStateToProps = state => {
    return {
        token: state.merchant.token,
        isAddDialogOpen: state.ui.isAddDialogOpen
    };
};

const FullScreenDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDialog);

export default FullScreenDialog;
