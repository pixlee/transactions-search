import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import KeyFigures from "./KeyFigures";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  title: {
    flex: "1 1 100%"
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    minWidth: 500
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginRight: "1rem"
  },

  dateFilter: {
    marginTop: "1rem"
  }
}));

export default function TransactionFilter({
  onApplyFilter,
  onFilterChange,
  resultCounts
}) {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [filter, setFilter] = React.useState({}); // Internal form state, updated live when editing

  const handleSubmit = event => {
    event.preventDefault();
    onApplyFilter(filter); // "Parent" filter state; changing this results in an API request.
  };

  const updateFilter = event => {
    setFilter({ ...filter, [event.target.id]: event.target.value });
  };

  const checkboxUpdateFilter = event => {
    setFilter({ ...filter, [event.target.id]: event.target.checked });
  };

  return (
    <>
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Transactions
        </Typography>
        <Tooltip title="Filter list">
          <IconButton
            aria-label="filter list"
            onClick={() => setVisible(prev => !prev)}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in="false">
        <Grid container direction="row" alignItems="top">
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Filter Options
              </Typography>
              <form id="transSearch" onSubmit={handleSubmit}>
                <p>
                  <TextField
                    id="orderId"
                    label="External Order Id"
                    onChange={updateFilter}
                  />
                </p>
                <p>
                  <TextField
                    id="emailAddress"
                    label="User Email Address"
                    onChange={updateFilter}
                  />
                </p>
                <p>
                  <TextField
                    id="productSku"
                    label="Product SKU"
                    onChange={updateFilter}
                  />
                </p>

                <div className={classes.dateFilter}>
                  <p>
                    <TextField
                      id="orderDateStart"
                      label="Order Date From"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      onChange={updateFilter}
                    />
                    <TextField
                      id="orderDateEnd"
                      label="Order Date To"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      onChange={updateFilter}
                    />
                  </p>

                  <p>
                    <TextField
                      id="deliveryDateStart"
                      label="Delivery Date From"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      onChange={updateFilter}
                    />
                    <TextField
                      id="deliveryDateEnd"
                      label="Delivery Date To"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      onChange={updateFilter}
                    />
                  </p>

                  <p>
                    <TextField
                      id="rseSendDateStart"
                      label="RSE Sent Date From"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      onChange={updateFilter}
                    />
                    <TextField
                      id="rseSendDateEnd"
                      label="RSE Sent Date To"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      onChange={updateFilter}
                    />
                  </p>
                  <p>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="rseWindow"
                          onChange={checkboxUpdateFilter}
                        />
                      }
                      label="Review Email Window"
                    />
                  </p>
                </div>
                <CardActions className={classes.cardActions}>
                  <Button
                    form="transSearch"
                    type="submit"
                    size="small"
                    color="primary"
                  >
                    Apply
                  </Button>
                  <Button size="small">Clear</Button>
                </CardActions>
              </form>
            </CardContent>
          </Card>
          <KeyFigures resultCounts={resultCounts} />
        </Grid>
      </Collapse>
    </>
  );
}
