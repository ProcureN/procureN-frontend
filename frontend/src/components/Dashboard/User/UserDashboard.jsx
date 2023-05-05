import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineFileAdd,
} from 'react-icons/ai';

import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
// import { CgProfile } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';

import MainContentUser from './MainContentUser';

const manufactureLinks = [
  {
    Head: 'DASHBOARD',
    subLinks: [{ name: 'Home Page', link: '/retailer', logo: [<FaHome />] }],
  },

  {
    Head: 'ACTION',
    subLinks: [
      { name: 'Send Enquiry', link: '/retailer', logo: [<AiOutlineFileAdd />] },
      {
        name: 'All Enquiries',
        link: '/retailer',
        logo: [<HiOutlineDocumentDuplicate />],
      },
    ],
  },
  // {
  //   Head: 'PROFILE',
  //   subLinks: [
  //     { name: 'View Profile', link: '/retailer', logo: [<CgProfile />]},
  //   ],
  // },
];

const UserDashboard = () => {
  const [open, setOpen] = useState(true);
  const [profile, setProfile] = useState('');
  const [inputValue, setInputValue] = useState('Home Page');

  return (
    <>
      <div className=' flex '>
        {open && (
          <div className='  duration-1000 ease-linear'>
            <Sidebar links={manufactureLinks} setInputValue={setInputValue} />
          </div>
        )}
        <div className='flex w-full flex-col'>
          <div className=' m-2 flex items-center justify-between  rounded-xl bg-gradient-to-tr from-blue-500 to-pink-200 px-10 py-4 shadow-md '>
            <div className='text-3xl' onClick={() => setOpen(!open)}>
              {open ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            </div>
            <div className='flex items-center'>
              {profile && (
                <div className='text-xl font-semibold uppercase'>
                  {profile} -{' '}
                </div>
              )}
              <div className='text-xl pl-2'>User Dashborad</div>
            </div>
          </div>
          <div className='   mt-2 h-full px-5'>
            <MainContentUser
              selectedItem={inputValue}
              setProfile={setProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
