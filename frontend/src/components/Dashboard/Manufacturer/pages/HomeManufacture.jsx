import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NumberCounter from 'number-counter';
import { AiOutlineMenu } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';
import defaultImage from '../../../../assets/Default_pfp.jpg';


const HomeManufacture = ({ open, setOpen }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data2, setData2] = useState([]);

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
          // `http://localhost:3001/Individualprofiles/${customerID}`,
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

  useEffect(() => {
    const customerID = localStorage.getItem('customerID');
    axios
      .get(
        `https://procuren-backend-g6z9.onrender.com/individualproductscount/${customerID}`
      )
      .then((response) => {
        setData2(response.data); // Assuming the response data should be set to `data`
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div className='my-2 flex h-16 justify-between rounded-md bg-white shadow md:mr-4'>
        <div className='my-auto pl-2'>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div>
        {data && (
          <div className=' my-auto mr-4 bg-gradient-to-tr from-[#5c67f5]  to-pink-500 bg-clip-text font-sans text-2xl font-semibold  uppercase  text-transparent'>
            {/* {data.name} */}
            Retailers Dashboard
          </div>
        )}
      </div>
      {loading ? (
        <CgSpinner
          size={60}
          className='mx-auto mt-16 animate-spin text-indigo-600'
        />
      ) : error ? (
        'Error'
      ) : (
        <div className=''>
          <span className='text-md px-2'>
            Welcome back to your dashboard! We're glad to see you again.
          </span>
          <div className='flex justify-center '>
            <div className='m-4 flex  items-center justify-center rounded-2xl bg-gradient-to-tl from-blue-300 to-pink-300  shadow-2xl'>
              <div className='flex flex-col items-center justify-around px-5 py-8 md:px-10'>
                <div className='h-24 w-24 overflow-hidden rounded-full border'>
                  <img src={defaultImage} alt='default pic' srcSet='' />
                </div>
                <div className='py-4 text-2xl font-bold uppercase'>
                  {data.name}
                </div>
                <div className='text-lg'>{data.selectRole}</div>
              </div>
              <div className=' h-full rounded-r-2xl bg-indigo-100 '>
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
          <div className='col-span-2 mr-2 mt-2 w-full items-center justify-center  p-2'>
            <div className='flex flex-wrap justify-center'>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className=''>Total Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.count}
                      start={0}
                      delay='1'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-green-500'>Approved Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count > 0 ? (
                    <NumberCounter
                      end={data2.data.approved}
                      start={0}
                      delay='1'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-500'>Pending Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.data.pending}
                      start={0}
                      delay='1'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-red-500 '>Rejected Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.data.rejected}
                      start={0}
                      delay='1'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className='mt-4 h-36 w-full'>
            <LineCha />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default HomeManufacture;
