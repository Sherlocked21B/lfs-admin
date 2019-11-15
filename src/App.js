import React from "react";
import { connect } from "react-redux";
import { addMerchants } from "./store/actions";
import InputAdornments from "./components/Login";
import Search from "./components/Search";

function MainApp({ token }) {
    return (
        <div className="App">
            {token === null ? <InputAdornments /> : <Search />}
        </div>
    );
}

const mapDispatchToProps = {
    addMerchants
};

const mapStateToProps = state => {
    return {
        token: state.merchant.token
    };
};

const App = connect(mapStateToProps, mapDispatchToProps)(MainApp);

export default App;
