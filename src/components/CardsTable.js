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
    removeMerchant,
    toggleEditDialog,
    setEdit,
    setMessage,
    toggleSnackBar
} from "../store/actions";
import { connect } from "react-redux";

function Cards() {
    const columns = [
        { title: "Card Id", field: "card_id" },
        { title: "Name", field: "name" }
    ];
    const [data, setData] = React.useState([
        {
            name: "Mehmet",
            card_id: "011111"
        },
        {
            name: "Zerya Betül",
            card_id: "0111111"
        }
    ]);

    const editable = {
        onRowAdd: newData =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                    setData([...data, newData]);
                }, 600);
            }),
        onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 600);
            }),
        onRowDelete: oldData =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 600);
            })
    };

    return (
        <MaterialTable
            title="LFS cards and users"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={editable}
        />
    );
}

const mapDispatchToProps = dispatch => {
    return {
        removeMerchant: id => dispatch(removeMerchant(id)),
        toggleEditDialog: status => dispatch(toggleEditDialog(status)),
        setEdit: edit => dispatch(setEdit(edit)),
        setMessage: value => dispatch(setMessage(value)),
        toggleSnackBar: value => dispatch(toggleSnackBar(value))
    };
};

const mapStateToProps = state => {
    return {
        token: state.token,
        merchants: state.merchants
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
