import React, { useEffect, useState } from 'react';
import NumberCounter from 'number-counter';
import PieCh from '../../PieChart';
import LineCha from '../../LineCha';
import BarCha from '../../BarCha';
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';

const Home = () => {
  const manu = 1000;
  // {"status":true,"data":{"pending":34,"rejected":3,"approved":10,"inprocessing":40,"inTransit":1,"shipped":1,"delivered":4},"count":47}

  const [data3, setData3] = useState([]);
  // const [pending, setPending] = useState('0');
  // const [rejected, setRejected] = useState('0');
  // const [approved, setApproved] = useState('0');
  // const [inprocessing, setInprocessing] = useState('0');
  // const [inTransit, setInTransit] = useState('0');
  // const [shipped, setShipped] = useState('0');
  // const [delivered, setDelivered] = useState('0');
  // const [totalEnq, setTotalEnq] = useState('0');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  //  let count = 0

  useEffect(() => {
    console.log('HIII');
    async function fetchData() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        await axios
          .get(
            `https://procuren-backend.onrender.com/getCountsOfProduct`,
            // `http://localhost:3001/getCountsOfProduct`,

            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            setData3(response.data);
            setLoading(false);
          })
          .catch((err) => {
            // setError(error.message);

            setError(err);
            alert(`${err.response.data.message}`);
            setLoading(false);
          });
      } catch (err) {
        setError(err);
        alert(`${err.response.data.message}`);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data3.length > 0) setRender(true);
    console.log(render);
    console.log(data3)
  }, [data3]);

  return (
    <div>
      {loading ? (
        <CgSpinner
          size={60}
          className='mx-auto mt-16 animate-spin text-indigo-600'
        />
      ) : error ? (
        'Error ~ Something went wrong :)'
      ) : // <div className='m-2 grid md:grid-cols-2  '>
      //   <div className=' grid grid-cols-3 rounded-xl border  p-2'>
      //     <div>
      //       <div className='  mt-2   h-36 w-36 rounded-xl    p-4 text-xl  '>
      //         <span className='text-blue-500'>Total Manufacturer</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-3xl  font-bold text-gray-600'>
      //           <NumberCounter end={manu} start={800} delay='4' preFix='+' />
      //         </div>
      //       </div>
      //       <div className='  mt-2     h-36 w-36 rounded-xl    p-4 text-xl  '>
      //         <span className='text-green-500'>Total Retailer</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-3xl  font-bold text-gray-600'>
      //           <NumberCounter end={manu} start={800} delay='4' preFix='+' />
      //         </div>
      //       </div>
      //       <div className=' mt-2   h-36 w-36 rounded-xl   p-4 text-xl  '>
      //         <span className=''>Total Users</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-3xl  font-bold text-gray-600'>
      //           <NumberCounter end={manu} start={800} delay='4' preFix='+' />
      //         </div>
      //       </div>
      //     </div>
      //     <div className='col-span-2 '>
      //       <PieCh />
      //       <div className='flex justify-around'>
      //         <div className='flex items-center justify-center'>
      //           <div className='mx-1 h-2 w-2 rounded-full bg-[#5c67f5]'></div>{' '}
      //           <span className='text-[#5c67f5]'>Manufacturer</span>
      //         </div>
      //         <div className='flex items-center justify-center'>
      //           <div className='mx-1 h-2 w-2 rounded-full bg-[#cb67ac]'></div>{' '}
      //           <span className='text-[#cb67ac]'>Retailer</span>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className='mx-2 grid  grid-cols-3 rounded-xl border  p-2'>
      //     <div className=' '>
      //       <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-orange-400'>Pending Products</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter end={manu} start={800} delay='4' preFix='+' />
      //         </div>
      //       </div>
      //       <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-green-500'>Approved Products</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter end={manu} start={800} delay='4' preFix='+' />
      //         </div>
      //       </div>
      //       <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-red-600'>Rejected Products</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter end={manu} start={800} delay='4' preFix='+' />
      //         </div>
      //       </div>
      //       <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className=''>Total Products</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-2xl  font-bold text-gray-600'>
      //           <NumberCounter end={manu} start={800} delay='4' preFix='+' />
      //         </div>
      //       </div>
      //     </div>
      //     <div className='col-span-2'>
      //       <BarCha />
      //     </div>
      //   </div>
      //   <div className=' col-span-2 mr-2 mt-2 items-center justify-center rounded-xl border p-2'>
      //     <div className='flex '>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className=''>Total Enquiries</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.count}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-green-500'>Approved Enquiries</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.data.approved}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-orange-500'>Pending Enquiries</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.data.pending}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-red-500 '>Rejected Enquiries</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.data.rejected}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-orange-300-400'>InProcees Product</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.data.inprocessing}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-orange-400'>Inshipped Product</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.data.shipped}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-blue-400'>InTransit Product</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.data.inTransit}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //       <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
      //         <span className='text-green-500'>Delivered Product</span>
      //         <div className='h-0.5 w-full bg-indigo-500'></div>
      //         <div className='text-xl  font-bold text-gray-600'>
      //           <NumberCounter
      //             end={data3.data.delivered}
      //             start={0}
      //             delay='4'
      //             preFix='+'
      //           />
      //         </div>
      //       </div>
      //     </div>
      //     <div className='mt-4 h-36 w-full'>
      //       <LineCha />
      //     </div>
      //   </div>
      // </div>
      render ? (
        <div className='m-2 grid md:grid-cols-2  '>
          <div className=' grid grid-cols-3 rounded-xl border  p-2'>
            <div>
              <div className='  mt-2   h-36 w-36 rounded-xl    p-4 text-xl  '>
                <span className='text-blue-500'>Total Manufacturer</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-3xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className='  mt-2     h-36 w-36 rounded-xl    p-4 text-xl  '>
                <span className='text-green-500'>Total Retailer</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-3xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mt-2   h-36 w-36 rounded-xl   p-4 text-xl  '>
                <span className=''>Total Users</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-3xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
            </div>
            <div className='col-span-2 '>
              <PieCh />
              <div className='flex justify-around'>
                <div className='flex items-center justify-center'>
                  <div className='mx-1 h-2 w-2 rounded-full bg-[#5c67f5]'></div>{' '}
                  <span className='text-[#5c67f5]'>Manufacturer</span>
                </div>
                <div className='flex items-center justify-center'>
                  <div className='mx-1 h-2 w-2 rounded-full bg-[#cb67ac]'></div>{' '}
                  <span className='text-[#cb67ac]'>Retailer</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mx-2 grid  grid-cols-3 rounded-xl border  p-2'>
            <div className=' '>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-400'>Pending Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-green-500'>Approved Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-red-600'>Rejected Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className=''>Total Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-2xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
            </div>
            <div className='col-span-2'>
              <BarCha />
            </div>
          </div>
          <div className=' col-span-2 mr-2 mt-2 items-center justify-center rounded-xl border p-2'>
            <div className='flex '>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className=''>Total Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={1000} start={0} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-green-500'>Approved Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-500'>Pending Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-red-500 '>Rejected Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-300-400'>InProcees Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-400'>Inshipped Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-blue-400'>InTransit Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-green-500'>Delivered Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  <NumberCounter end={manu} start={800} delay='4' preFix='+' />
                </div>
              </div>
            </div>
            <div className='mt-4 h-36 w-full'>
              <LineCha />
            </div>
          </div>
        </div>
      ) : (
        'Loading..'
      )}
    </div>
  );
};

export default Home;

// countOfRetailer , /countOfInprocessingDelivery , /countOfindeliveredDelivery ,/countOfinshippedDelivery , /countOfinTransitDelivery , /countProduct , /pendingProducts , /approvedProducts , rejectedProducts , countOfInprocessingProducts , countOfindeliveredProducts , countOfinshippedProducts , countOfinTransitProducts , countOfContactForm,/countData
