import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function niceNum(n) {
    if ("number" == typeof(n)) {
        return n.toLocaleString('en');
    } else {
        return "an unknown number of";
    }
}

export default function KeyFigures({ resultCounts }) {
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
      minWidth: 500,
      maxWidth: `calc(50% - ${theme.spacing(2)}px)`
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
  },
    ul: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
    listStyleType: "disc"
}
}));


  const classes = useStyles();

    return <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Key Figures
              </Typography>
              <p>
                {niceNum(resultCounts.transactionCount)} transactions found, involving{" "}
                {niceNum(resultCounts.transactionsItemCount)} items.{" "}
                {niceNum(resultCounts.emailsSent)} emails resulted in{" "}
                {niceNum(resultCounts.transactionsWithReviews)} reviews.
              </p>
              <p>
                Of these {niceNum(resultCounts.transactionCount)} transactions:
                <ul className={classes.ul}>
                  <li>{niceNum(resultCounts.transactionsWithComments)} had comments</li>
                  <li>
                    {niceNum(resultCounts.transactionsWithDeliveryDates)} had delivery
                    dates
                  </li>
                  <li>
                    {niceNum(resultCounts.transactionsWithOptedOutUsers)} involved
                    opted-out users
                  </li>
                </ul>
              </p>
            </CardContent>
            </Card>;
}
