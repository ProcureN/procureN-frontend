

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
// import ExcelData from '../../ExcelData';

import PdfData from '../../PdfData';
import { AiOutlineMenu } from 'react-icons/ai';

const ViewAllProducts = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [limit, setLimit] = useState(10);
  const limit = 10;
  const [screenSize, setScreenSize] = useState(undefined);
  const [btn, setBtn] = useState(6);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) setBtn(3);
    else if (screenSize <= 1300) setBtn(4);
    else setBtn(5);
  }, [screenSize]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login'; // Redirect to login page if token not found
          return;
        }
        const customerID = localStorage.getItem('customerID');
        const res = await axios.get(
          `https://procuren-backend-g6z9.onrender.com/getProducts/${customerID}/${page}/${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setData(res.data.data);

        setTotalPages(Math.ceil(res.data.count / limit)); // calculate total number of pages
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, limit]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  let widths = ['4%', '20%', '10%', '9%', '36%', '12%', '14%'];
  let bdy = [
    [
      'No',
      'Product Name',
      'Manufacturer',
      'Price',
      'Description',
      'status',
      'Delivery Status',
    ],

    ...data.map((item, index) => [
      index + 1,
      item.productName,
      item.manufacturerName,
      item.price,
      item.description,
      item.status,
      item.deliveryStatus,
    ]),
  ];

  const renderPagination = () => {
    const pageNumbers = [];
    const maxButtons = btn; // The maximum number of buttons to show
    const halfButtons = Math.floor(maxButtons / 2);
    let startPage, endPage;

    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else if (page <= halfButtons) {
      startPage = 1;
      endPage = maxButtons;
    } else if (page + halfButtons >= totalPages) {
      startPage = totalPages - maxButtons + 1;
      endPage = totalPages;
    } else {
      startPage = page - halfButtons;
      endPage = page + halfButtons;
    }

    // Add "..." to indicate that there are more pages available
    if (startPage > 1) {
      pageNumbers.push(
        <li key={1} onClick={() => handlePageChange(1)}>
          <button className='py-auto mr-1 rounded-md border border-gray-300 bg-white px-2 focus:outline-none'>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <li key='ellipsis-start' className='mx-2'>
            ...
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`py-auto mr-2 rounded-md px-2 ${
            i === page
              ? 'bg-indigo-500 text-white'
              : 'border border-gray-300 bg-white'
          }`}
          onClick={() => handlePageChange(i)}
        >
          <button className='focus:outline-none'>{i}</button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li
            key='ellipsis-end'
            className='py-auto mr-1 rounded-md border border-gray-300 bg-white px-2 focus:outline-none'
          >
            ...
          </li>
        );
      }
      pageNumbers.push(
        <li key={totalPages} onClick={() => handlePageChange(totalPages)}>
          <button className='py-auto mr-1 rounded-md border border-gray-300 bg-white px-2 focus:outline-none'>
            {totalPages}
          </button>
        </li>
      );
    }

    return <ul className='flex'>{pageNumbers}</ul>;
  };

 

  function TableRow({ item, index }) {
    return (
      <tr
        key={index}
        className={` whitespace-nowrap border-y  border-black p-1 text-center hover:bg-indigo-200 md:py-2  xl:whitespace-normal `}
      >
        <td className=' border-x border-black'>
          {(page - 1) * limit + index + 1}
        </td>
        <td className=' border border-black px-1  text-center md:py-2  '>
          {item.date}
        </td>
        <td className=' border border-black px-1  text-center md:py-2  '>
          {item.time}
        </td>
        <td className=' border-y border-black px-1  text-center md:py-2  '>
          {item.productName}
        </td>
        <td className=' border-x border-gray-400 px-1 font-medium'>
          {item.manufacturerName.charAt(0).toUpperCase() +
            item.manufacturerName.slice(1)}
        </td>
        <td className=' border-x border-gray-400 px-1 '>
          {item.priceBeforeDiscount}
        </td>
        <td className=' border-x border-gray-400 px-1'>{item.withGST}</td>
        {/* <td className='w-24 border p-1 md:p-2 '>
                      <img src={item.selectImage1} alt='' srcSet='' />
                    </td>
                    <td className='w-24 border p-1 md:p-2'>
                      <img src={item.selectImage2} alt='' srcSet='' />
                    </td> */}
        <td className=' border-x border-gray-400 px-1 '>{item.price}</td>
        <td className=' border-x border-gray-400 px-1 '>
          {' '}
          {item.productQuantity}
        </td>
        <td className='border-x border-gray-400 px-1 '>{item.description}</td>
        <td className='  border-x border-gray-400 px-1 '>
          {item.availability}
        </td>
        <td className='  border-x border-gray-400 px-1'>
          {item.shippingCharges}
        </td>
        <td
          className={` border-x  border-gray-400 px-1 font-medium ${
            item.status === 'Approved'
              ? 'text-green-500 '
              : item.status === 'Pending'
              ? 'text-orange-300'
              : 'text-red-500'
          }`}
        >
          {item.status}
        </td>
        <td className=' border-x border-gray-400 px-1'>
          {item.deliveryStatus}
        </td>
      </tr>
    );
  }
  return (
    <>
      <div className='my-2 flex h-16 justify-between rounded-md bg-white shadow md:mr-4'>
            <div className='my-auto pl-2'>
              <AiOutlineMenu
                className=' cursor-pointer text-3xl text-[#5c67f5] '
                onClick={() => setOpen(!open)}
              />
            </div>

            <div className='mx-auto my-auto bg-gradient-to-tl uppercase from-blue-600 to-pink-500 bg-clip-text text-center font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
              Your Enquiries
            </div>
            {data.length > 0 && (
              <>
                <div className='hidden items-center pr-2 md:visible md:flex'>
                  
                  <PdfData
                    fileName='Enquiry Form Data'
                    bdy={bdy}
                    wid={widths}
                  />
                </div>
                
              </>
            )}
          </div>
          {data.length > 0 && (
            <div className='flex justify-between md:hidden'>
              <div className='mb-3 flex items-center md:visible '>
               
                <PdfData fileName='Enquiry Form Data' bdy={bdy} wid={widths} />
              </div>
              
            </div>
          )}
      {loading ? (
        <CgSpinner
          size={60}
          className='mx-auto mt-16 animate-spin text-indigo-600'
        />
      ) : error ? (
        'Error'
      ) : (
        <div className='overflow-y-none  '>
          {data.length > 0 ? (
            <section
              className={`h-[80vh] overflow-x-scroll xl:overflow-x-hidden `}
            >
              <table className='whitespace-nowrap border  border-black shadow-xl xl:whitespace-normal'>
                <thead>
                  <tr className='border-y border-black bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] p-1 font-normal  text-white md:p-2 '>
                    <th className='border-x border-black py-1 md:py-2'>
                      Sr. No.
                    </th>
                    <th className='border-x border-gray-400 '>Date</th>
                    <th className='border-x border-gray-400 '>Time</th>
                    <th className='border-x border-gray-400 '>Product Name</th>
                    <th className='border-x border-gray-400 '>
                      Manufacturer Name
                    </th>
                    <th className='border-x border-gray-400 '>
                      Price Before Discount
                    </th>
                    <th className='border-x border-gray-400 '>
                      Price with GST
                    </th>
                    <th className='border-x border-gray-400 '>Price</th>
                    <th className='border-x border-gray-400 '>Quantity</th>
                    <th className='border-x border-gray-400 '>Description</th>
                    <th className='border-x border-gray-400 '>Availability</th>
                    <th className='border-x border-gray-400 '>
                      Shipping Charges
                    </th>
                    <th className='border-x border-gray-400 '>Status</th>
                    <th className='border-x border-gray-400 '>
                      Delivery Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <TableRow key={index} index={index} item={item} />
                  ))}
                </tbody>
              </table>
            </section>
          ) : (
            'No enquiries found'
          )}

          <div className='flex justify-center'>
            {totalPages > 1 && (
              <div className='my-2 flex '>
                <button
                  className={`  mr-4 rounded-md border border-gray-400 px-2 hover:bg-indigo-400 hover:text-white ${
                    page === 1 && 'cursor-not-allowed opacity-50'
                  }`}
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <div className=' '>{renderPagination()}</div>
                <button
                  className={`  ml-2 rounded-md border border-gray-400 px-2 hover:bg-indigo-400 hover:text-white ${
                    page === totalPages && 'cursor-not-allowed opacity-50'
                  } `}
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAllProducts;
