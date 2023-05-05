// import React from 'react';

// function MainContent({ selectedItem }) {
//   return (
//     <div>
//       {/* {selectedItem === 'Home Page' && <HomePage />} */}
// hiii
//     </div>
//   );
// }

// export default MainContentManufac;
import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import Enquiry from './pages/Enquiry';
import MyOrder from './pages/MyOrder';
// import ViewProfile from './pages/ViewProfile';

const MainContentUser = ({ selectedItem, setProfile }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) {
      window.location.href = '/login';
      return;
    } else if (role !== 'Retailer') {
      window.location.href = '/login';
      return;
    }
  }, []);
  return (
    <div>
      {selectedItem === 'Home Page' ? (
        <HomePage setProfile={setProfile} />
      ) : selectedItem === 'Send Enquiry' ? (
        <Enquiry />
      ) : selectedItem === 'All Enquiries'&& (
        <MyOrder />
      // ) : (
      //   selectedItem === 'View Profile' && <ViewProfile />
      )}
    </div>
  );
};

export default MainContentUser;
