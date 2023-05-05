import React, { useEffect } from 'react';
import EnquiryManage from './pages/EnquiryManage';

import ManageProducts from './pages/ManageProducts';
import HomePage from './pages/HomePage';
import ManageUser from './pages/ManageUser';
import FeedbackForm from './pages/ContactForm';
import ManageManufacture from './pages/ManageManufacture';
import ManageRetailer from './pages/ManageRetailer';

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
      ) : selectedItem === 'Proposal Enquiries' ? (
        <FeedbackForm />
      ) : selectedItem === 'Enquiry Management' ? (
        <EnquiryManage />
      ) : selectedItem === 'Manage Retailer' ? (
        <ManageRetailer />
      ) : selectedItem === 'Manage Manufacturer' ? (
        <ManageManufacture />
      ) : selectedItem === 'Manage Products' ? (
        <ManageProducts />
      ) : (
        selectedItem === 'Manage Users' && <ManageUser />
      )}
    </div>
  );
}

export default MainContent;
