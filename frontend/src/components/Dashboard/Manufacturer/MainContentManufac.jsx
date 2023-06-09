import React, { useEffect } from 'react';

import AddProduct from './pages/AddProduct';
import ViewAllProducts from './pages/ViewAllProducts';

// import ViewProfile from './pages/ViewProfile';

import HomeManufacture from './pages/HomeManufacture';
// import Products from './pages/Products';

function MainContentManufac({ selectedItem, setProfile }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) {
      window.location.href = '/login';
      return;
    } else if (role !== 'Manufacturer') {
      window.location.href = '/login';
      return;
    }
  }, []);

  return (
    <div>
      {selectedItem === 'Home Page'
        ? [<HomeManufacture setProfile={setProfile} />]
        : selectedItem === 'Add Product'
        ? [<AddProduct />]
        : selectedItem === 'View All Products' && [<ViewAllProducts />]}
    </div>
  );
}

export default MainContentManufac;
