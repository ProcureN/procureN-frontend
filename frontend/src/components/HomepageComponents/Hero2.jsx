import React, { useEffect } from 'react';

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

const Hero2 = ({ setShowMyModal }) => {
  useEffect(() => {
    AOS.init({once: true});
  }, []);

  // const [player, setPlayer] = useState(true);
  // const [showComponent, setShowComponent] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowComponent(true);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  // const togglePlayer = () => {
  //   setPlayer(!player);
  //   console.log(player);
  // };

  // const [showMyModal, setShowMyModal] = useState(false);

  // const handleOnClose = () => setShowMyModal(false);

  return (
    <div id='hero' className=''>
      {/* <div id='hero' className='bg-gradient-to-tr   from-[#5c67f5] via-[#5c67f5] to-[#cb67ac]'> */}
      <section
        className={` container relative mx-auto h-[95vh] min-h-[700px] md:h-screen`}
      >
        <div className='container mx-auto flex h-full  flex-col-reverse  items-center  justify-center pl-5 md:flex-row  '>
          <div
            data-aos='fade-up'
            data-aos-delay='0'
            data-aos-duration='1500'
            className='flex flex-col  md:w-1/2 lg:flex-grow  '
          >
            {/* <div className='md:pr-16 lg:mb-4 lg:pr-24'>
              <div className='   inline-flex   overflow-x-hidden   pb-2 pt-2  text-3xl font-medium  text-[#5c67f5] sm:text-4xl lg:text-5xl '>
                Leading Procurement
              </div>

              <div className='      overflow-x-hidden    text-3xl font-medium  text-[#5c67f5]  sm:text-4xl lg:text-5xl'>
                Management Expert
              </div>
            </div> */}
            <div className='font-serif  bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text -tracking-tight text-transparent '>
              <div className='text-3xl font-medium  leading-10 sm:text-4xl lg:text-5xl xl:pb-6'>
                Leading Procurement
              </div>
              <div className='text-3xl font-medium h-12 xl:h-16 sm:text-4xl lg:text-5xl '>
                Management Expert
              </div>
            </div>

            <div className='flex justify-around pt-5 md:justify-start lg:pt-8'>
              <button className='border-1 inline-flex rounded-full  from-[#5c67f5] to-[#cb67ac] px-4 py-3  font-medium text-white  bg-gradient-to-tr focus:outline-none  md:px-5 lg:text-xl'>
                <a href={'#about'}>Get Started</a>
              </button>

              <div
                className='  flex rounded-full border   py-2  hover:text-black  focus:outline-none md:mx-2   lg:mx-10'
                onClick={() => {
                  setShowMyModal(true);
                }}
              >
                <AiOutlinePlayCircle
                  className='mx-2 my-auto ml-2  text-[#5c67f5]  '
                  size={'30px'}
                />
                <button className=' from-[#5c67f5] to-[#cb67ac] bg-clip-text   pr-2 font-sans  text-[#5c67f5]  duration-500 hover:bg-gradient-to-tl hover:text-transparent md:pr-2 lg:pr-3 xl:pr-3  '>
                  Watch Video
                </button>
              </div>
            </div>
          </div>
          <div
            data-aos='fade-down'
            data-aos-delay='0'
            data-aos-duration='1500'
            className=' flex justify-center pb-10 md:w-1/2'
          >
            <img
              className='    rounded object-cover object-center lg:w-full lg:max-w-lg  '
              alt='hero'
              src={require('../../assets/construction.png')}
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
              <div className='h-4 w-4  rotate-45 border-b-2 border-r-2 border-[#5c67f5]'></div>
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

export default Hero2;
