import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";

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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Chip, Button, CircularProgress } from "@material-ui/core";
import { deleteMerchant } from "../api/main";

import {
  removeMerchant,
  toggleEditDialog,
  setEdit,
  setMessage,
  toggleSnackBar,
  setVariant
} from "../store/actions";
import { connect } from "react-redux";

function MerchantsTable({
  merchants,
  toggleEditDialog,
  setEdit,
  token,
  removeMerchant,
  setMessage,
  toggleSnackBar,
  setVariant
}) {
  const [confirm, setConfirm] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState(null);
  const [isDeleting, setDeleting] = React.useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClose = () => {
    setConfirm(false);
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "mail" },
    {
      title: "Category",
      field: "category",
      render: rowData => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {rowData.category
            .split(";")
            .filter(el => el.length > 0)
            .map((each, index) => (
              <Chip
                key={index}
                label={each}
                color="secondary"
                style={{ marginBottom: "2px" }}
              />
            ))}
        </div>
      )
    },
    { title: "Address", field: "address" },
    {
      title: "Contact",
      field: "contact"
    },
    {
      title: "Location",
      field: "location",
      render: rowData => (
        <>
          {rowData.location === undefined || rowData.location === null ? (
            <p>N/A</p>
          ) : (
            <>
              <span>{rowData.location[0]}</span>
              <br />
              <span>{rowData.location[1]}</span>
            </>
          )}
        </>
      )
    },
    { title: "Description", field: "description" },
    {
      title: "Images",
      field: "url",
      render: rowData => (
        <>
          {rowData.media === undefined || rowData.media === null ? (
            <p>N/A</p>
          ) : (
            rowData.media.src.map((each, index) => (
              <img
                alt={rowData.name}
                src={each}
                key={index}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: "2px solid #333"
                }}
              />
            ))
          )}
        </>
      )
    }
  ];

  const actions = [
    {
      icon: tableIcons.Edit,
      tooltip: "Edit Merchant",
      onClick: (e, rowData) => {
        setEdit(rowData);
        toggleEditDialog(true);
      }
    },
    {
      icon: tableIcons.Delete,
      tooltip: "Delete Merchant",
      onClick: (event, rowData) => {
        setDeleteData(rowData);
        handleClickOpen();
      }
    }
  ];

  return (
    <>
      <MaterialTable
        title="Merchants"
        columns={columns}
        icons={tableIcons}
        data={
          merchants.length > 0
            ? merchants.map(el => {
                return { ...el, key: el._id };
              })
            : merchants
        }
        actions={actions}
      />
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are yo sure you want to delete ${
            deleteData !== null ? deleteData.name : null
          }?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you click Delete all the data related to{" "}
            {deleteData !== null ? <b>{deleteData.name}</b> : "Merchant"} will
            be deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setDeleting(true);
              deleteMerchant({ token, id: deleteData._id }).then(data => {
                if (data.message) {
                  removeMerchant(deleteData._id);
                  handleClose();
                  setMessage(`Deleted ${deleteData.name} successfully!`);
                  setVariant("success");
                  toggleSnackBar(true);
                } else {
                  setMessage(`Failed to delete ${deleteData.name}!`);
                  setVariant("error");
                  toggleSnackBar(true);
                }
                setDeleting(false);
              });
            }}
            color="primary"
            autoFocus
          >
            {isDeleting === false ? "Delete" : <CircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

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
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const mapDispatchToProps = {
  removeMerchant,
  toggleEditDialog,
  setEdit,
  setMessage,
  toggleSnackBar,
  setVariant
};

const mapStateToProps = state => {
  return {
    token: state.merchant.token,
    merchants: state.merchant.merchants
  };
};

const MaterialTableDemo = connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantsTable);

export default MaterialTableDemo;
