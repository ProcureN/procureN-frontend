import React, { useEffect } from 'react';
import howItWorks from '../../assets/Infographic.png';

import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      data-aos='fade-up'
      data-aos-delay='0'
      data-aos-duration='1000'
      className='container mx-auto  overflow-hidden md:px-4 md:pb-4  lg:px-10 xl:px-16'
    >
      <img src={howItWorks} alt='How ProcureN works' srcSet='' className='' />
    </div>
  );
};

export default HowItWorks;
