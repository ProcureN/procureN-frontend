import React, { useState } from 'react';
import {
  AiOutlineFileAdd,
} from 'react-icons/ai';

import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
// import { CgProfile } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';

import SidePanel from '../SidePanel';
import Enquiry from './pages/Enquiry';
import HomePage from './pages/HomePage';
import MyOrder from './pages/MyOrder';

const retailersLinks = [
  {
    Head: 'DASHBOARD',
    subLinks: [{ name: 'Home Page', logo: [<FaHome />] }],
  },

  {
    Head: 'ACTION',
    subLinks: [
      { name: 'Send Enquiry', logo: [<AiOutlineFileAdd />] },
      {
        name: 'All Enquiries',
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
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Home Page');


  return (
    <>
      <div className=' flex  '>
        <SidePanel
          open={open}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setOpen={setOpen}
          links={retailersLinks}
        />

        <div className=' font-roboto h-screen flex-auto '>
          <div className='mx-1 h-[80vh]    md:mx-2 '>
            {selectedItem === 'Home Page' ? (
              <HomePage open={open} setOpen={setOpen} />
            ) : selectedItem === 'Send Enquiry' ? (
              <Enquiry open={open} setOpen={setOpen} />
            ) : (
              selectedItem === 'All Enquiries' && (
                <MyOrder open={open} setOpen={setOpen} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
