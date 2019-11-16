import React from "react";
import { connect } from "react-redux";
import InputAdornments from "./components/Login";
import Search from "./components/Search";
import Result from "./components/Result";
import ButtonAppBar from "./components/Appbar";

function MainApp({ token, result }) {
    return (
        <div className="App">
            {token === null ? (
                <InputAdornments />
            ) : (
                <>
                <ButtonAppBar/>
                    <Search />
                    {result ? <Result /> : null}
                </>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token,
        result: state.result
    };
};
const App = connect(mapStateToProps, null)(MainApp);

export default App;
