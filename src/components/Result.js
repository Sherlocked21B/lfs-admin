import React from "react";
import { Paper, Typography, Chip } from "@material-ui/core";
import { connect } from "react-redux";

import Table from "./Table";
import VisitActions from "./VisitActions";
import "./styles.css";

function ResultCard({ result }) {
    return (
        <div className="card__user">
            <Paper className="paper__user">
                <Typography variant="h6" component="h3" className="rebecca">
                    {result.name}
                </Typography>
                <div className="info__row">
                    <Chip label={result.card_id} />
                    <VisitActions />
                </div>
                <div>
                    <Table />
                </div>
            </Paper>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        result: state.result
    };
};
const Result = connect(mapStateToProps, null)(ResultCard);
export default Result;
