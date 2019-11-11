import React, { forwardRef } from "react";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import {
    setMessage,
    toggleSnackBar,
    addCards,
    removeCard
} from "../store/actions";
import { connect } from "react-redux";
import { createCard, deleteCard, updateCard } from "../api/main";

function Cards({ cards, token, addCards, removeCard }) {
    const columns = [
        { title: "Card Id", field: "card" },
        { title: "User", field: "user" },
        {
            title: "Timestamp",
            field: "timestamp",
            editComponent: value => <></>,
            render: rowData => (
                <div>{new Date(rowData.timestamp).toUTCString()}</div>
            )
        }
    ];

    const editable = {
        onRowAdd: newData =>
            new Promise(resolve => {
                createCard(
                    JSON.stringify({
                        card: newData.card,
                        user: newData.user || ""
                    }),
                    token
                ).then(data => {
                    if (data.message) {
                        addCards([data.card]);
                    }
                    resolve();
                });
            }),
        onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
                updateCard(oldData._id, JSON.stringify(newData), token).then(
                    data => {
                        if (!data.error && data.message) {
                            console.log(data);
                            removeCard(oldData._id);
                            addCards([data.card]);
                        }
                        resolve();
                    }
                );
            }),
        onRowDelete: oldData =>
            new Promise(resolve => {
                deleteCard(oldData._id, token).then(data => {
                    if (!data.error && data.message) {
                        removeCard(oldData._id);
                    }
                    resolve();
                });
            })
    };

    return (
        <MaterialTable
            title="LFS cards and users"
            columns={columns}
            data={cards}
            icons={tableIcons}
            editable={editable}
        />
    );
}

const mapDispatchToProps = {
    addCards,
    setMessage,
    toggleSnackBar,
    removeCard
};

const mapStateToProps = state => {
    return {
        token: state.merchant.token,
        cards: state.card.cards
    };
};

const CardsTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
export default CardsTable;
