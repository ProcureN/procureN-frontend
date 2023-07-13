import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

import axios from 'axios';

const ModalDelete = ({ visible, onClose, Values, setSub, deletePopup }) => {
  const [loading, setLoading] = useState(false);

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      if (deletePopup === 'user') {
        await axios.delete(
          `https://procuren-backend.onrender.com/deletecostumer/${Values._id}`,
          // `http://localhost:3001/deletecostumer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (deletePopup === 'product') {
        await axios.delete(
          `https://procuren-backend.onrender.com/products/${Values._id}`,
          // `http://localhost:3001/deletecostumer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (deletePopup === 'contactForm') {
        await axios.delete(
          `https://procuren-backend.onrender.com/deleteContactForm/${Values._id}`,
          // `http://localhost:3001/deletecostumer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (deletePopup === 'enquiry') {
        await axios.delete(
          `https://procuren-backend.onrender.com/deleteCostumerEnquiry/${Values._id}`,
          // `http://localhost:3001/deletecostumer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setLoading(false);
      setSub(true);
      onClose();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (!visible) return null;
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed  inset-0 flex items-center justify-center   backdrop-blur-[3px]'
    >
      <div className='  bg-white px-16  py-4 text-center shadow-lg shadow-gray-500 '>
        <AiFillDelete className='mx-auto mb-2 text-4xl text-red-500 ' />
        <span className='text-2xl'>Are you sure?</span>
        <p className='mt-2'>Do you really want to delete record?</p>
        {/* <span>
          Do you really want to delete this record? This process cannot be
          undone.
        </span> */}

        <div className='flex justify-around'>
          <button
            onClick={handleDelete}
            className='mb-2 mt-6 rounded-full border bg-red-500  px-8    py-1  font-sans text-lg text-white shadow-lg duration-500 hover:bg-red-700     '
          >
            {loading ? 'Deleting' : 'Delete'}
          </button>
          {!loading && (
            <button
              onClick={onClose}
              className='mb-2 mt-6 rounded-full border border-indigo-300 px-8 py-1  font-sans text-lg font-semibold tracking-wide hover:border-indigo-400 hover:bg-indigo-200 '
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
