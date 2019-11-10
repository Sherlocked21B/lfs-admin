import React from "react";
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
        alignItems: "flex-start",
        minHeight: "300px"
    },
    input: {
        marginTop: "10px !important"
    }
}));

export default function InputWithIcon({
    name,
    setName,
    category,
    setCategory,
    email,
    setEmail,
    contact,
    setContact,
    address,
    setAddress,
    description,
    setDescription,
    id,
    location,
    setLocation,
    setMedia
}) {
    const classes = useStyles();

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
                    <div style={{ display: "flex" }}>
                        <InputField
                            className={classes.input}
                            label="Latitude"
                            onChange={e =>
                                setLocation({
                                    ...location,
                                    latitude: e.target.value
                                })
                            }
                            value={location.latitude}
                        />
                        <InputField
                            className={classes.input}
                            label="Longitude"
                            onChange={e =>
                                setLocation({
                                    ...location,
                                    longitude: e.target.value
                                })
                            }
                            value={location.longitude}
                        />
                    </div>

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
