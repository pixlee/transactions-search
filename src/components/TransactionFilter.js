import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 500,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginRight: "1rem"
  },

  dateFilter: {
    marginTop: "1rem"
  }
}));

export default function TransactionFilter({onApplyFilter, resultCounts}) {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);


  const handleSubmit = (event) => {
        event.preventDefault();
        var formElements = event.target.elements
        var filterOptions=[]
        Array.prototype.forEach.call(formElements, (element) => {
            filterOptions[element.id] = element.value
        })

        onApplyFilter(filterOptions);
  }

  return (
    <>
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Transactions
        </Typography>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={() => setVisible(prev => !prev)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Collapse in="false">
        <Grid container direction="column" alignItems="center">
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Filter Options
              </Typography>
              <form id="transSearch" onSubmit={handleSubmit}>
                <p><TextField id="orderId" label="External Order Id" /></p>
              <p><TextField id="emailAddress" label="User Email Address" /></p>
              <p><TextField id="productSku" label="Product SKU" /></p>

              <div className={classes.dateFilter}>
              <p><TextField id="orderDateStart" label="Order Date From"
                type="date" className={classes.textField} InputLabelProps={{ shrink: true }} />
                <TextField id="orderDateEnd" label="Order Date To" type="date"
                className={classes.textField} InputLabelProps={{ shrink: true }} />
              </p>

              <p><TextField id="deliveryDateStart" label="Delivery Date From" type="date"
              className={classes.textField} InputLabelProps={{ shrink: true, }} />
              <TextField id="deliveryDateEnd" label="Delivery Date To" type="date"
              className={classes.textField} InputLabelProps={{ shrink: true }} />
            </p>

            <p><TextField id="rseSendDateStart" label="RSE Sent Date From" type="date"
            className={classes.textField} InputLabelProps={{ shrink: true }} />
            <TextField id="rseSendDateEnd" label="RSE Sent Date To" type="date"
            className={classes.textField} InputLabelProps={{ shrink: true }} /></p>
      </div>
                <CardActions className={classes.cardActions}>
                <Button form="transSearch" type="submit" size="small" color="primary">
                  Apply
                </Button>
                <Button size="small">
                  Clear
                </Button>
              </CardActions>
              </form>
            </CardContent>

          </Card>

          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Key Figures
              </Typography>
              <p>{resultCounts.transactionCount} transactions found, involving {resultCounts.transactionsItemCount} items. {resultCounts.emailsSent} emails resulted in {resultCounts.transactionsWithReviews} reviews.</p>
              <p>Of these {resultCounts.transactionCount} transactions:
              <ul>
                <li>{resultCounts.transactionsWithComments} had comments</li>
                <li>{resultCounts.transactionsWithDeliveryDates} had delivery dates</li>
                <li>{resultCounts.transactionsWithOptedOutUsers} involved opted-out users</li>
              </ul>
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Collapse>
    </>
  );
};
