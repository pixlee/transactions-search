import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
}));

export default function TransactionDetail({ transaction } ) {
  const classes = useStyles();
  const { transactionLineItems } = transaction;

  return (
    <Box bgcolor={'lightGrey'} className={classes.root}>
      <Typography>
        Transaction Details
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Item URL</TableCell>
              <TableCell>VPC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionLineItems.map((lineItem) => (
              <TableRow key={lineItem.sku}>
                <TableCell>{lineItem.sku}</TableCell>
                <TableCell>{lineItem.title}</TableCell>
                <TableCell>{lineItem.active}</TableCell>
                <TableCell>{lineItem.item_url}</TableCell>
                <TableCell>{lineItem.virtual_parent_code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
