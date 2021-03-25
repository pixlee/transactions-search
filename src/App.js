import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TransactionFilter from "./components/TransactionFilter";
import TransactionList from "./components/TransactionList";
import Fetch from "./components/Fetch";
import { list, count } from "./api";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  }
}));

const defaultPage = {
  pageNumber: 0,
  pageSize: 20,
  totalElements: 0,
  content: []
};

export default function App() {
  const classes = useStyles();
  const [page, setPage] = React.useState({ pageNumber: 0, pageSize: 20 });
  const [sort, setSort] = React.useState({ order: "asc", orderBy: "orderId" });
  const [filter, setFilter] = React.useState();

  const handleApplyFilter = newFilter => {
    setFilter(newFilter);
  };

  const listAction = {
    action: list,
    params: {
      sort: `${sort.orderBy},${sort.order}`,
      ...page,
      filterOptions: filter,
      siteKey: "Rdhcya1h7lLN3rcsite" // hard coding the site key for now, should come from parent app
    }
  };

  const countAction = {
    action: count,
    params: {
      sort: `${sort.orderBy},${sort.order}`,
      ...page,
      filterOptions: filter,
      siteKey: "Rdhcya1h7lLN3rcsite"
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Fetch actions={countAction}>
          {data => (
            <TransactionFilter
              onApplyFilter={handleApplyFilter}
              resultCounts={data}
            />
          )}
        </Fetch>
        <Fetch actions={listAction}>
          {data => (
            <TransactionList
              page={data.transactions ? data : defaultPage}
              sort={sort}
              onChangePage={newPage => setPage(newPage)}
              onRequestSort={newSort => setSort(newSort)}
            />
          )}
        </Fetch>
      </Paper>
    </div>
  );
}
