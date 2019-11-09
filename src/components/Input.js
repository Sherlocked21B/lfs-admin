import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import InputField from "./Inputfield";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
        display: "flex",
        justifyContent: "space-around",
        width: "100%"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "300px"
    },
    input: {
        marginTop: "10px !important"
    }
}));

export default function InputWithIcon({ edit }) {
    const classes = useStyles();
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    });
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState();
    const [contact, setContact] = useState("");

    const handleSave = () => {
        console.log(
            name,
            email,
            address,
            location,
            category,
            description,
            media,
            contact
        );
    };

    useEffect(() => {
        if (edit !== null) {
            setId(edit._id);
            setName(edit.name);
            setEmail(edit.email);
            setAddress(edit.address);
            setLocation({
                latitude: edit.location[0],
                longitude: edit.location[1]
            });
            setCategory(edit.category);
            setDescription(edit.description);
            setMedia(edit.media);
            setContact(edit.contact);
        }
    }, [edit]);
    return (
        <div className={classes.container}>
            <div className={classes.margin}>
                <div className={classes.inputContainer}>
                    <InputField
                        className={classes.input}
                        label="Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <InputField
                        className={classes.input}
                        label="Category"
                        onChange={e => setCategory(e.target.value)}
                        value={category}
                    />
                    <InputField
                        className={classes.input}
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <InputField
                        className={classes.input}
                        label="Contact"
                        onChange={e => setContact(e.target.value)}
                        value={contact}
                    />
                </div>
                <div className={classes.inputContainer}>
                    <InputField
                        className={classes.input}
                        label="Address"
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                    />
                    <InputField
                        className={classes.input}
                        label="Description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                    <InputField
                        className={classes.input}
                        label="location"
                        onChange={e => setLocation(e.target.value)}
                        value={location.latitude}
                    />
                    {id !== null ? (
                        <>
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={e => {
                                    console.log(e.target.files);
                                    setMedia(e.target.files);
                                    handleSave();
                                }}
                            />
                            <label htmlFor="raised-button-file">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component="span"
                                    className={classes.input}
                                >
                                    Upload Images
                                </Button>
                            </label>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
