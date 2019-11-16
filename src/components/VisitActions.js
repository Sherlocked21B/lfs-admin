import React from "react";
import { CircularProgress, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { createVisit, updateVisit } from "../api/main";

function Visit({ visits, result, token }) {
    const createFirstVisit = () => {
        createVisit(
            JSON.stringify({
                user: result._id,
                merchant: token,
                timestamp: Date.now()
            })
        )
            .then(data => {
                if (data.message && !data.error)
                    console.log(data.visit.timestamp);
            })
            .catch(err => console.log(err));
    };

    const markVisit = () => {
        updateVisit(
            JSON.stringify({
                user: result._id,
                merchant: token,
                timestamp: Date.now()
            })
        )
            .then(data => {
                if (data.message && !data.error) {
                    console.log(data.visit.timestamp);
                }
            })
            .catch(err => console.log(err));
    };
    return visits !== null ? (
        visits.length === 0 ? (
            <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={createFirstVisit}
            >
                Create Visit
            </Button>
        ) : (
            <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={markVisit}
            >
                Mark Visit
            </Button>
        )
    ) : (
        <CircularProgress color="secondary" />
    );
}

const mapStateToProps = state => {
    return {
        result: state.result,
        visits: state.visits,
        token: state.token
    };
};
const VisitActions = connect(mapStateToProps, null)(Visit);
export default VisitActions;
