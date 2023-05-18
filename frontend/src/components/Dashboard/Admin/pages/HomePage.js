import React, { useEffect, useState } from 'react';
import NumberCounter from 'number-counter';
import PieCh from '../../PieChart';
import LineCha from '../../LineCha';
import BarCha from '../../BarCha';
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [manufac, setManufac] = useState([]);
  const [retail, setRetail] = useState([]);

  useEffect(() => {
    axios
      .get(`https://procuren-backend.onrender.com/getCountsOfProduct`)
      .then((response) => {
        setData3(response.data); // Assuming the response data should be set to `data`
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://procuren-backend.onrender.com/allDataOfEnquiries`)
      .then((response) => {
        setData2(response.data); // Assuming the response data should be set to `data`
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://procuren-backend.onrender.com/countOfManufacturerAndRetailer`
      )
      .then((response) => {
        setData(response.data.data); // Assuming the response data should be set to `data`
        // console.log('data from manu', response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://procuren-backend.onrender.com/countOfStatusByCustomerIdOfProducts/20`
      )
      .then((response) => {
        setManufac(response.data.data); // Assuming the response data should be set to `data`
        // console.log('data from manu', response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://procuren-backend.onrender.com/countOfStatusByCustomerId/20`)
      .then((response) => {
        setRetail(response.data.data); // Assuming the response data should be set to `data`
        // console.log('data from manu', response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    console.log(retail);
  }, [retail]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div>
      {data3 && data ? (
        <div className='m-2 grid grid-cols-1 md:grid-cols-2  '>
          <div className=' grid grid-cols-3  p-2'>
            <div>
              <div className='  mt-2     h-36 w-36 rounded-xl    p-4 text-xl  '>
                <span className='text-[#5c67f5]'>Total Retailer</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-3xl  font-bold text-gray-600'>
                  {data.total > 0 ? (
                    <NumberCounter
                      end={data.retailerCount}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className='  mt-2   h-36 w-36 rounded-xl    p-4 text-xl  '>
                <span className='text-[#cb67ac]'>Total Manufacturer</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-3xl  font-bold text-gray-600'>
                  {data.total > 0 ? (
                    <NumberCounter
                      end={data.manufacturerCount}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>

              <div className=' mt-2   h-36 w-36 rounded-xl   p-4 text-xl  '>
                <span className=''>Total Users</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-3xl  font-bold text-gray-600'>
                  {data.total > 0 ? (
                    <NumberCounter
                      end={data.total}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
            </div>
            <div className='col-span-2 '>
              {data.total > 0 ? (
                <PieCh
                  value1={data.retailerCount}
                  value2={data.manufacturerCount}
                />
              ) : (
                'Loading'
              )}
            </div>
          </div>
          {/* <div className='mx-2 grid  grid-cols-3 rounded-xl border  p-2'>
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
          </div> */}
          <div className='mx-2 grid  grid-cols-3  border-l  p-2'>
            <div className=' '>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-400'>Pending Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data3.count > 0 ? (
                    <NumberCounter
                      end={data3.data.pending}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-green-500'>Approved Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data3.count > 0 ? (
                    <NumberCounter
                      end={data3.data.approved}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-red-600'>Rejected Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data3.count > 0 ? (
                    <NumberCounter
                      end={data3.data.rejected}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-4 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className=''>Total Products</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-2xl  font-bold text-gray-600'>
                  {data3.count ? (
                    <NumberCounter
                      end={data3.count}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
            </div>
            <div className='col-span-2'>
              {manufac.length > 0 ? <BarCha data={manufac} /> : 'Loading'}
            </div>
          </div>
          <div className=' col-span-2 mr-2 mt-2 items-center justify-center border-t p-2'>
            <div className='flex flex-wrap '>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className=''>Total Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.count}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-green-500'>Approved Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count > 0 ? (
                    <NumberCounter
                      end={data2.data.approvedData}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-500'>Pending Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.data.pendingData}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-red-500 '>Rejected Enquiries</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.data.rejectedData}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-300-400'>InProcees Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.data.countOfInprocessingDelivery}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-orange-400'>Inshipped Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.data.countOfinshippedDelivery}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-blue-400'>InTransit Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count ? (
                    <NumberCounter
                      end={data2.data.countOfinTransitDelivery}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
              <div className=' mr-2 mt-2  h-28 w-28 rounded-xl p-2 text-xl'>
                <span className='text-green-500'>Delivered Product</span>
                <div className='h-0.5 w-full bg-indigo-500'></div>
                <div className='text-xl  font-bold text-gray-600'>
                  {data2.count > 0 ? (
                    <NumberCounter
                      end={data2.data.countOfindeliveredDelivery}
                      start={0}
                      delay='2'
                      preFix='+'
                    />
                  ) : (
                    '0'
                  )}
                </div>
              </div>
            </div>
            <div className='mt-4 h-36 w-full'>
              {retail.length > 0 ? <LineCha data={retail} /> : 'Loading'}
            </div>
          </div>
        </div>
      ) : (
        'Loading'
      )}
      {/* {data ? <div>{JSON.stringify(data)}</div> : 'data found'} */}
    </div>
  );
};

export default HomePage;
