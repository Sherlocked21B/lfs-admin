import React, { useState } from "react";
import { TextField, IconButton, Paper, Badge, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const regex = new RegExp(/\d{6}\w{1}/);

export default function Search() {
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const handleChange = e => {
        setValue(e.target.value);
        if (!regex.test(e.target.value) || e.target.value.length > 7) {
            setError(true);
        } else setError(false);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Search card ID"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                    value={value}
                    error={error}
                />
                <IconButton style={{ margin: "4px" }}>
                    <SearchIcon />
                </IconButton>
            </div>
            <div>
                <Paper>
                    <h3 style={{ color: "rebeccapurple" }}>Ashish Kafle</h3>
                    <Badge color="primary">012619S</Badge>

                    <div>
                        <h4>Visits</h4>
                        <p>Empty</p>
                    </div>
                    <Button variant="contained" color="primary">
                        Mark Visit
                    </Button>
                </Paper>
            </div>
        </div>
    );
}
