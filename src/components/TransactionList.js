import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TransactionItem from './TransactionItem';

const headCells = [
  { id: 'orderId', numeric: false, disablePadding: false, label: 'Order Id' },
  { id: 'orderDate', numeric: false, disablePadding: false, label: 'Date Placed' },
  { id: 'deliveryDate', numeric: false, disablePadding: false, label: 'Delivery Date' },
  { id: 'transactionSource', numeric: false, disablePadding: false, label: 'Feed Source' },
  { id: 'rseLastSentDate', numeric: false, disablePadding: false, label: 'Last RSE' },
  { id: 'emailAddress', numeric: false, disablePadding: false, label: 'Customer' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function TransactionList({ page, sort, onChangePage, onRequestSort }) {
  const classes = useStyles();
  
  const handleRequestSort = (event, property) => {
    const isAsc = sort.orderBy === property && sort.order === 'asc';
    onRequestSort({ orderBy: property, order: isAsc ? 'desc' : 'asc' })
  };

  const handleChangePage = (event, newPage) => {
    onChangePage({ pageNumber: newPage, pageSize: page.pageSize });
  };

  const handleChangeRowsPerPage = event => {
    const rowsPerPage = parseInt(event.target.value, 20);
    onChangePage({ pageNumber: page.pageNumber, pageSize: rowsPerPage });
  };

  const emptyRows = page.pageSize - Math.min(page.pageSize, page.totalElements - page.pageNumber * page.pageSize);

  return (
    <>
      <TableContainer className={classes.paper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="transactions table"
        >
          <EnhancedTableHead
            classes={classes}
            order={sort.order}
            orderBy={sort.orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {page.transactions.map((transaction) => (
              <TransactionItem key={transaction.orderId} transaction={transaction} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 25]}
        component="div"
        count={page.totalElements}
        rowsPerPage={page.pageSize}
        page={page.pageNumber}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

TransactionList.propTypes = {
  page: PropTypes.shape({
    pageNumber: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.object).isRequired
  }),
  sort: PropTypes.shape({
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
  }),
  onChangePage: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired
};
