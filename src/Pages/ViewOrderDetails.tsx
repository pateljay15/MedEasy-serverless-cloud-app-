import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the types for the order details
interface Medicine {
  medicineName: string;
  medicinePower: string;
  userWant: number;
  gotQuantity: number;
  totalPrice: number;
  sellerName: string;
  sellerEmail: string;
}

interface OrderDetails {
  orderDate: string;
  fileName: string;
  orderStatus: string;
  updatedAt: string;
  medicinePurchased: Medicine[];
  prescriptionUrl: string;
  orderTotal: number;
  customerEmail: string;
  OrderId: string;
}

function ViewOrderDetails() {
  // State variables for form input and order details
  const [orderId, setOrderId] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch order details from the backend
  const fetchOrderDetails = async () => {
    if (!orderId) {
      toast.error('Please enter a valid Order ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://w5hpy8syqa.execute-api.us-east-1.amazonaws.com/fetch-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Order not found');
      }

      const data: OrderDetails = await response.json();
      setOrderDetails(data);

      toast.success('Order details fetched successfully!');
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to fetch order details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the background color based on order status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'yellow';
      case 'Partially Accepted':
        return 'lightcoral';
      case 'Shipped':
        return 'lightblue';
      case 'Delivered':
        return 'lightgreen';
      default:
        return 'white';
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center" gutterBottom>
          View Order Details
        </Typography>
        <TextField
          fullWidth
          label="Order ID"
          variant="outlined"
          margin="normal"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={fetchOrderDetails}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Fetch Order Details'}
        </Button>
      </Box>

      {orderDetails && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Order Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Order ID:</strong> {orderDetails.OrderId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Order Date:</strong> {new Date(orderDetails.orderDate).toLocaleString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Customer Email:</strong> {orderDetails.customerEmail}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ backgroundColor: getStatusColor(orderDetails.orderStatus), padding: '5px' }}
            >
              <strong>Order Status:</strong> {orderDetails.orderStatus}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Updated At:</strong> {new Date(orderDetails.updatedAt).toLocaleString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Order Total:</strong> ${orderDetails.orderTotal}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Prescription:</strong>{' '}
              <a href={orderDetails.prescriptionUrl} target="_blank" rel="noopener noreferrer">
                {orderDetails.fileName}
              </a>
            </Typography>

            <Typography variant="h6" gutterBottom>
              Medicines Purchased
            </Typography>
            <Grid container spacing={2}>
              {orderDetails.medicinePurchased.map((medicine, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="body1">
                        <strong>Medicine Name:</strong> {medicine.medicineName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Power:</strong> {medicine.medicinePower}mg
                      </Typography>
                      <Typography variant="body1">
                        <strong>Quantity Wanted:</strong> {medicine.userWant}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Quantity Got:</strong> {medicine.gotQuantity}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Total Price:</strong> ${medicine.totalPrice}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Seller Name:</strong> {medicine.sellerName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Seller Email:</strong> {medicine.sellerEmail}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      <ToastContainer />
    </Container>
  );
}

export default ViewOrderDetails;
