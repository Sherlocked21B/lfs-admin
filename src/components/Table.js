import React, { forwardRef } from "react";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import MaterialTable from "material-table";
import { Chip } from "@material-ui/core";
import { connect } from "react-redux";

function TableCard({ visits }) {
    return (
        <MaterialTable
            title="Previous Visits"
            columns={[
                {
                    title: "Timestamp",
                    field: "timestamp",
                    render: rowData => (
                        <Chip label={Date(rowData.timestamp).normalize()} />
                    )
                }
            ]}
            data={
                visits !== null
                    ? visits.timestamp.map(each => {
                          return { timestamp: each };
                      })
                    : []
            }
            actions={null}
            icons={tableIcons}
            options={{
                search: false,
                pageSizeOptions: [2, 5, 10, 20],
                pageSize: 2
            }}
        />
    );
}

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />)
};

const mapStateToProps = state => {
    return {
        visits: state.visits
    };
};
const Table = connect(mapStateToProps, null)(TableCard);
export default Table;
