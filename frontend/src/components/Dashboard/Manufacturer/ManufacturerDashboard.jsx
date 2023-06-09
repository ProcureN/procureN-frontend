import React, { useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { TfiShoppingCartFull } from 'react-icons/tfi';
import { FaHome } from 'react-icons/fa';
import AddProduct from './pages/AddProduct';
import ViewAllProducts from './pages/ViewAllProducts';

import SidePanel from '../SidePanel';
import HomeManufacture from './pages/HomeManufacture2';


const manufactureLinks = [
  {
    Head: 'DASHBOARD',
    subLinks: [{ name: 'Home Page', logo: [<FaHome />] }],
  },

  {
    Head: 'ACTION',
    subLinks: [
      { name: 'Add Product', logo: [<BsCartPlus />] },
      {
        name: 'View All Products',

        logo: [<TfiShoppingCartFull />],
      },
      // { name: 'Edit Product', link: '/manufacturer' },
    ],
  },
  // {
  //   Head: 'PROFILE',
  //   subLinks: [
  //     { name: 'View Profile', logo: [<CgProfile />] },
  //   ],
  // },
];

const ManufacturerDashboard = () => {
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
          links={manufactureLinks}
        />

        <div className=' font-roboto h-screen flex-auto '>
          <div className='mx-1 h-[80vh]    md:mx-2 '>
            {selectedItem === 'Home Page' ? (
              <HomeManufacture open={open} setOpen={setOpen} />

            ) : selectedItem === 'Add Product' ? (
              <AddProduct open={open} setOpen={setOpen} />
            ) : (
              selectedItem === 'View All Products' && [<ViewAllProducts open={open} setOpen={setOpen} />]
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufacturerDashboard;
