// src/components/Navbar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MedEasy
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/update-order-status">
          Update Order Status
        </Button>
        <Button color="inherit" component={Link} href="/view-order-details">
          View Order Details
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
