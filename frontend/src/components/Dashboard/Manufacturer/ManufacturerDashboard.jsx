import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { TfiShoppingCartFull } from 'react-icons/tfi';
// import {CgProfile} from "react-icons/cg"
import { FaHome } from 'react-icons/fa';

import MainContentManufac from './MainContentManufac';

const manufactureLinks = [
  {
    Head: 'DASHBOARD',
    subLinks: [
      { name: 'Home Page', link: '/manufacturer', logo: [<FaHome />] },
    ],
  },

  {
    Head: 'ACTION',
    subLinks: [
      { name: 'Add Product', link: '/manufacturer', logo: [<BsCartPlus />] },
      {
        name: 'View All Products',
        link: '/manufacturer',
        logo: [<TfiShoppingCartFull />],
      },
      // { name: 'Edit Product', link: '/manufacturer' },
    ],
  },
  // {
  //   Head: 'PROFILE',
  //   subLinks: [
  //     { name: 'View Profile', link: '/manufacturer',logo: [<CgProfile />] },
  //   ],
  // },
];

const ManufacturerDashboard = () => {
  const [open, setOpen] = useState(true);
  const [profile, setProfile] = useState('');
  const [inputValue, setInputValue] = useState('Home Page');

  return (
    <>
      <div className=' flex w-full '>
        {open && (
          <div className='w-1/2 duration-1000  ease-linear md:w-1/4 '>
            <Sidebar links={manufactureLinks} setInputValue={setInputValue} />
          </div>
        )}
        <div className='flex w-full flex-col'>
        <div className=' mx-2 mt-1 flex items-center  justify-between rounded-xl border px-10 py-4 shadow-md '>
            <div className='text-3xl' onClick={() => setOpen(!open)}>
              {open ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            </div>
            <div className='flex items-center'>
              {profile && <div className='text-xl font-semibold uppercase'>{profile} - </div>}
              <div className='text-md pl-2'>Manufacturer Dashborad</div>
            </div>
          </div>
          <div className='  m-2 h-full px-10'>
            <MainContentManufac selectedItem={inputValue} setProfile={setProfile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufacturerDashboard;
