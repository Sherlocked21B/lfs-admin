import React, { useState, useEffect } from "react";
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

import { toggleEditDialog, toggleSnackBar } from "../store/actions";
import { connect } from "react-redux";
import {
    addPhotos,
    updatePhotos,
    deletePhotos,
    updateMerchants
} from "../api/main";
import { CircularProgress } from "@material-ui/core";

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

function EditMerchantsDialog({
    isEditDialogOpen,
    toggleEditDialog,
    edit,
    token,
    toggleSnackBar
}) {
    const classes = useStyles();
    const handleClose = () => {
        toggleEditDialog(false);
    };
    const [isActive, setIsActive] = useState(false);

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState(null);
    const [contact, setContact] = useState("");
    const [upload, setUpload] = useState([]);

    useEffect(() => {
        if (Object.keys(edit).length > 0 && edit.constructor === Object) {
            setId(edit._id);
            setName(edit.name);
            setEmail(edit.email);
            setAddress(edit.address);
            setLocation({
                latitude: edit.location[0] || "N/A",
                longitude: edit.location[1] || "N/A"
            });
            setCategory(edit.category);
            setDescription(edit.description);
            setMedia(edit.media !== undefined ? edit.media : {});
            setContact(edit.contact);
        }
    }, [edit]);

    useEffect(() => {
        if (upload.length > 0) {
            if (Object.keys(media).length === 0) {
                console.log(upload);
                const form = new FormData();
                for (let i = 0; i < upload.length; i++) {
                    form.append("avatar", upload[i]);
                }
                addPhotos({ id, token, body: form }).then(data => {
                    if (data.media && data.media.src.length > 0) {
                        setMedia(data.media);
                        toggleSnackBar({
                            open: true,
                            message: `Images uploaded successfully! Count: ${upload.length}`,
                            variant: "info"
                        });
                    } else {
                        toggleSnackBar({
                            open: true,
                            message: `Failed uploading ${upload.length} images!`,
                            variant: "error"
                        });
                    }
                    setUpload([]);
                });
            } else if (Object.keys(media).length > 0) {
                const form = new FormData();
                for (let i = 0; i < upload.length; i++) {
                    form.append("avatar", upload[i]);
                }
                updatePhotos({ id, token, body: form }).then(data => {
                    console.log(data);
                    if (data.media) {
                        console.log(data.media);
                        setMedia(data.media);
                        toggleSnackBar({
                            open: true,
                            message: `Images uploaded successfully!`,
                            variant: "info"
                        });
                    } else {
                        toggleSnackBar({
                            open: true,
                            message: `Failed uploading ${upload.length} images!`,
                            variant: "error"
                        });
                    }
                    setUpload([]);
                });
            }
        }
    }, [upload]);

    const handleSave = () => {
        setIsActive(true);
        const data = Object.freeze({
            name: name,
            email: email || "",
            address: address,
            location: [location.latitude, location.longitude],
            category: category,
            // description: description ,
            contact: contact
        });
        console.log(data);
        updateMerchants({ id, token, body: JSON.stringify(data) })
            .then(res => {
                console.log(res);
                setIsActive(false);
                toggleSnackBar({
                    open: true,
                    variant: "success",
                    message: "Merchant updated successfully!"
                });
            })
            .catch(err => {
                toggleSnackBar({
                    open: true,
                    variant: "error",
                    message: "Failed updating merchant!"
                });
                console.error(err);
                setIsActive(false);
            });
    };

    const handleDeleteImage = name => {
        deletePhotos({
            id,
            token,
            name
        }).then(res => console.log(res));
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={isEditDialogOpen}
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
                            {edit.name}
                        </Typography>
                        {isActive ? (
                            <CircularProgress color="secondary" />
                        ) : (
                            <Button
                                autoFocus
                                color="inherit"
                                onClick={handleSave}
                            >
                                save
                            </Button>
                        )}
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
                        setMedia={setUpload}
                        id={id}
                        media={media}
                        handleDeleteImage={handleDeleteImage}
                    />
                </List>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = {
    toggleEditDialog,
    toggleSnackBar
};

const mapStateToProps = state => {
    return {
        token: state.merchant.token,
        isEditDialogOpen: state.ui.isEditDialogOpen,
        edit: state.merchant.edit
    };
};

const EditDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditMerchantsDialog);

export default EditDialog;
