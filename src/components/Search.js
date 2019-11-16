import React, { useState } from "react";
import { TextField, IconButton, CircularProgress } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { searchCard, getVisit } from "../api/main";
import { connect } from "react-redux";
import { setResult, setVisits } from "../store/actions";

const regex = new RegExp(/\d{6}\w{1}/);

function SearchBar({ token, setResult, setVisits }) {
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const handleChange = e => {
        setValue(e.target.value);
        if (!regex.test(e.target.value) || e.target.value.length > 7) {
            setError(true);
        } else setError(false);
    };
    const [searching, setSearching] = useState(false);

    const search = () => {
        if (!error) {
            setSearching(true);
            searchCard(value)
                .then(data => {
                    if (!data.error) {
                        setResult(data.user);
                        getVisit(data.user._id, token)
                            .then(data => {
                                if (data.result) setVisits(data.result[0]);
                                setSearching(false);
                            })
                            .catch(err => {
                                setSearching(false);
                                console.error(err);
                            });
                    } else {
                        setSearching(false);
                    }
                })
                .catch(err => {
                    setSearching(false);
                    console.error(err);
                });
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
                // height: "80vh"
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
                {searching ? (
                    <CircularProgress />
                ) : (
                    <IconButton style={{ margin: "4px" }} onClick={search}>
                        <SearchIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

const mapDispatchToProps = {
    setResult,
    setVisits
};
const Search = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default Search;
