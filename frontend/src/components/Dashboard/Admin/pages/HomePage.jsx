import { AiOutlineMenu } from 'react-icons/ai';
import TinyLineChart from '../TinyLineChart';
// import SynchronizedLineChart from '../SynchronizedLineChart';

// import axios from 'axios';
// import CircularProgressBar from '../../CircularProgressBar';
// import BarCha from '../../BarCha';
// import NumberCounter from 'number-counter';

const HomePage = ({ open, setOpen }) => {
  // const [manufac, setManufac] = useState([]);
  // const [retail, setRetail] = useState([]);
  // const [data, setData] = useState([]);
  // const [data2, setData2] = useState([]);
  // const [data3, setData3] = useState([]);

  // const totalPending = useRef(0);
  // const totalApproved = useRef(0);
  // const totalRejected = useRef(0);
  // const totalProducts = useRef(0);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://procuren-backend.onrender.com/countOfStatusByCustomerIdOfProducts/20`
  //     )
  //     .then((response) => {
  //       setManufac(response.data.data); // Assuming the response data should be set to `data`
  //       // console.log('data from manu', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://procuren-backend.onrender.com/countOfStatusByCustomerId/20`)
  //     .then((response) => {
  //       setRetail(response.data.data); // Assuming the response data should be set to `data`
  //       // console.log('data from manu', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://procuren-backend.onrender.com/countOfManufacturerAndRetailer`
  //     )
  //     .then((response) => {
  //       setData(response.data.data); // Assuming the response data should be set to `data`
  //       // console.log('data from manu', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://procuren-backend.onrender.com/allDataOfEnquiries`)
  //     .then((response) => {
  //       setData2(response.data); // Assuming the response data should be set to `data`
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://procuren-backend.onrender.com/getCountsOfProduct`)
  //     .then((response) => {
  //       setData3(response.data); // Assuming the response data should be set to `data`

  //       totalPending.current = `${Math.round(
  //         (response.data.data.pending / response.data.count) * 100
  //       )}%`;
  //       totalApproved.current = `${Math.round(
  //         (response.data.data.approved / response.data.count) * 100
  //       )}%`;
  //       totalRejected.current = `${Math.round(
  //         (response.data.data.rejected / response.data.count) * 100
  //       )}%`;
  //       totalProducts.current = `${Math.round(
  //         (response.data.count / response.data.count) * 100
  //       )}%`;
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <>
      <div className='my-2 flex h-16 justify-between rounded-md bg-gray-100 shadow-lg shadow-gray-400 md:mr-4'>
        <div className='my-auto pl-2'>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className='mx-auto my-auto bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans  text-2xl font-semibold  text-transparent'>
          Admin Dashboard
        </div>
      </div>

      {/* <img
        src={require('../../../../assets/Capture.PNG')}
        alt=''
        srcset=''
        className='w-full'
      /> */}
      <div className='flex  flex-wrap w-full h-full '>
        {/* <div className='h-1/3 w-1/5'>
          <TinyLineChart />
        </div> */}
        <div className='h-[90vh] w-full'>
          <TinyLineChart />
          {/* <SynchronizedLineChart/> */}
        </div>
        {/* <div className='h-1/3 w-1/5'>
          <TinyLineChart />
        </div>
        <div className='h-1/3 w-1/5'>
          <TinyLineChart />
        </div> */}
        {/* <div className='h-1/3 w-1/2'>
          <SynchronizedLineChart/>
        </div> */}
        {/* <div className='h-1/3 w-1/5'>
          <TinyLineChart />
        </div>
        <div className='h-1/3 w-1/5'>
          <TinyLineChart />
        </div> */}
      </div>
      {/* <div className='rounded-xl bg-slate-50 '>
        <div className='mt-1 border-b text-[#5c67f5]'>
          <div className='text-center text-2xl '> Manufacturer Summary </div>
          <div className='mr-2 grid h-[40vh] grid-cols-6 gap-4 '>
            <div className='text col-span-1 rounded-xl p-4 text-xl xl:text-2xl 2xl:text-3xl'>
              Manufacturer <br /> <hr className='mb-4' />
              <span className='text-5xl'>{data.manufacturerCount}</span>
              <br />
              <div className='3xl:px-20  2xl:px-10'>
                {data.total > 0 ? (
                  <CircularProgressBar
                    val={data.manufacturerCount}
                    total={data.total}
                    textColor='#5c67f5'
                  />
                ) : (
                  'Loading'
                )}
              </div>
            </div>
            <div className='col-span-3   rounded-xl '>
              {manufac.length > 0 ? <BarCha data={manufac} /> : 'Loading'}
            </div>
            <div className='col-span-2 mb-4 h-min w-full rounded-xl  p-2'>
              <div className='w-full'>
                <div className='flex justify-between px-2 pb-2 text-xl '>
                  <div>Total Pending</div>
                  <div className='text-3xl'>
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
                <div className='mb-6 ml-2 h-3  w-full rounded-full bg-slate-200'>
                  {data3.count > 0 && (
                    <div
                      className={` h-3 animate-fill rounded-full bg-[#5c67f5]`}
                      style={{ width: `${totalPending.current}` }}
                    ></div>
                  )}
                </div>
              </div>

              <div className='w-full'>
                <div className='flex justify-between px-2 pb-2 text-xl '>
                  <div>Total Approved</div>
                  <div className='text-3xl'>
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

                <div className='mb-2 ml-2 h-3 w-[100%] animate-fill rounded-full bg-[#5c67f5]'></div>
                <div className='mb-6 ml-2 h-3 w-full rounded-full bg-slate-200'>
                  {data3.count > 0 && (
                    <div
                      className={`  h-3 animate-fill rounded-full bg-[#5c67f5]`}
                      style={{ width: `${totalApproved.current}` }}
                    ></div>
                  )}
                </div>
              </div>
              <div className='w-full'>
                <div className='flex justify-between px-2 pb-2 text-xl '>
                  <div>Total Rejected</div>
                  <div className='text-3xl'>
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
                <div className='mb-6 ml-2 h-3 w-full   rounded-full bg-slate-200'>
                  {data3.count > 0 && (
                    <div
                      className={` h-3 animate-fill rounded-full bg-[#5c67f5]`}
                      style={{ width: `${totalRejected.current}` }}
                    ></div>
                  )}
                </div>
              </div>
              <div className='w-full'>
                <div className='flex justify-between px-2 pb-2 text-xl '>
                  <div>Total Products</div>
                  <div className='text-3xl'>
                    {data3.count > 0 ? (
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
                <div className='ml-2 h-3 w-full rounded-full bg-slate-200'>
                  <div>
                    {data3.count > 0 && (
                      <div
                        className={`  h-3 animate-fill rounded-full bg-[#5c67f5]`}
                        style={{ width: `${totalProducts.current}` }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3 text-[#cb67ac] '>
          <div className='text-center text-2xl  '>Retailer Summary</div>
          <div className='mr-2 grid h-[40vh] grid-cols-6 gap-4'>
            <div className='text col-span-1   rounded-xl p-4 text-xl  xl:text-2xl 2xl:text-3xl'>
              Retailer <br />
              <hr className='mb-4' />
              <span className='text-5xl'>{data.retailerCount}</span>
              <br />
              <div className='3xl:px-20  2xl:px-10'>
                {data.total > 0 ? (
                  <CircularProgressBar
                    val={data.retailerCount}
                    total={data.total}
                    textColor='#cb67ac'
                  />
                ) : (
                  'Loading'
                )}
              </div>
            </div>
            <div className='col-span-3  rounded-xl  '>
              {retail.length > 0 ? <BarCha data={retail} /> : 'Loading'}
            </div>
            <div className='col-span-2  grid h-min grid-cols-2 gap-4 rounded-xl p-2 text-white '>
              <div className='rounded-xl bg-[#cb67ac] p-2 '>
                <div className='col-span-1 mb-1 h-min gap-1  rounded-lg px-2 text-xl '>
                  Pending <br />
                  <hr />
                  <span className='text-3xl'>
                    {data2.count > 0 ? (
                      <NumberCounter
                        end={data2.data.pendingData}
                        start={0}
                        delay='1'
                        preFix='+'
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>
                <div className='col-span-1 mb-1 h-min gap-1 rounded-lg  px-2 text-xl   '>
                  Approved <br />
                  <hr />
                  <span className='text-3xl'>
                    {data2.count > 0 ? (
                      <NumberCounter
                        end={data2.data.approvedData}
                        start={0}
                        delay='1'
                        preFix='+'
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>
                <div className='col-span-1 mb-1 h-min gap-1 rounded-lg  px-2 text-xl '>
                  Rejected <br />
                  <hr />
                  <span className='text-3xl'>
                    {data2.count > 0 ? (
                      <NumberCounter
                        end={data2.data.rejectedData}
                        start={0}
                        delay='1'
                        preFix='+'
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>
                <div className='col-span-1 mb-1 h-min gap-1 rounded-lg  px-2 text-xl '>
                  Total
                  <br />
                  <hr />
                  <span className='text-3xl'>
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
                  </span>
                </div>
              </div>
              <div className='rounded-xl bg-[#cb67ac] p-2'>
                <div className='col-span-1 mb-1 h-min gap-1 rounded-lg  px-2 text-xl '>
                  InProcess <br />
                  <hr />
                  <span className='text-3xl'>
                    {data2.count ? (
                      <NumberCounter
                        end={data2.data.countOfInprocessingDelivery}
                        start={0}
                        delay='1'
                        preFix='+'
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>
                <div className='col-span-1 mb-1 h-min gap-1 rounded-lg  px-2 text-xl '>
                  InTransit <br />
                  <hr />
                  <span className='text-3xl'>
                    {data2.count ? (
                      <NumberCounter
                        end={data2.data.countOfinTransitDelivery}
                        start={0}
                        delay='1'
                        preFix='+'
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>
                <div className='col-span-1 mb-1 h-min gap-1 rounded-lg  px-2 text-xl '>
                  InShipped <br />
                  <hr />
                  <span className='text-3xl'>
                    {data2.count ? (
                      <NumberCounter
                        end={data2.data.countOfinshippedDelivery}
                        start={0}
                        delay='1'
                        preFix='+'
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>
                <div className='col-span-1 mb-1 h-min gap-1 rounded-lg  px-2 text-xl '>
                  Delivered <br />
                  <hr />
                  <span className='text-3xl'>
                    {data2.count > 0 ? (
                      <NumberCounter
                        end={data2.data.countOfindeliveredDelivery}
                        start={0}
                        delay='1'
                        preFix='+'
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
