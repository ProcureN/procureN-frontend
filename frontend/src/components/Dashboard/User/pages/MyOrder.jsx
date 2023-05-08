import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
// import ExcelData from '../../ExcelData';
import PdfData from '../../PdfData';

const MyOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
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
        const customerID = localStorage.getItem('customerID');

        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        const res = await axios.get(
          `https://procuren-backend.onrender.com/IndividualcustomerEnquiry/${customerID}/${page}/${limit}`,
          // `http://localhost:3001/IndividualcustomerEnquiry/${customerID}/${page}/${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data.data);
        setTotalPages(Math.ceil(res.data.count / limit));
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, limit]);

  let widths = ['4%', '20%', '10%', '20%', '36%', '15%'];
  let bdy = [
    ['No', 'Product Name', 'Name', 'Contact', 'Email', 'State'],

    ...data.map((item, index) => [
      index + 1,
      item.productName,
      item.name,
      item.contact,
      item.email,
      item.state,
    ]),
  ];

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

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

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  return (
    <>
      {loading ? (
        <CgSpinner
          size={60}
          className='mx-auto mt-16 animate-spin text-indigo-600'
        />
      ) : error ? (
        'Error ~ Something went wrong :)'
      ) : (
        <div className='overflow-y-none  '>
          <div className='my-2 flex justify-between md:mr-4 '>
            <div className='mx-2 flex items-center'>
              {/* <ExcelData data={data} fileName='Enquiries' /> */}
              <PdfData fileName='Enquiries' bdy={bdy} wid={widths} />
            </div>
            <div className='my-auto bg-gradient-to-tl from-blue-600 to-pink-500 bg-clip-text text-center font-sans text-2xl font-semibold  text-transparent'>
              Your Enquiries
            </div>
            <div className='rounded-lg p-0.5 text-sm lg:p-2'>
              Rows per page:
              <select
                className='mx-1 cursor-pointer rounded-lg border p-1 text-lg shadow-indigo-300 hover:shadow-lg '
                value={limit}
                onChange={handleLimitChange}
              >
                <option c value={10}>
                  10
                </option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          {data.length > 0 ? (
            <section
              className={`container mx-auto h-[80vh] overflow-x-scroll xl:overflow-x-hidden `}
            >
              <table className=' mx-auto border border-black shadow-xl'>
                <thead>
                <tr className='border-y border-black bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] p-1 font-normal  text-white md:p-2 '>
                    <th className='border-x border-black py-1 md:py-2 '>
                      Sr. No.
                    </th>
                    <th className=' border-x border-gray-400 '>Product Name</th>
                    <th className=' border-x border-gray-400 '>Quantity</th>
                    <th className=' border-x border-gray-400 '>Name</th>
                    <th className=' border-x border-gray-400 '>Email</th>
                    <th className=' border-x border-gray-400 '>Phone Number</th>
                    <th className=' border-x border-gray-400 '>City</th>
                    <th className=' border-x border-gray-400 '>State</th>
                    <th className=' border-x border-gray-400 '>
                      Billing Address
                    </th>
                    <th className=' border-x border-gray-400 '>
                      Shipping Pincode
                    </th>
                    <th className=' border-x border-gray-400 '>Status</th>
                    {/* <th className=' md:p-2 p-1 border '>_id</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={`  border-y border-black p-1 text-center md:py-2  hover:bg-indigo-200 `}
                    >
                      <td className='border-x border-gray-400 p-1 '>
                        {index + 1}
                      </td>
                      <td className='border-x border-gray-400 p-1 '>
                        {item.productName}
                      </td>
                      <td className='border-x border-gray-400 p-1'>
                        {item.quantity}
                      </td>
                      <td className='border-x border-gray-400 p-1'>
                        {item.name}
                      </td>
                      <td className='border-x border-gray-400 p-1'>
                        {item.email}
                      </td>
                      <td className='border-x border-gray-400 p-2'>
                        {item.contact}
                      </td>
                      <td className='border-x border-gray-400 px-1'>
                        {item.city}
                      </td>
                      <td className='border-x border-gray-400 px-1'>
                        {item.state}
                      </td>
                      <td className='border-x border-gray-400 px-1'>
                        {item.billingAddress}
                      </td>
                      <td className='border-x border-gray-400 px-1'>
                        {item.shippingPincode}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : (
            'No data found'
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

export default MyOrder;
