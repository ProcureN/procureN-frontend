import { useState } from 'react';
import ModalVideo from '../components/Dashboard/Admin/pages/Modals/ModalVideo';
import About from '../components/HomepageComponents/About';
import Footer from '../components/HomepageComponents/Footer';

import Frequently from '../components/HomepageComponents/Frequently';
// import Header from '../components/HomepageComponents/Header';
// import Hero from '../components/HomepageComponents/Hero';
import HowItWorks from '../components/HomepageComponents/HowItWorks';

import Proposel from '../components/HomepageComponents/Proposel';
import Services from '../components/HomepageComponents/Services';

import ModalTrack from '../components/Dashboard/Admin/pages/Modals/ModalTrack';
import Tracking from '../components/HomepageComponents/Tracking';
import Inventory from '../components/HomepageComponents/Inventory';

// import Hero from '../components/HomepageComponents/Hero';
import Hero2 from '../components/HomepageComponents/Hero2';
import Header2 from '../components/HomepageComponents/Header2';

const Main = () => {
  const [showMyModal, setShowMyModal] = useState(false);
  const [showMyModal2, setShowMyModal2] = useState(false);

  const handleOnClose = () => setShowMyModal(false);
  const handleOnClose2 = () => setShowMyModal2(false);

  return (
    <div className='overflow-hidden'>
      <Header2 setShowMyModal={setShowMyModal} />
      <Hero2 setShowMyModal={setShowMyModal} />
      <About />
      <Services />

      {/* <Track setShowMyModal2={setShowMyModal2} /> */}
      <Tracking setShowMyModal2={setShowMyModal2} />
      <HowItWorks />
      <Inventory />
      <Frequently />
      <Proposel />

      <Footer />
      <ModalVideo onClose={handleOnClose} visible={showMyModal} />
      <ModalTrack onClose={handleOnClose2} visible={showMyModal2} />
    </div>
  );
};

export default Main;
