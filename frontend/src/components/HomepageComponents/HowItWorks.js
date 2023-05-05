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
      className='container mx-auto mt-4 overflow-hidden md:p-4 lg:p-10 xl:p-16'
    >
      <img src={howItWorks} alt='How ProcureN works' srcSet='' className='' />
    </div>
  );
};

export default HowItWorks;
