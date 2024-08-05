import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateOrderStatus() {
  // State variables for form fields
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Processing');

  // Handle order status update
  const handleUpdateOrderStatus = async () => {
    // Prepare the request body
    const requestBody = {
      source: 'myapplication.orders',
      detailType: 'OrderStatusUpdate',
      detail: {
        OrderId: orderId,
        status: status,
        customerEmail: email,
        subject: `Your order has been ${status.toLowerCase()}`,
        message: `Dear Customer Update regarding Order ID ${orderId}, your order has been ${status.toLowerCase()} and is on its way!`,
      },
    };

    try {
      // Send request to the backend
      const response = await fetch('https://fzqdr3wfgl.execute-api.us-east-1.amazonaws.com/send-order-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Show success message
      toast.success('Order status updated successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Clear form fields
      setOrderId('');
      setEmail('');
      setStatus('Processing');
    } catch (error) {
      // Show error message
      console.error('Error:', error);
      toast.error('Failed to update order status. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Update Order Status
        </Typography>
        <TextField
          fullWidth
          label="Order ID"
          variant="outlined"
          margin="normal"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <TextField
          fullWidth
          label="Customer Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="status-label">Order Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            label="Order Status"
          >
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleUpdateOrderStatus}
          disabled={!orderId || !email} // Disable button if required fields are empty
        >
          Update Order Status
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default UpdateOrderStatus;
