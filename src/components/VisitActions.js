import React, { useState } from "react";
import { CircularProgress, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { createVisit, updateVisit } from "../api/main";
import { setVisits, setSnackbar } from "../store/actions";

function Visit({ visits, result, token, setVisits, setSnackbar }) {
    const [isActive, setIsActive] = useState(false);
    const createFirstVisit = () => {
        setIsActive(true);
        createVisit(
            JSON.stringify({
                user: result._id,
                merchant: token,
                timestamp: Date.now()
            })
        )
            .then(data => {
                if (data.message && !data.error) {
                    setVisits(data.visit.timestamp);
                    setSnackbar({
                        isSnackBarOpen: true,
                        message: "Visit Created!",
                        variant: "success"
                    });
                } else {
                    setSnackbar({
                        isSnackBarOpen: true,
                        message: "Failed creating visit!",
                        variant: "error"
                    });
                }
                setIsActive(false);
            })
            .catch(err => {
                setSnackbar({
                    isSnackBarOpen: true,
                    message: "Something wrong happened!",
                    variant: "error"
                });
                setIsActive(false);
                console.log(err);
            });
    };

    const markVisit = () => {
        setIsActive(true);
        updateVisit(
            JSON.stringify({
                user: result._id,
                merchant: token,
                timestamp: Date.now()
            })
        )
            .then(data => {
                if (data.message && !data.error) {
                    setVisits(data.visit.timestamp);
                    setSnackbar({
                        isSnackBarOpen: true,
                        message: "Visit Marked!",
                        variant: "info"
                    });
                } else {
                    setSnackbar({
                        isSnackBarOpen: true,
                        message: "Error marking visit!",
                        variant: "error"
                    });
                }
                setIsActive(false);
            })
            .catch(err => {
                setIsActive(false);
                setSnackbar({
                    isSnackBarOpen: true,
                    message: "Something wrong happened!",
                    variant: "success"
                });
                console.log(err);
            });
    };
    return visits !== null ? (
        visits.length === 0 ? (
            isActive ? (
                <CircularProgress />
            ) : (
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={createFirstVisit}
                >
                    Create Visit
                </Button>
            )
        ) : isActive ? (
            <CircularProgress />
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

const mapDispatchToProps = {
    setVisits,
    setSnackbar
};

const mapStateToProps = state => {
    return {
        result: state.result,
        visits: state.visits,
        token: state.token
    };
};
const VisitActions = connect(mapStateToProps, mapDispatchToProps)(Visit);
export default VisitActions;
