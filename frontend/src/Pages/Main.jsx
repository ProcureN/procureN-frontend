import { useEffect, useState } from 'react';
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  const [showMyModal, setShowMyModal] = useState(false);
  const [showMyModal2, setShowMyModal2] = useState(false);

  const [formSub, setFormSub] = useState(false);

  const handleOnClose = () => setShowMyModal(false);
  const handleOnClose2 = () => setShowMyModal2(false);

  const notify = () =>
    toast.success(
      'Form submitted successfully. Our team will contact you soon',
      {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      }
    );

  useEffect(() => {
    if (formSub) {
      notify();
      setFormSub(false);
    }
  }, [formSub]);

  const changcolor = () => {
    if (window.scrollY >= 150) {
      setShowMyModal(false);
    }
  };

  window.addEventListener('scroll', changcolor);

  return (
    <div className='overflow-hidden'>
      <Header2  />
      <Hero2 setShowMyModal={setShowMyModal} />
      <About />
      <Services />

      {/* <Track setShowMyModal2={setShowMyModal2} /> */}
      <Tracking setShowMyModal2={setShowMyModal2} />
      <HowItWorks />
      <Inventory />
      <Frequently />
      <Proposel setFormSub={setFormSub} />

      <Footer />
      <ModalVideo onClose={handleOnClose} visible={showMyModal} />
      <ModalTrack onClose={handleOnClose2} visible={showMyModal2} />
      <ToastContainer />
    </div>
  );
};

export default Main;
