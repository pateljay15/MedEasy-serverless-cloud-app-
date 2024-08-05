// src/pages/MedicineOrder.tsx

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const MedicineOrder: React.FC = () => {
  const [email, setEmail] = useState('');
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>(uuidv4());
  const [loading, setLoading] = useState<boolean>(false);

  const handleOrder = async () => {
    // Prepare the order request JSON
    const requestJSON = {
      fileName: imageName,
      customerEmail: email,
      orderid: orderId,
      image: imageBase64,
    };

    // Convert the object to a JSON string and wrap it in another JSON with "body" key
    const requestBody = JSON.stringify({
      body: JSON.stringify(requestJSON),
    });

    try {
      // Show loading spinner
      setLoading(true);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Send the request to the backend
      const response = await fetch('https://fzqdr3wfgl.execute-api.us-east-1.amazonaws.com/start-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Display a success toast message
      toast.success(
        'Order placed successfully! You can see your order by going to the View Order Status page. You will also receive a confirmation email with the order details.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      // Clear form fields
      setEmail('');
      setImageName(null);
      setImageBase64(null);
      setOrderId(uuidv4());
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place the order. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      // Hide loading spinner
      setLoading(false);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImageName(file.name);

      // Convert image to base64 string
      const base64 = await convertToBase64(file);
      setImageBase64(base64);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data:URL prefix
        const base64 = base64String.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Place Your Order
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          sx={{ mt: 2 }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        <Typography variant="body2" color="textSecondary">
          {imageName ? `Selected file: ${imageName}` : 'No image selected'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleOrder}
          disabled={!email || !imageBase64} // Disable button if required fields are empty
        >
          Place Order
        </Button>
      </Box>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Order is being processed...
        </Typography>
      </Backdrop>
      <ToastContainer />
    </Container>
  );
};

export default MedicineOrder;
