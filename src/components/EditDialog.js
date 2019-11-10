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

import { toggleEditDialog } from "../store/actions";
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

function EditMerchantsDialog({
    isEditDialogOpen,
    toggleEditDialog,
    edit,
    token
}) {
    const classes = useStyles();
    const handleClose = () => {
        toggleEditDialog(false);
    };

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

    useEffect(() => {
        if (Object.keys(edit).length > 0 && edit.constructor === Object) {
            console.log(edit);
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
            setMedia(edit.media.src);
            setContact(edit.contact);
        }
    }, [edit]);

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
        console.log(data);
        // createMerchant({ token, body: JSON.stringify(data) }).then(res => {
        //     console.log(res);
        // });
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
                        setMedia={setMedia}
                        id={id}
                    />
                </List>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        toggleEditDialog: status => dispatch(toggleEditDialog(status))
    };
};

const mapStateToProps = state => {
    return {
        token: state.token,
        isEditDialogOpen: state.isEditDialogOpen,
        edit: state.edit
    };
};

const EditDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditMerchantsDialog);

export default EditDialog;
