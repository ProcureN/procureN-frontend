import React, { useState, useEffect } from 'react';
import defaultImage from '../../../../assets/Default_pfp.jpg';

import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';

const ViewProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const customerID = localStorage.getItem('customerID');
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        const res = await axios.get(
          `https://procuren-backend-g6z9.onrender.com/Individualprofiles/${customerID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setData(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <CgSpinner
          size={60}
          className='mx-auto mt-16 animate-spin text-indigo-600'
        />
      ) : error ? (
        'Error'
      ) : (
        <div className='flex justify-center '>
          <div className='m-4 flex  items-center justify-center rounded-2xl bg-gradient-to-tl from-blue-300 to-pink-300  shadow-2xl'>
            <div className='flex flex-col items-center justify-around px-5 py-8 md:px-10'>
              <div className='h-24 w-24 overflow-hidden rounded-full border'>
                <img src={defaultImage} alt='default pic' srcSet='' />
              </div>
              <div className='py-4 text-2xl font-bold'>{data.name}</div>
              <div className='text-lg'>{data.selectRole}</div>
            </div>
            <div className=' rounded-r-2xl bg-indigo-100 '>
              <div className=' px-5 pt-10 md:px-10 '>
                <span className='text-xl font-medium '> Information</span>
                <div className='mb-2 h-0.5 w-full bg-gray-500'></div>
                <div className='flex flex-col justify-between md:flex-row   '>
                  <div className='mr-2 flex flex-col '>
                    <span className='font-medium'>Email</span>
                    <span className='text-gray-600'>{data.email}</span>
                  </div>
                  <div className=' item-start flex flex-col md:items-end md:pl-10'>
                    <span className='font-medium'>Phone</span>
                    <span className='text-gray-600'>{data.phone}</span>
                  </div>
                </div>
              </div>
              <div className='px-5 pt-6 md:px-10'>
                <span className='text-xl font-medium '> Company</span>
                <div className='mb-2 h-0.5 w-full bg-gray-500'></div>
                <div className='flex flex-col justify-between md:flex-row   '>
                  <div className=' item-start flex flex-col'>
                    <span className='font-medium'>Job Title</span>
                    <span className='text-gray-600'>{data.jobTitle}</span>
                  </div>
                  <div className=' item-start flex flex-col md:items-end md:pl-10 '>
                    <span className='font-medium '>Company Name</span>
                    <span className='text-gray-600'>{data.company}</span>
                  </div>
                </div>
              </div>
              <div className='px-5 pb-8 pt-6 md:px-10'>
                <span className='text-xl font-medium '> Address</span>
                <div className='mb-2 h-0.5 w-full bg-gray-500'></div>
                <div className='flex flex-col justify-between md:flex-row   '>
                  <div className=' item-start flex flex-col'>
                    <span className='font-medium'>City</span>
                    <span className='text-gray-600'>{data.city}</span>
                  </div>
                  <div className=' item-start flex flex-col md:items-end md:pl-10 '>
                    <span className='font-medium '>State</span>
                    <span className='text-gray-600'>{data.state}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProfile;
