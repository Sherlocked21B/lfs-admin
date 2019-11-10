import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import PhoneIcon from "@material-ui/icons/Phone";
import DescriptionIcon from "@material-ui/icons/Description";
import LocationOnIcon from "@material-ui/icons/LocationOn";

export default function InputField({ label, onChange, value }) {
    return (
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                {label === "Name" ? (
                    <AccountCircle />
                ) : label === "Email" ? (
                    <MailIcon />
                ) : label === "Contact" ? (
                    <PhoneIcon />
                ) : label === "Address" ? (
                    <HomeIcon />
                ) : label === "Latitude" || label === "Longitude" ? (
                    <LocationOnIcon />
                ) : label === "Category" ? (
                    <CategoryIcon />
                ) : (
                    <DescriptionIcon />
                )}
            </Grid>
            <Grid item>
                <TextField
                    id="input-with-icon-grid"
                    label={label}
                    onChange={onChange}
                    value={value}
                />
            </Grid>
        </Grid>
    );
}
