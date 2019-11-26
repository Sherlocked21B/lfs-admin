import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
    addMerchants,
    addMaxCount,
    setPage,
    addCards,
    setCardPage,
    addCardMaxCount
} from "./store/actions";
import { fetchMerchants, getCards } from "./api/main";

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
    cards,
    page,
    setPage,
    cardPage,
    setCardPage,
    addCards,
    maxCountCards,
    addCardMaxCount,
    variant
}) {
    useEffect(() => {
        if (maxCount === null)
            fetchMerchants(page)
                .then(data => {
                    if (!data.error && data.result && merchants.length === 0) {
                        addMerchants(data.result);
                        addMaxCount(data.count);
                    }
                })
                .catch(err => console.log(err));
        if (maxCountCards === null && token !== null) {
            getCards(cardPage, token)
                .then(data => {
                    if (!data.error && data.result) {
                        addCards(data.result);
                        addCardMaxCount(data.count);
                    }
                })
                .catch(err => console.log(err));
        }
    });

    useEffect(() => {
        async function getApiData() {
            if (maxCount !== null) {
                if (maxCount > merchants.length) {
                    // console.log("updating", maxCount);
                    try {
                        const merchantsApi = await fetchMerchants(page + 1);
                        if (!merchantsApi.error && merchantsApi.result) {
                            addMerchants(merchantsApi.result);
                            setPage(page + 1);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            if (maxCountCards !== null && token !== null) {
                if (maxCountCards > cards.length) {
                    // console.log("updating", maxCountCards, cardPage);
                    try {
                        const cardsApi = await getCards(cardPage + 1, token);
                        if (cardsApi.result && cardsApi.result.length > 0) {
                            addCards(cardsApi.result);
                            setCardPage(cardPage + 1);
                        }
                    } catch (e) {
                        console.log("error", e);
                    }
                }
            }
        }
        getApiData();
    }, [
        page,
        maxCount,
        addMerchants,
        setPage,
        maxCountCards,
        cardPage,
        addCards,
        setCardPage,
        token,
        merchants,
        cards
    ]);

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
                    <CustomizedSnackbars type={variant} />
                    <CardsTable />
                </>
            )}
        </div>
    );
}

const mapDispatchToProps = {
    addMerchants,
    setPage,
    addCards,
    setCardPage,
    addCardMaxCount,
    addMaxCount
};

const mapStateToProps = state => {
    return {
        token: state.merchant.token,
        merchants: state.merchant.merchants,
        maxCount: state.merchant.maxCount,
        page: state.merchant.page,
        cardPage: state.card.page,
        cards: state.card.cards,
        maxCountCards: state.card.maxCount,
        variant: state.ui.variant
    };
};

const App = connect(mapStateToProps, mapDispatchToProps)(MainApp);

export default App;
