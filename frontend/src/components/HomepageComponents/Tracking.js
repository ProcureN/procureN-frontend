import React from 'react';






const Tracking = ({ setShowMyModal2 }) => {
  

  return (
    <div id='track'>
      <section className=' body-font     mx-auto -mt-10 overflow-hidden pb-12 pt-20  md:pt-24'>
        <section className=' mx-auto  -mt-10 bg-opacity-80 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] text-white  '>
          <div className=' container mx-auto  px-0 py-14'>
            <div className='mx-auto flex flex-col items-start justify-between sm:flex-row sm:items-center lg:w-2/3'>
              <div>
                <h1 className='title-font flex-grow px-8 text-2xl font-medium sm:pr-16 '>
                  Track Your Order
                </h1>
                <h1 className='text-md title-font mt-2 flex-grow px-8 sm:pr-16'>
                  Track the order and stay updated on your product's status.
                </h1>
              </div>
              <div className='m-6'>
                <button
                  onClick={() => {
                    setShowMyModal2(true);
                  }}
                  className='inline-flex rounded-full border-2 border-[#5c67f5]  bg-white from-[#5c67f5] to-[#cb67ac]  px-6 py-2 text-xl text-[#5c67f5]  duration-1000 hover:border-white  hover:bg-gradient-to-tr hover:text-white focus:outline-none'
                >
                  Track
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Tracking;
