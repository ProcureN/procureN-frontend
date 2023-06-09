import React, { useEffect, useState } from 'react';
import {
  // AiOutlineMenu,
  AiOutlineFileSearch,
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import SidePanel from '../SidePanel';
import Management from './pages/Management';
import ProductsManagement from './pages/ProductsManagement';
import HomePage from './pages/HomePage';
import VendorManagement from './pages/VendorManagement';
import VendorEnquiries from './pages/VendorEnquiries';
import { FaHome, FaHandsHelping } from 'react-icons/fa';
// import Test from './pages/Test';

const Admin = () => {
  const AdminLinks = [
    {
      Head: 'DASHBOARD',
      subLinks: [{ name: 'Home Page', logo: [<FaHome />] }],
    },

    {
      Head: 'ACTION',
      subLinks: [
        {
          name: 'Vendor Enquiries',
          logo: [<FaHandsHelping />],
        },
        {
          name: 'Management',
          logo: [<AiOutlineFileSearch />],
        },
        {
          name: 'Product Management',
          logo: [<AiOutlineShoppingCart />],
        },
      ],
    },
    {
      Head: 'USERS',
      subLinks: [
        {
          name: 'Vendor Management',
          logo: [<AiOutlineUsergroupAdd />],
        },
      ],
    },
  ];

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

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Home Page');

  return (
    <div className='flex  '>
      <SidePanel
        open={open}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setOpen={setOpen}
        links={AdminLinks}
      />

      <div className=' font-roboto h-screen flex-auto '>
        {/* <div className='mx-1 my-2 flex h-16 items-center justify-between rounded-md border-b-2  bg-white p-4 duration-1000 md:mx-2 xl:h-20'>
         
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
          <div className='font-mono text-2xl'>Admin</div>
        </div> */}
        <div className='mx-1 h-[80vh]    md:mx-2 '>
          {selectedItem === 'Home Page' ? (
            <HomePage open={open} setOpen={setOpen} />
          ) : selectedItem === 'Vendor Enquiries' ? (
            <VendorEnquiries open={open} setOpen={setOpen} />
          ) : selectedItem === 'Management' ? (
            <Management open={open} setOpen={setOpen} />
          ) : selectedItem === 'Product Management' ? (
            <ProductsManagement open={open} setOpen={setOpen} />
          ) : (
            selectedItem === 'Vendor Management' && <VendorManagement open={open} setOpen={setOpen} />
          )}
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
