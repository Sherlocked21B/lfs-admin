import React, { useEffect } from "react";
import { connect } from "react-redux";

import { addMerchants, addMaxCount, setPage } from "./store/actions";
import { fetchMerchants } from "./api/main";

import FullScreenDialog from "./components/Dialog";
import ElevateAppBar from "./components/Appbar";
import MaterialTableDemo from "./components/Table";
import InputAdornments from "./components/Login";
import EditDialog from "./components/EditDialog";
import CustomizedSnackbars from "./components/Snackbar";
import CardsTable from "./components/CardsTable";

function MainApp({
    token,
    maxCount,
    addMerchants,
    addMaxCount,
    merchants,
    page,
    setPage
}) {
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
                    <ElevateAppBar />
                    <FullScreenDialog />
                    <MaterialTableDemo />
                    <EditDialog />
                    <CustomizedSnackbars type="success" />
                    <CardsTable />
                </>
            )}
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
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
