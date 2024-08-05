import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MedicineOrder from './Pages/MedicineOrder';
import Navbar from './Components/Navbar';
import UpdateOrderStatus from './Pages/UpdateOrderStatus';
import ViewOrderDetails from './Pages/ViewOrderDetails';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MedicineOrder />} />
          <Route path="/update-order-status" element={<UpdateOrderStatus />} />
          <Route path="/view-order-details" element={<ViewOrderDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
