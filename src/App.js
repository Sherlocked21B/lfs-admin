import React, { useState, useEffect } from "react";
import FullScreenDialog from "./components/Dialog";
import ElevateAppBar from "./components/Appbar";
import MaterialTableDemo from "./components/Table";
import { fetchMerchants } from "./api/main";
import { addToken, addMerchants, addMaxCount, setPage } from "./store/actions";
import { connect } from "react-redux";
import InputAdornments from "./components/Login";

function MainApp({
    token,
    addToken,
    maxCount,
    addMerchants,
    addMaxCount,
    merchants,
    page,
    setPage
}) {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    useEffect(() => {
        fetchMerchants(page)
            .then(data => {
                if (!data.error && data.result && merchants.length === 0) {
                    addMerchants(data.result);
                    addMaxCount(data.count);
                }
            })
            .catch(err => console.log(err));
    });

    useEffect(() => {
        if (maxCount !== null) {
            if (maxCount - page * 15 > 0) {
                console.log("updating");
                fetchMerchants(page + 1)
                    .then(data => {
                        if (!data.error && data.result) {
                            addMerchants(data.result);
                            setPage(page + 1);
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [page, maxCount, addMerchants, setPage]);

    return (
        <div className="App">
            {token === null ? (
                <InputAdornments />
            ) : (
                <>
                    <ElevateAppBar setOpen={setOpen} addToken={addToken} />
                    <FullScreenDialog
                        open={open}
                        setOpen={setOpen}
                        edit={edit}
                        setEdit={setEdit}
                    />
                    <MaterialTableDemo
                        merchants={merchants}
                        setOpen={setOpen}
                        setEdit={setEdit}
                    />
                </>
            )}
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToken: token => dispatch(addToken(token)),
        addMerchants: merchants => dispatch(addMerchants(merchants)),
        addMaxCount: maxCount => dispatch(addMaxCount(maxCount)),
        setPage: page => dispatch(setPage(page))
    };
};

const mapStateToProps = state => {
    return {
        token: state.token,
        merchants: state.merchants,
        maxCount: state.maxCount,
        page: state.page
    };
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainApp);

export default App;
