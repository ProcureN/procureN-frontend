import React, { useEffect, useState } from 'react';
import faq from '../../assets/faq.png';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Frequently = () => {
  const items = [
    {
      title: '01. How does ProcureN work?',
      content:
        'ProcureN manages the entire supply needs of a construction contractor from developing detailed bill of materials to ordering to delivery at site.',
    },
    {
      title: '02. What is logistics?',
      content: `Logistics Management is that part of Supply Chain Management that plans, implements, and controls the efficient, effective forward and reverse flow and storage of goods, services and related information between the point of origin and the point of consumption in order to meet customers' requirements.`,
    },
    {
      title: '03. What is Supply Chain Management?',
      content:
        'Supply Chain Management encompasses the planning and management of all activities involved in sourcing and procurement, conversion, and all logistics management activities. Importantly, it also includes coordination and collaboration with channel partners, which can be suppliers, intermediaries, third party service providers, and customers.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    AOS.init({once: true});
  }, []);

  return (
    <div>
      <section className='  container  mx-auto -mt-12 px-2'>
        <div
          className={`container mx-auto flex   flex-wrap pt-20 ${
            activeIndex && 'md:pb-36 lg:pb-32 2xl:pb-0 '
          }`}
        >
          <div
            data-aos='fade-up'
            data-aos-delay='0'
            data-aos-duration='1000'
            className='text-center mb-6'
          >
            <h1 className='title-font mb-6 text-3xl  font-medium uppercase text-[#5c67f5] sm:text-4xl'>
              Frequently Asked Questions
            </h1>
            {/* <div className='flex w-full flex-col items-center'>
              <div className='h-[1px] w-1/2 bg-indigo-800 '></div>
              <div className='-mt-0.5 mb-2 h-1 w-28 rounded-full bg-indigo-600 '></div>
            </div> */}
            <span className=''>
              This list of frequently asked questions (FAQs) was developed to
              briefly address any questions you may still have about the
              business with ProcureN. If you do not see your question below,
              contact us at{' '}
              <i>
                <a className='text-[#5c67f5] ' href='mailto:info@procuren.in'>
                  info@procuren.in
                </a>
              </i>
            </span>
          </div>
          <div className='grid  grid-cols-1 lg:grid-cols-3 '>
            <div
              className='grid grid-cols-1 lg:col-span-2 lg:h-8 '
              data-aos='fade-right'
              data-aos-delay='0'
              data-aos-duration='1000'
            >
              <div
                className={`divide-y divide-gray-800 rounded-md  border `}
              >
                {items.map((item, index) => (
                  <div key={index} className='px-4 py-4'>
                    <div
                      className='flex cursor-pointer items-center justify-between  rounded-xl p-2'
                      onClick={() => handleItemClick(index)}
                    >
                      <h2 className='m-1 text-md md:text-lg lg:m-2 lg:text-xl'>
                        {item.title}
                      </h2>
                      <svg
                        className={`h-5 w-5 ${
                          activeIndex === index ? 'rotate-180 transform' : ''
                        }`}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z'
                        />
                      </svg>
                    </div>
                    {activeIndex === index && (
                      <div className='mt-4 border-t-2 px-3 py-1 text lg:text-md '>
                        <p >{item.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              data-aos='fade-left'
              data-aos-delay='0'
              data-aos-duration='1000'
              // className=' scale-50'
            >
              <img src={faq} alt='FAQs'  />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frequently;

//className="sm:w-1/2 lg:w-2/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
