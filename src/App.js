import React, { useEffect } from "react";
import { connect } from "react-redux";
import InputAdornments from "./components/Login";
import Search from "./components/Search";
import Result from "./components/Result";
import ButtonAppBar from "./components/Appbar";
import { verifyMerchant } from "./api/main";
import { setMerchant } from "./store/actions";
import { Chip } from "@material-ui/core";
import CustomizedSnackbars from "./components/Snackbar";

function MainApp({ token, result, merchant, setMerchant }) {
    useEffect(() => {
        if (merchant === null) {
            verifyMerchant(token).then(data => {
                if (!data.error) {
                    setMerchant(data.result);
                }
            });
        }
    }, [token]);

    return (
        <div className="App">
            {token === null ? (
                <InputAdornments />
            ) : (
                <>
                    <ButtonAppBar />
                    {merchant ? <Chip label={merchant.name} style={{margin: "10px"}}/> : null}
                    <Search />
                    {result ? <Result /> : null}
                </>
            )}
            <CustomizedSnackbars />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token,
        result: state.result,
        merchant: state.merchant
    };
};

const mapDispatchToprops = {
    setMerchant
};
const App = connect(mapStateToProps, mapDispatchToprops)(MainApp);

export default App;
