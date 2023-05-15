import React, { useEffect, useState } from 'react';

// import heroImag from '../../assets/hero.png';
// import heroBgVd from '../../assets/heroVideo.mp4';
import {
  AiOutlinePlayCircle,
  // AiOutlineArrowLeft,
  // AiOutlineHome,
} from 'react-icons/ai';

import AOS from 'aos';
import 'aos/dist/aos.css';
// import ModalVideo from '../Dashboard/Admin/pages/Modals/ModalVideo';

const Hero = ({ setShowMyModal }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  // const [player, setPlayer] = useState(true);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const togglePlayer = () => {
  //   setPlayer(!player);
  //   console.log(player);
  // };

  // const [showMyModal, setShowMyModal] = useState(false);

  // const handleOnClose = () => setShowMyModal(false);

  return (
    <div id='hero' className='bg-[#5c67f5]'>
      <section
        className={` container relative mx-auto h-[95vh] min-h-[700px] md:h-screen`}
      >
        <div className='container mx-auto flex h-full  flex-col-reverse  items-center  justify-center pl-5 md:flex-row  '>
          <div
            data-aos='fade-up'
            data-aos-delay='0'
            data-aos-duration='1500'
            className='flex flex-col  md:w-1/2 lg:flex-grow   '
          >
            <div className='md:pr-16 lg:pr-24 '>
              <span className='relative whitespace-nowrap '>
                <h1 className=' group-hover:animate-type-reverse text-brand-accent  inline-flex h-20 animate-type overflow-x-hidden  whitespace-nowrap pb-2 pt-2  text-3xl font-medium text-white will-change-transform sm:text-4xl  lg:text-5xl '>
                  Leading Procurement
                </h1>
                <span className='-mb-2  box-border inline-block h-10 w-1 animate-cursor bg-white will-change-transform md:-mb-4 md:h-16'></span>
              </span>
              <div className='relative h-20 whitespace-nowrap '>
                {showComponent && (
                  <h1 className=' group-hover:animate-type-reverse text-brand-accent  inline-flex h-20 animate-type-second overflow-x-hidden  whitespace-nowrap   text-3xl font-medium text-white will-change-transform sm:text-4xl  lg:text-5xl'>
                    Management Expert
                  </h1>
                )}
                <span className='-mb-2  -ml-1  box-border inline-block h-10 w-1 animate-cursor bg-white will-change-transform md:-mb-4 md:h-16'></span>
              </div>
            </div>

            <span className='mb-8  text-left text-xl italic leading-relaxed text-white lg:text-2xl '>
              Working closely with top architects and developers, We raise the
              bar for{' '}
              <span className='  font-medium underline underline-offset-4 hover:text-yellow-300'>
                Quality
              </span>{' '}
              and{' '}
              <span className='font-medium underline underline-offset-4 hover:text-yellow-300'>
                Perfection.
              </span>
            </span>
            <div className='flex justify-start '>
              <button className='border-1 inline-flex rounded-full bg-[#F170D5]  from-[#5c67f5] to-[#cb67ac] px-4 py-2.5  font-medium text-white hover:border hover:border-white hover:bg-gradient-to-tr focus:outline-none  md:px-5 lg:text-xl'>
                <a href={'#about'}>Get Started</a>
              </button>

              <div
                className=' mx-10 flex rounded-full border   py-2  hover:text-black  focus:outline-none md:mx-2   lg:mx-10'
                onClick={() => {
                  setShowMyModal(true);
                }}
              >
                <AiOutlinePlayCircle
                  className='mx-2  my-auto ml-2 animate-pulse text-white '
                  size={'30px'}
                />
                <button className=' from-[#5c67f5] to-[#cb67ac] bg-clip-text   pr-2 font-sans  text-white duration-500 hover:bg-gradient-to-tl hover:text-transparent md:pr-2 lg:pr-3 xl:pr-3  '>
                  Watch Video
                </button>
                {/* {player ? (
                  <AiOutlinePlayCircle
                    className='mx-2  my-auto ml-2 animate-pulse text-white '
                    size={'30px'}
                  />
                ) : (
                  <AiOutlineArrowLeft
                    className='mx-2  my-auto animate-pulse text-white '
                    size={'25px'}
                  />
                )}

                {player ? (
                  <button className=' from-blue-200 to-pink-500 bg-clip-text   pr-2 font-sans  text-white duration-500 hover:bg-gradient-to-tl hover:text-transparent md:pr-1 xl:pr-3  '>
                    Watch Video
                  </button>
                ) : (
                  <button className=' mr-3   from-blue-200 to-pink-500 bg-clip-text font-sans text-white duration-500 hover:bg-gradient-to-tl hover:text-transparent xl:px-2  '>
                    <AiOutlineHome
                      className='my-auto  text-white '
                      size={'25px'}
                    />
                  </button>
                )} */}
              </div>
            </div>
          </div>
          <div
            data-aos='fade-down'
            data-aos-delay='0'
            data-aos-duration='1500'
            className=' md:w-1/2 pb-10'
          >
            <img
              className='    rounded object-cover object-center lg:w-full lg:max-w-lg  '
              alt='hero'
              src='https://test-saboo-rks.s3.ap-south-1.amazonaws.com/hero.png'
            />
            {/* {player ? (
              <img
                className='    rounded object-cover object-center lg:w-full lg:max-w-lg  '
                alt='hero'
                src='https://test-saboo-rks.s3.ap-south-1.amazonaws.com/heroImag.png'
              />
            ) : (
              <div className='overflow-hidden    border'>
                <video
                  autoPlay
                  muted
                  loop
                  style={{
                    top: 0,
                    left: 0,
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                  }}
                >
                  <source
                    src='https://test-saboo-rks.s3.ap-south-1.amazonaws.com/heroVideo.mp4'
                    type='video/mp4'
                  />
                </video>
              </div>
            )} */}
          </div>
        </div>
        <div className='absolute bottom-10 left-1/2 -ml-4 hidden md:block '>
          {/* <div className='flex h-14 w-8 animate-pulse   items-end justify-center rounded-full border '>
            <div>
              <div className='mb-1 h-4 w-1 animate-bounce rounded-full border-2 bg-white '></div>
            </div>
          </div> */}
           <a href='#about'>

          <div className='mt-1 flex animate-bounce justify-center '>
            <div className='h-4 w-4  rotate-45 border-b-2 border-r-2'></div>
          </div>
           </a>
        </div>
        {/* <div className='absolute bottom-10 left-1/2 -ml-4 hidden md:block '>
          <div className='flex h-14 w-8 animate-pulse   items-end justify-center rounded-full border '>
            <div>
              <div className='mb-1 h-4 w-1 animate-bounce rounded-full border-2 bg-white '></div>
            </div>
          </div>
          <div className='mt-1 flex animate-bounce justify-center '>
            <div className='h-4 w-4  rotate-45 border-b-2 border-r-2'></div>
          </div>
        </div> */}
        {/* <ModalVideo onClose={handleOnClose} visible={showMyModal} /> */}
      </section>
    </div>
  );
};

export default Hero;
