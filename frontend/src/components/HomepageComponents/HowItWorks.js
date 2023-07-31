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
      <div className='md:text-md mb-6 flex flex-col gap-4 text-center text-sm md:mb-14 lg:flex-row'>
        {/* <div className='flex w-full flex-col items-center text-white md:w-1/2  '>
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
        </div> */}
        <div
          data-aos='fade-right'
          data-aos-delay='0'
          data-aos-duration='1000'
          className='flex w-full flex-col items-center text-white lg:w-1/2 '
        >
          <div className='title-font mb-3 text-center text-2xl font-medium  text-[#cb67ac] sm:text-3xl'>
            Vendor
          </div>
          <div className='flex w-full scale-95 justify-start  duration-500 hover:z-10 hover:scale-100 sm:mr-48 sm:scale-100 sm:justify-center sm:hover:scale-110 '>
            <div className='mr-2 flex h-full items-center text-end font-sans text-3xl text-[#cb67ac] md:text-5xl '>
              01
            </div>
            <div className='top-10   w-min whitespace-nowrap rounded-3xl  border border-white bg-[#cb67ac] from-[#5c67f5] to-[#cb67ac] p-8 transition-all duration-100 hover:bg-gradient-to-tr '>
              Send your product <br />
              or service details
            </div>
          </div>

          <div className='-mt-8 flex w-full scale-95 justify-end duration-500 hover:z-10 hover:scale-100 sm:ml-40  sm:scale-100 sm:justify-center sm:hover:scale-110  '>
            <div className='top-10   w-min whitespace-nowrap rounded-3xl  border border-white bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac] p-8 transition-all duration-100 hover:bg-gradient-to-tr '>
              Proposal discussions <br />& verification
            </div>
            <div className='ml-2 flex h-full items-center text-end font-sans  text-3xl text-[#5c67f5] md:text-5xl '>
              02
            </div>
          </div>

          <div className='-mt-4 flex w-full scale-95 justify-start duration-500 hover:z-10 hover:scale-100  sm:mr-48  sm:scale-100 sm:justify-center sm:hover:scale-110  '>
            <div className='mr-2 flex h-full items-center text-end font-sans text-3xl text-[#cb67ac] md:text-5xl '>
              03
            </div>
            <div className='   w-min whitespace-nowrap rounded-3xl  border border-white bg-[#cb67ac] from-[#5c67f5] to-[#cb67ac] p-8 transition-all duration-100 hover:bg-gradient-to-tr '>
              Get informed <br />
              about new deals
            </div>
          </div>

          <div className='-mt-8 flex w-full scale-95 justify-end duration-500 hover:z-10 hover:scale-100 sm:ml-40 sm:scale-100 sm:justify-center sm:hover:scale-110  '>
            <div className='top-10   w-min whitespace-nowrap rounded-3xl  border border-white bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac] px-8 py-12 transition-all duration-100 hover:bg-gradient-to-tr '>
              Finalize the deal
            </div>
            <div className='ml-2 flex h-full items-center text-end font-sans text-3xl text-[#5c67f5] md:text-5xl '>
              04
            </div>
          </div>
        </div>
        <div className='container mx-auto  my-2 h-0.5 border-b from-white via-slate-300 to-white md:bg-gradient-to-tr lg:h-auto lg:w-0.5 '></div>
        <div
          data-aos='fade-left'
          data-aos-delay='0'
          data-aos-duration='1000'
          className='flex w-full flex-col items-center text-white lg:w-1/2 '
        >
          <div className='title-font mb-3 text-center text-2xl font-medium  text-[#cb67ac] sm:text-3xl'>
            Client
          </div>

          <div className='flex  w-full scale-95 justify-start duration-500 hover:z-10  hover:scale-100 sm:mr-48 sm:scale-100 sm:justify-center  sm:hover:scale-110 '>
            <div className='mr-2 flex h-full items-center text-end font-sans text-3xl text-[#5c67f5] md:text-5xl '>
              01
            </div>
            <div className='top-10   w-min whitespace-nowrap rounded-full  border border-white bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac] p-8 transition-all duration-100 hover:bg-gradient-to-tr '>
              Select your <br />
              product
            </div>
          </div>

          <div className='-mt-8 flex w-full scale-95 justify-end duration-500 hover:z-10 hover:scale-100  sm:ml-40 sm:scale-100 sm:justify-center  sm:hover:scale-110 '>
            <div className='top-10   w-min whitespace-nowrap rounded-full  border border-white bg-[#cb67ac] from-[#5c67f5] to-[#cb67ac] p-8 transition-all duration-100 hover:bg-gradient-to-tr '>
              Send us an <br />
              enquiry of product
            </div>
            <div className='ml-2 flex h-full items-center text-end font-sans text-3xl text-[#cb67ac] md:text-5xl '>
              02
            </div>
          </div>

          <div className='-mt-6 flex w-full scale-95 justify-start duration-500 hover:z-10  hover:scale-100 sm:mr-48 sm:scale-100 sm:justify-center  sm:hover:scale-110 '>
            <div className='mr-2 flex h-full items-center text-end font-sans text-3xl text-[#5c67f5] md:text-5xl '>
              03
            </div>
            <div className='   w-min whitespace-nowrap rounded-full   border border-white bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac] p-8 transition-all duration-100 hover:bg-gradient-to-tr '>
              Receive response <br />
              to your enquiry
            </div>
          </div>

          <div className='-mt-6 flex w-full scale-95 justify-end duration-500 hover:z-10 hover:scale-100 sm:ml-40 sm:scale-100 sm:justify-center  sm:hover:scale-110 '>
            <div className='top-10   w-min whitespace-nowrap rounded-full   border border-white bg-[#cb67ac] from-[#5c67f5] to-[#cb67ac] px-8 py-10 transition-all duration-100 hover:bg-gradient-to-tr '>
              Finalize the deal
            </div>
            <div className='ml-2 flex h-full items-center text-end font-sans text-3xl text-[#cb67ac] md:text-5xl '>
              04
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
