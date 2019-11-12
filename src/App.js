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
    if (maxCountCards !== null && token !== null) {
      if (maxCountCards - cardPage * 15 > 0) {
        getCards(page + 1, token).then(data => {
          if (data.result && !data.error) {
            addCards(data.result);
            setCardPage(page + 1);
          }
        });
      }
    }
  }, [
    page,
    maxCount,
    addMerchants,
    setPage,
    maxCountCards,
    cardPage,
    addCards,
    setCardPage,
    token
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
