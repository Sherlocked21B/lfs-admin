import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function InputField({ label, onChange, value }) {
    return (
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
                <AccountCircle />
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
