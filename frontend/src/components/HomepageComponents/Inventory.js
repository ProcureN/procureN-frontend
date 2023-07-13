import React, { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import giPipes4_15 from '../../assets/4-15MM DIA GI PIPE.jpg';
import giElbow3_15 from '../../assets/3-15MM DIA GI ELBOW copy.jpg';
import hdpe60mm from '../../assets/6-HDPE 60MM DIA copy.jpg';
import hdpe20mm from '../../assets/5-HDPE 20MM DIA copy.jpg';
import brassCock1_15 from '../../assets/1-15MM DIA BRASS COCK copy.jpg';
import giCoupler2_15 from '../../assets/2-15MM DIA GI COUPLER copy.jpg';

// import required modules
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper';

const allProducts = [
  { image: giPipes4_15, desciption: '15mm DIA GI Pipes' },
  { image: giElbow3_15, desciption: '15mm DIA GI Elbow' },
  { image: hdpe60mm, desciption: 'HDPE 60mm DIA' },
  { image: hdpe20mm, desciption: 'HDPE 20mm DIA' },
  { image: brassCock1_15, desciption: '15mm DIA Brass Cock' },
  { image: giCoupler2_15, desciption: '15mm DIA GI Coupler' },
];

const Inventory = () => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [slide, setSlide] = useState(1);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 400) setSlide(1);
    else if (screenSize <= 900) setSlide(2);
    else if (screenSize <= 1300) setSlide(3);
    else setSlide(3);
  }, [screenSize]);

  return (
    <>
      <div
        className='container mx-auto -mt-12 md:-mt-24 px-5 pt-20 md:pt-24'
        id='inventory'
      >
        <div className=' flex w-full flex-col text-center'>
          <h1 className='title-font mb-2 text-3xl  font-medium uppercase text-[#5c67f5] sm:text-4xl'>
            OUR INVENTORY
          </h1>
          {/* <div className='flex w-full flex-col items-center'>
            <div className='h-[1px] w-1/2 bg-indigo-800 '></div>
            <div className=' -mt-0.5 h-1 w-28 rounded-full bg-indigo-600 '></div>
          </div> */}
        </div>
        <div>
          <Swiper
            slidesPerView={slide}
            spaceBetween={25}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            // navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay, Navigation, FreeMode]}
            className='mySwiper '
          >
            {allProducts.map((items, i) => (
              <div className='container  ' key={i}>
                <SwiperSlide key={i + 1}>
                <div className='h-4 md:h-8 '></div>
                  <div
                    key={i + 1}
                    className='flex flex-col hover:scale-110 group bg-white  duration-300 items-center  rounded-lg border-2 text-center text-lg '
                  >
                    <div key={i + 1} >
                      <img
                        src={items.image}
                        alt={items.desciption}
                        srcSet=''
                        className='w-56 '
                      />
                    </div>
                    <hr />
                    <div className='w-full border-t py-4  bg-gradient-to-bl from-[#5c67f5] to-[#cb67ac] bg-clip-text font-semibold text-transparent  '>
                      {items.desciption}
                    </div>
                  </div>
                  <div className='h-8 lg:h-12'></div>
                </SwiperSlide>
                ;
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Inventory;
