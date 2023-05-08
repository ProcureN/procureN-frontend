import React, { useEffect } from 'react';

//Routes component imported
import Management from './pages/Management';
import ProductsManagement from './pages/ProductsManagement';
import HomePage from './pages/HomePage';
import VendorManagement from './pages/VendorManagement';
import VendorEnquiries from './pages/VendorEnquiries';
// import ManageManufacture from './pages/ManageManufacture';
// import ManageRetailer from './pages/ManageRetailer';

function MainContent({ selectedItem }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) {
      window.location.href = '/login';
      return;
    } else if (role !== 'admin') {
      window.location.href = '/login';
      return;
    }
  }, []);
  return (
    <div>
      {selectedItem === 'Home Page' ? (
        <HomePage />
      ) : selectedItem === 'Vendor Enquiries' ? (
        <VendorEnquiries />
      ) : selectedItem === 'Management' ? (
        <Management />
      ) 
      // : selectedItem === 'Manage Retailer' ? (
      //   <ManageRetailer />
      // ) 
      // : selectedItem === 'Manage Manufacturer' ? (
      //   <ManageManufacture />
      // ) 
      : selectedItem === 'Product Management' ? (
        <ProductsManagement />
      ) : (
        selectedItem === 'Vendor Management' && <VendorManagement />
      )}
    </div>
  );
}

export default MainContent;
