import React, { useEffect, useState } from 'react';
import {
  // AiOutlineMenu,
  AiOutlineFileSearch,
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import SidePanel from '../SidePanel';
// import Management from './pages/Management';
// import ProductsManagement from './pages/ProductsManagement';
import HomePage from './pages/HomePage';
// import VendorManagement from './pages/VendorManagement';
import VendorEnquiries from './pages/VendorEnquiries';
import {  FaUsers } from 'react-icons/fa';
// import {  FaUsers,FaHome } from 'react-icons/fa';
// import { FaHome, FaHandsHelping, FaUsers } from 'react-icons/fa';
import OrderMan from './pages/OrderMan';
import VendorMan from './pages/VendorMan';
import ClientDetails from './pages/ClientDetails';
import VendorDetails from './pages/VendorDetails';

// import Test from './pages/Test';

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Order Management');
  // const [selectedItem, setSelectedItem] = useState('Home Page');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) {
      window.location.href = '/login';
      return;
    } else if (role !== 'admin') {
      window.location.href = '/login';
      return;
    }
  }, []);

  const AdminLinks = [
    

    {
      Head: 'ACTION',
      subLinks: [
        // {
        //   name: 'Home Enquiries',
        //   logo: [<FaHandsHelping />],
        // },
        {
          name: 'Order Management',
          logo: [<AiOutlineFileSearch />],
        },
        {
          name: 'Vendor Management',
          logo: [<AiOutlineShoppingCart />],
        },
      ],
    },
    {
      Head: 'USERS',
      subLinks: [
        // {
        //   name: 'Order Management',
        //   logo: [<AiOutlineUsergroupAdd />],
        // },
        {
          name: 'Client Details',
          logo: [<FaUsers />],
        },
        {
          name: 'Vendor Details',
          logo: [<AiOutlineUsergroupAdd />],
        },
      ],
    },
    // {
    //   Head: 'DASHBOARD',
    //   subLinks: [{ name: 'Home Page', logo: [<FaHome />] }],
    // },
  ];
  // const AdminLinks = [
  //   {
  //     Head: 'DASHBOARD',
  //     subLinks: [{ name: 'Home Page', logo: [<FaHome />] }],
  //   },

  //   {
  //     Head: 'ACTION',
  //     subLinks: [
  //       {
  //         name: 'Home Enquiries',
  //         logo: [<FaHandsHelping />],
  //       },
  //       {
  //         name: 'Order Manage',
  //         logo: [<AiOutlineFileSearch />],
  //       },
  //       {
  //         name: 'Vendor Manage',
  //         logo: [<AiOutlineShoppingCart />],
  //       },
  //     ],
  //   },
  //   {
  //     Head: 'USERS',
  //     subLinks: [
  //       {
  //         name: 'Order Management',
  //         logo: [<AiOutlineUsergroupAdd />],
  //       },
  //       {
  //         name: 'Vendor Management',
  //         logo: [<AiOutlineUsergroupAdd />],
  //       },
  //     ],
  //   },
  // ];


  return (
    <div className='flex  '>
      <SidePanel
        open={open}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setOpen={setOpen}
        links={AdminLinks}
      />

      <div className=' font-roboto h-screen  w-[92%] mx-auto '>
        <div className='h-[80vh] lg:h-[90vh]     '>
          {selectedItem === 'Home Page' ? (
            <HomePage open={open} setOpen={setOpen} />
          ) : selectedItem === 'Home Enquiries' ? (
            <VendorEnquiries open={open} setOpen={setOpen} />
          ) : selectedItem === 'Order Management' ? (
            <OrderMan open={open} setOpen={setOpen} />
          ) : selectedItem === 'Vendor Management' ? (
            <VendorMan open={open} setOpen={setOpen} />
          ) : selectedItem === 'Client Details' ? (
            <ClientDetails open={open} setOpen={setOpen} />
          ) : (
            selectedItem === 'Vendor Details' && (
              <VendorDetails open={open} setOpen={setOpen} />
            )
          )}
          {/* {selectedItem === 'Home Page' ? (
            <HomePage open={open} setOpen={setOpen} />
          ) : selectedItem === 'Home Enquiries' ? (
            <VendorEnquiries open={open} setOpen={setOpen} />
          ) : selectedItem === 'Order Manage' ? (
            <Management open={open} setOpen={setOpen} />
          ) : selectedItem === 'Vendor Manage' ? (
            <ProductsManagement open={open} setOpen={setOpen} />
          ) : selectedItem === 'Order Management' ? (
            <OrderMan open={open} setOpen={setOpen} />
          ) : (
            selectedItem === 'Vendor Management' && (
              <VendorManagement open={open} setOpen={setOpen} />
            )
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Admin;

// useEffect(() => {
//   const timeout = setTimeout(() => {
//     alert('Hello after 24 hours!');
//   }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

//   return () => {
//     clearTimeout(timeout); // Clear the timeout if the component unmounts before 24 hours
//   };
// }, []);

//   import { useFirebase } from '../../context/Firebase';
// import { signOut } from 'firebase/auth';

// useEffect(() => {
//   const timeout = setTimeout(() => {
//     signOut(Firebase.auth)
//       .then(() => {
//         // Sign-out successful
//         console.log('User signed out after 24 hours');
//       })
//       .catch((error) => {
//         // An error happened
//         console.log('Error signing out:', error);
//       });
//   }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

//   return () => {
//     clearTimeout(timeout); // Clear the timeout if the component unmounts before 24 hours
//   };
// }, [Firebase.auth]);
