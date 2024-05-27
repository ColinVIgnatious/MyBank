import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Box from '@mui/material/Box';

const DepositWithdraw = ({ token }) => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  const handleTransaction = async (type) => {
    const newAmount = parseFloat(amount);
    let newBalance = balance;

    if (type === 'deposit') {
      newBalance = balance + newAmount;
    } else if (type === 'withdraw') {
      newBalance = balance - newAmount;
    }

    setBalance(newBalance);

    try {
      await axios.post(`/api/transactions/${type}`, { amount: newAmount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Transaction successful');
    } catch (error) {
      console.error('Transaction error', error);
      
      if (type === 'deposit') {
        setBalance(balance);
      } else if (type === 'withdraw') {
        setBalance(balance);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center', 
      }}
    >
      <div>
        <h2>Balance: ₹{balance.toFixed(2)}</h2>
        <form>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
          </label>
          <div>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  handleTransaction('deposit');
                }}
              >
                ADD MONEY
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowCircleDownIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  handleTransaction('withdraw');
                }}
              >
                WITHDRAW MONEY
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default DepositWithdraw;
