import React, { useEffect, useState } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
const About = () => {
  useEffect(() => {
    AOS.init({once: true});
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <div id='about'>
      <section className=' container mx-auto -mt-12'>
        <div className='container mx-auto   px-5  pt-20 md:pt-24'>
          {/* <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          /> */}
          <div className=' w-full'>
            <h2 className='mb-6 text-center text-3xl  font-medium uppercase text-[#5c67f5] sm:text-4xl '>
              About us
            </h2>
            {/* <div className='flex w-full flex-col items-center'>
              <div className='h-[1px] w-1/2 bg-indigo-800 '></div>
              <div className=' -mt-0.5 mb-3 h-1 w-28 rounded-full bg-indigo-600 '></div>
            </div> */}
            <div
              data-aos='fade-up'
              data-aos-delay='0'
              data-aos-duration='1500'
              className='text-justify indent-16 md:indent-20 lg:indent-24 xl:indent-28 '
            >
              <span>
                At{' '}
                <span className=' bg-gradient-to-bl from-[#5c67f5] to-[#cb67ac] bg-clip-text font-medium text-transparent '>
                  ProcureN!
                </span>
                , we specialize in supply chain management and provide
                innovative solutions and strategic insights to optimize business
                operations and achieve goals. Our team of experts has years of
                experience in managing inventory, implementing new technology,
                and tackling any supply chain challenge. We're committed to
                exceeding expectations and delivering exceptional service
                through our cutting-edge technology and customer service. Our
                customized solutions are tailored to meet each client's unique
                needs, and we work closely with them to ensure success in
                today's competitive marketplace. Choose{' '}
                <span className=' bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text font-medium text-transparent '>
                  ProcureN
                </span>{' '}
                for a supply chain management partner that will
                help you succeed.
                <div className='mt-2' />
              </span>
              {open ? (
                <>
                  <div className='mb-4    '>
                    At{' '}
                    <span className='bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text indent-8 font-medium text-transparent '>
                      ProcureN
                    </span>
                    , we understand the importance of streamlining your direct
                    materials sourcing and procurement processes to optimize
                    time and cost efficiencies, minimize defect rates, and
                    enhance your brand's value. Our procure-to-pay process is
                    designed to handle the full purchase order lifecycle, from
                    requisition to invoice payment, providing complete
                    visibility of your orders' progress at all times. With our
                    tracking mechanism, buyers can track the status of their
                    requisitions from submission through multi-stage approval,
                    to flipping into a purchase order, submission to the
                    supplier, acknowledgement by the supplier, advanced shipping
                    notice (ASN), and finally, the invoice.
                    <div className='mt-2 '>
                      Our Sales Management/ERP Dashboard is a powerful
                      application that automates business processes, provides
                      insights, and internal controls, drawing on a central
                      database that collects inputs from departments including
                      accounting, manufacturing, supply chain management, sales,
                      marketing, and human resources (HR). Trust{' '}
                      <span className=' bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text font-medium text-transparent '>
                        ProcureN
                      </span>{' '}
                      to help you manage your procurement processes efficiently
                      and effectively, so you can focus on
                      growing your business.
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <button
                      onClick={() => setOpen(false)}
                      className='mb-4  mt-6 rounded-full border border-gray-500   from-[#5c67f5] to-[#cb67ac]  bg-clip-text p-2 pl-3 font-sans duration-500 hover:bg-gradient-to-tr   hover:text-black hover:text-transparent   focus:outline-none md:mx-2  lg:mx-10 xl:pr-3 '
                    >
                      Show less
                    </button>
                  </div>
                </>
              ) : (
                <div className='flex justify-center'>
                  {/* <button className='inline-flex    rounded-md  bg-gradient-to-t from-violet-700 to-[#cb67ac]  px-4 py-2 text-lg text-white shadow-lg shadow-indigo-400 hover:scale-105 focus:outline-none'>
                Know More...
              </button> */}

                  <button
                    onClick={() => setOpen(true)}
                    className='mb-4 mt-6 flex rounded-full border border-gray-500   from-[#5c67f5] to-[#cb67ac]  bg-clip-text p-2 pl-3 font-sans duration-500 hover:bg-gradient-to-tr   hover:text-black hover:text-transparent   focus:outline-none md:mx-2  lg:mx-10 xl:pr-3 '
                  >
                    Know More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
