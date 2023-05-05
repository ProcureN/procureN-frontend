import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineFileSearch,
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { FaHome, FaHandsHelping } from 'react-icons/fa';

// import { MdPrecisionManufacturing } from 'react-icons/md';
// import { BsShop } from 'react-icons/bs';

import MainContent from './MainContent';

const AdminLinks = [
  {
    Head: 'DASHBOARD',
    subLinks: [{ name: 'Home Page', link: '/admin', logo: [<FaHome />] }],
  },

  {
    Head: 'ACTION',
    subLinks: [
      {
        name: 'Vendor Enquiries',
        link: '/admin',
        logo: [<FaHandsHelping />],
      },
      {
        name: 'Management',
        link: '/admin',
        logo: [<AiOutlineFileSearch />],
      },
      // { name: 'Manage Retailer', link: '/admin', logo: [<BsShop />] },
      // {
      //   name: 'Manage Manufacturer',
      //   link: '/admin',
      //   logo: [<MdPrecisionManufacturing />],
      // },

      {
        name: 'Product Management',
        link: '/admin',
        logo: [<AiOutlineShoppingCart />],
      },
    ],
  },
  {
    Head: 'USERS',
    subLinks: [
      {
        name: 'Vendor Management',
        link: '/admin',
        logo: [<AiOutlineUsergroupAdd />],
      },
    ],
  },
];

const Admin = () => {
  const [open, setOpen] = useState(true);

  const [inputValue, setInputValue] = useState('Home Page');

  return (
    <div className=' flex w-full '>
      {open && (
        <div className=' duration-1000 ease-linear '>
          <Sidebar links={AdminLinks} setInputValue={setInputValue} />
        </div>
      )}
      <div className='flex w-full flex-col'>
        <div className=' mx-2 mt-1 flex items-center  justify-between rounded-xl border px-10 py-4 shadow-md '>
          <div className='text-3xl' onClick={() => setOpen(!open)}>
            {open ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          </div>
          <div className='text-2xl'>Admin Dashboard</div>
        </div>
        <div className='   mx-1 h-full px-4'>
          <MainContent selectedItem={inputValue} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
