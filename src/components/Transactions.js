import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const columns = [
  { id: 'date', label: 'DATE', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
  { id: 'details', label: 'DETAILS', minWidth: 100 },
  {
    id: 'amount',
    label: 'AMOUNT',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'balance',
    label: 'BALANCE',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];




 
const Transactions = ({ token }) => {
  const [transactions, setTransactions] = useState([]);
  //
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
//
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div>
      <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
          TRANSACTIONS
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
     <Paper sx={{ width: '100%', overflow: 'hidden',justifyContent: 'center', padding: '16px' }}>
     <TableContainer sx={{ maxHeight: 440 }}>
       <Table stickyHeader aria-label="sticky table">
         <TableHead>
           <TableRow>
             {columns.map((column) => (
               <TableCell
                 key={column.id}
                 align={column.align}
                 style={{ minWidth: column.minWidth }}
               >
                 {column.label}
               </TableCell>
             ))}
           </TableRow>
         </TableHead>
         <TableBody>
           {transactions
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((transaction) => {
               return (
                 <TableRow hover role="checkbox" tabIndex={-1} key={transaction.code}>
                   {columns.map((column) => {
                     const value =transaction[column.id];
                     return (
                       <TableCell key={column.id} align={column.align}>
                         {column.format && typeof value === 'number'
                           ? column.format(value)
                           : value}
                       </TableCell>
                     );
                   })}
                 </TableRow>
               );
             })}
         </TableBody>
       </Table>
     </TableContainer>
     <TablePagination
       rowsPerPageOptions={[10, 25, 100]}
       component="div"
       count={transactions.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
     />
   </Paper>
   </Box>
    </Container>
   </div>
  );
};

export default Transactions;



