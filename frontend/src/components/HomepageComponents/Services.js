import React, { useEffect } from 'react';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs';
import { BiTrendingUp } from 'react-icons/bi';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div id='service'>
      <section className=' body-font container mx-auto -mt-16 -pb-4 overflow-hidden'>
        <div className='container mx-auto   pb-12 pt-20 md:pt-24'>
          <div
            data-aos='fade-up'
            data-aos-delay='0'
            data-aos-duration='1000'
            className='mb-6 flex w-full flex-col text-center'
          >
            <h1 className='mb-6 text-3xl font-medium  uppercase text-[#5c67f5] sm:text-4xl'>
              Services
            </h1>
            {/* <div className='flex w-full flex-col items-center'>
              <div className='h-[1px] w-1/2 bg-indigo-800 '></div>
              <div className='-mt-0.5 mb-2 h-1 w-28 rounded-full bg-indigo-600 '></div>
            </div> */}
            <span className='text-md mx-auto  leading-relaxed text-gray-800 '>
              Our business and technology services bring digital transformation,
              innovation, and growth to companies around the world
            </span>
            {/* <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
              <button className="py-1 px-4 bg-indigo-500 text-white focus:outline-none">
                Monthly
              </button>
              <button className="py-1 px-4 focus:outline-none">Annually</button>
            </div> */}
          </div>
          <div className=' flex flex-wrap justify-center tracking-tighter'>
            <div
              data-aos='zoom-in'
              data-aos-delay='10'
              data-aos-duration='1500'
              className='w-full p-4 md:w-1/2 lg:w-1/4 xl:w-1/5 '
            >
              <div className='flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-300 p-2 shadow-lg shadow-indigo-500/50 duration-500 hover:scale-110 hover:border-indigo-200'>
                <div className='mb-4  flex min-h-[80px] items-center justify-center rounded-md  border-b  px-1 text-center text-xl  text-[#5c67f5] md:min-h-[100px] '>
                  <div>
                    <AiOutlineShoppingCart className='mx-auto hover:scale-125' />
                    Purchase / Supply Raw Materials
                  </div>
                </div>
                <div className='flex h-full flex-col justify-between'>
                  <div>
                    <h3 className='px-1  pb-2 text-center md:text-lg'>
                      Improve your procurement process, save time and money, and
                      enhance your brand's value with ProcureN's direct
                      materials sourcing solutions.
                    </h3>
                  </div>
                  {/* <div className='mx-auto'>
                    <a href='#contact'>
                      <button className='mt-6 flex rounded-full border border-y   border-gray-500  from-[#5c67f5]  to-[#cb67ac] bg-clip-text p-2 pl-3 font-sans duration-500 hover:bg-gradient-to-tl     hover:text-transparent focus:outline-none md:mx-2 lg:mx-10 xl:pr-3 '>
                        Know More
                      </button>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
            <div
              data-aos='zoom-in'
              data-aos-delay='10'
              data-aos-duration='1500'
              className='w-full p-4 md:w-1/2 lg:w-1/4 xl:w-1/5 '
            >
              <div className='flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-300 p-2 shadow-lg shadow-indigo-500/50 duration-500 hover:scale-110 hover:border-indigo-200'>
                <div className='mb-4  flex min-h-[80px] items-center justify-center rounded-md border-b  px-1 text-center text-xl  text-[#5c67f5] md:min-h-[100px] '>
                  <div>
                    <BiPurchaseTagAlt className='mx-auto hover:scale-125 ' />
                    Purchase Order
                  </div>
                </div>
                <div className='flex h-full flex-col justify-between'>
                  <span className=' justify-center pb-2  text-center tracking-tighter md:text-lg'>
                    ProcureN handles your full procure-to-pay process, from
                    requisition to invoice payment, and gives you complete
                    visibility of your purchase order's progress. Track your
                    requisitions with ease.
                  </span>
                  {/* <div className='mx-auto'>
                    <a href='#contact'>
                      <button className='mt-6 flex rounded-full border border-y   border-gray-500  from-[#5c67f5]  to-[#cb67ac] bg-clip-text p-2 pl-3 font-sans duration-500   hover:bg-gradient-to-tl    hover:text-transparent focus:outline-none md:mx-2 lg:mx-10 xl:pr-3 '>
                        Know More
                      </button>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
            <div
              data-aos='zoom-in'
              data-aos-delay='10'
              data-aos-duration='1500'
              className='w-full p-4 md:w-1/2 lg:w-1/4 xl:w-1/5 '
            >
              <div className='flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-300 p-2 shadow-lg shadow-indigo-500/50 duration-500 hover:scale-110 hover:border-indigo-200'>
                <div className='mb-4  flex min-h-[80px] items-center justify-center rounded-md border-b  px-1 text-center text-xl  text-[#5c67f5] md:min-h-[100px] '>
                  <div>
                    <BsTruck className='mx-auto whitespace-nowrap hover:scale-125' />
                    Tracking Mechanism
                  </div>
                </div>
                <div className='flex h-full flex-col justify-between'>
                  <div>
                    <h3 className='px-1 pb-2 text-center md:text-lg'>
                      Track the status of your requisitions from submission to
                      invoice with ProcureN's multi-stage approval tracking
                      mechanism. You'll know exactly where your orders are in
                      the process at all times.
                    </h3>
                  </div>
                  {/* <div className='mx-auto'>
                    <a href='#contact'>
                      <button className='mt-6 flex rounded-full border border-y   border-gray-500  from-[#5c67f5]  to-[#cb67ac] bg-clip-text p-2 pl-3 font-sans duration-500   hover:bg-gradient-to-tl   hover:text-transparent focus:outline-none md:mx-2 lg:mx-10 xl:pr-3 '>
                        Know More
                      </button>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
            <div
              data-aos='zoom-in'
              data-aos-delay='10'
              data-aos-duration='1500'
              className='w-full p-4 md:w-1/2 lg:w-1/4 xl:w-1/5 '
            >
              <div className='flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-300 p-2 shadow-lg shadow-indigo-500/50 duration-500 hover:scale-110 hover:border-indigo-200'>
                <div className='mb-4  flex min-h-[80px] items-center justify-center rounded-md border-b  px-1 text-center text-xl  text-[#5c67f5] md:min-h-[100px] '>
                  <div>
                    <BiTrendingUp className='mx-auto hover:scale-125' />
                    Sales Management / ERP Dashboard
                  </div>
                </div>
                <div className='flex h-full flex-col justify-between'>
                  <div>
                    <h3 className='px-1 pb-2 text-center md:text-lg '>
                      Get insights, automate processes, and control your
                      business operations with ProcureN's Sales Management/ERP
                      Dashboard. Integrated to data from accounting,
                      manufacturing, supply chain management and sales.
                    </h3>
                  </div>
                  {/* <div className='mx-auto'>
                    <a href='#contact'>
                      <button className='mt-6 flex rounded-full border border-y   border-gray-500  from-[#5c67f5]  to-[#cb67ac] bg-clip-text p-2 pl-3 font-sans duration-500   hover:bg-gradient-to-tl    hover:text-transparent focus:outline-none md:mx-2 lg:mx-10 xl:pr-3 '>
                        Know More
                      </button>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
