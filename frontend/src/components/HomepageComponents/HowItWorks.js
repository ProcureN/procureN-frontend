import React, { useEffect } from 'react';
// import howItWorks from '../../assets/Infographic.png';

import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <>
      {/* <div
        data-aos='fade-up'
        data-aos-delay='0'
        data-aos-duration='1000'
        // data-aos-once='true' 
        className='container mx-auto  overflow-hidden md:px-4 md:pb-4  lg:px-10 xl:px-16'
      >
        <img src={howItWorks} alt='How ProcureN works' srcSet='' className='' />
      </div> */}
      <div className='title-font container mx-auto mb-4  pb-2 text-center text-3xl font-medium uppercase text-[#5c67f5] sm:text-4xl'>
        Process
      </div>
      <div className='md:text-md mb-6 flex flex-col gap-4 text-center text-sm md:mb-14 md:flex-row'>
        <div className='flex w-full flex-col items-center text-white md:w-1/2  '>
          <div className='title-font mb-3 text-center text-2xl font-medium  text-[#5c67f5] sm:text-3xl'>
            Vendor
          </div>
          <div
            data-aos='fade-right'
            data-aos-delay='0'
            data-aos-duration='1000'
            className='mr-28 w-min whitespace-nowrap rounded-full border-2 border-white bg-[#5c67f5]  px-6 py-7 transition-all duration-500 hover:z-10  '
          >
            Send your product <br />
            or service details
          </div>
          <div
            data-aos='fade-left'
            data-aos-delay='0'
            data-aos-duration='1000'
            className='top-20 -mt-4 ml-28 w-min whitespace-nowrap rounded-2xl  border border-white bg-[#cb67ac] px-4 py-6 transition-all duration-500 hover:z-10  '
          >
            Proposal discussions <br />& verification
          </div>
          <div
            data-aos='fade-right'
            data-aos-delay='0'
            data-aos-duration='1000'
            className='top-40 -mt-4 mr-28 w-min whitespace-nowrap rounded-3xl  border border-white bg-[#5c67f5] px-6 py-8 transition-all duration-500 hover:z-10  '
          >
            Get informed <br />
            about new deals
          </div>
          <div
            data-aos='fade-left'
            data-aos-delay='0'
            data-aos-duration='1000'
            className='top-60 -mt-4 ml-28 w-min whitespace-nowrap rounded-2xl  border border-white bg-[#cb67ac] px-6 py-14 transition-all duration-500 hover:z-10  '
          >
            Finalize the deal
          </div>
        </div>
        <div className='container mx-auto  my-2 h-0.5 border-b from-white via-slate-300 to-white md:h-auto md:w-0.5 md:bg-gradient-to-tr '></div>
        <div
          data-aos='fade-left'
          data-aos-delay='0'
          data-aos-duration='1000'
          className='flex w-full flex-col items-center text-white md:w-1/2 '
        >
          <div className='title-font mb-3 text-center text-2xl font-medium  text-[#cb67ac] sm:text-3xl'>
            Client
          </div>
          <div className='mr-28 w-min whitespace-nowrap rounded-full border-2 border-white bg-[#5c67f5] px-6 py-8 transition-all duration-100 hover:z-10 hover:scale-110'>
            Select your <br />
            product
          </div>
          <div className='top-20 -mt-4 ml-28 w-min whitespace-nowrap rounded-2xl  border border-white bg-[#cb67ac] px-4 py-6 transition-all duration-100 hover:z-10 hover:scale-110 '>
            Send us an <br />
            enquiry of product
          </div>
          <div className='top-40 -mt-4 mr-28 w-min whitespace-nowrap rounded-2xl  border border-white bg-[#5c67f5] px-6 py-10 transition-all duration-100 hover:z-10 hover:scale-110 '>
            Receive response <br />
            to your enquiry
          </div>
          <div className='-mt-8 ml-28 flex  justify-center hover:z-10 hover:scale-110'>
            {/* <div className='text-4xl text-[#cb67ac] h-full flex items-center text-end  mr-2 '>4.</div> */}
            <div className='top-10   w-min whitespace-nowrap rounded-3xl  border border-white bg-[#cb67ac] px-8 py-12 transition-all duration-100 '>
              Finalize the deal
            </div>
          </div>
        </div>
      </div>
      {/* <div className='text-white flex relative h-[60vh] '>
        <div className='bg-[#5c67f5] rounded-full px-4 py-6 w-min whitespace-nowrap absolute left-[25%] hover:z-10 transition-all duration-500 border-2 border-white hover:scale-105 '>Send your product <br />or service details</div>
        <div className='bg-[#cb67ac] rounded-2xl py-6 px-4 w-min whitespace-nowrap absolute right-1/2 top-20 hover:z-10 transition-all duration-500 border border-white hover:scale-105 '>Proposal discussions <br />& verification</div>
        <div className='bg-[#5c67f5] rounded-3xl py-10 px-6 w-min whitespace-nowrap absolute left-[25%] top-40 hover:z-10 transition-all duration-500 border border-white hover:scale-105 '>Get informed <br />about new deals</div>
        <div className='bg-[#cb67ac] rounded-2xl py-14 px-6 w-min whitespace-nowrap absolute right-1/2 top-60 hover:z-10 transition-all duration-500 border border-white hover:scale-105 '>Finalize the deal</div>
      </div> */}
    </>
  );
};

export default HowItWorks;
