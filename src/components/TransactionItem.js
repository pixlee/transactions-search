import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import TransactionDetail from './TransactionDetail';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  }
}));

export default function TransactionItem({ transaction }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <>
      <TableRow 
        className={classes.root}
        hover
        style={{cursor: 'pointer'}}
        onClick={() => setExpanded(prev => !prev)}
      >
        <TableCell padding="none">
          <IconButton size="small">
            {expanded ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        </TableCell>
    <TableCell>{transaction.orderId}</TableCell>
    <TableCell>{transaction.orderDate}</TableCell>
    <TableCell>{transaction.deliveryDate}</TableCell>
    <TableCell>{transaction.transactionSource}</TableCell>
    <TableCell>{transaction.rseLastSentDate}</TableCell>
    <TableCell>{transaction.emailAddress}</TableCell>
      </TableRow>
      {expanded &&
        <TableRow>
          <TableCell colSpan={7}>
            <Collapse in={expanded}>
              <TransactionDetail transaction={transaction} />
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </>
  );
}
