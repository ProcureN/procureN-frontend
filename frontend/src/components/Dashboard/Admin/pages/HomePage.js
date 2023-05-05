import React from 'react';
import NumberCounter from 'number-counter';
import PieCh from '../../PieChart';
import LineCha from '../../LineCha';
import BarCha from '../../BarCha';
const HomePage = () => {
  const manu = 1000;
  return (
    <div>
    
      <div className='m-2 grid md:grid-cols-2  '>
        <div className=' grid grid-cols-3  rounded-xl bg-indigo-200 p-2'>
          <div>
            <div className='  mt-2   h-36 w-36 rounded-xl bg-indigo-50   p-4 text-xl  shadow-lg'>
              <span className='text-blue-500'>Total Manufacturer</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-3xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className='  mt-2     h-36 w-36 rounded-xl bg-indigo-50   p-4 text-xl  shadow-lg'>
              <span className='text-green-500'>Total Retailer</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-3xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mt-2   h-36 w-36 rounded-xl bg-indigo-50   p-4 text-xl  shadow-lg'>
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
                <div className='mx-1 h-2 w-2 rounded-full bg-blue-600'></div>{' '}
                <span className='text-blue-600'>Manufacturer</span>
              </div>
              <div className='flex items-center justify-center'>
                <div className='mx-1 h-2 w-2 rounded-full bg-green-600'></div>{' '}
                <span className='text-green-600'>Retailer</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-2   grid grid-cols-3 rounded-xl bg-indigo-200 p-2'>
          <div className=' '>
            <div className=' mr-4 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className='text-orange-400'>Pending Products</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-4 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className='text-green-500'>Approved Products</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-4 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className='text-red-600'>Rejected Products</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-4 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className=''>Total Products</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-2xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
          </div>
          <div className='col-span-2'><BarCha/></div>
        </div>
        <div className=' mr-2 mt-2 col-span-2 items-center justify-center rounded-xl bg-indigo-200 p-2'>
          <div className='flex '>
          <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className=''>Total Enquiries</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
            <span className='text-green-500'>Approved Enquiries</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
            <span className='text-orange-500'>Pending Enquiries</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
            <span className='text-red-500 '>Rejected Enquiries</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className='text-orange-300-400'>InProcees Product</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className='text-orange-400'>Inshipped Product</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className='text-blue-400'>InTransit Product</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
            <div className=' mr-2 mt-2  h-28 w-28 rounded-xl bg-indigo-50   p-2 text-xl  shadow-lg'>
              <span className='text-green-500'>Delivered Product</span>
              <div className='h-0.5 w-full bg-indigo-500'></div>
              <div className='text-xl  font-bold text-gray-600'>
                <NumberCounter end={manu} start={800} delay='4' preFix='+' />
              </div>
            </div>
          </div>
          <div className='h-36 w-full mt-4'>
            <LineCha/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// countOfRetailer , /countOfInprocessingDelivery , /countOfindeliveredDelivery ,/countOfinshippedDelivery , /countOfinTransitDelivery , /countProduct , /pendingProducts , /approvedProducts , rejectedProducts , countOfInprocessingProducts , countOfindeliveredProducts , countOfinshippedProducts , countOfinTransitProducts , countOfContactForm,/countData
