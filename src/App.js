import React from "react";
import { connect } from "react-redux";

import { addMerchants } from "./store/actions";

import InputAdornments from "./components/Login";

function MainApp({ token }) {
    // localStorage.removeItem("token");
    return (
        <div className="App">
            {token === null ? <InputAdornments /> : <>Hello World!</>}
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
