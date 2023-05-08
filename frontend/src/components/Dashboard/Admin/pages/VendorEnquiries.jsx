import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';

import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import ExcelData from '../../ExcelData';
import PdfData from '../../PdfData';
import ModalDelete from './Modals/ModalDelete';

const VendorEnquiries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [screenSize, setScreenSize] = useState(undefined);
  const [btn, setBtn] = useState(6);
  const [showMyModal2, setShowMyModal2] = useState(false);
  const [sub, setSub] = useState(false);
  const [val, setVal] = useState({});

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
        const res = await axios.get(
          `https://procuren-backend.onrender.com/getcontactform/${page}/${limit}`,
          // `http://localhost:3001/getcontactform/${page}/${limit}`,

          {
            headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
          }
        );
        setData(res.data.data);
        setSub(false);
        setTotalPages(Math.ceil(res.data.count / limit)); // calculate total number of pages
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, limit, sub]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  let widths = ['4%', '11%', '37%', '17%', '11%', '20%'];
  let bdy = [
    ['No', 'Name', 'email', 'phone', 'subject', 'message'],

    ...data.map((item, index) => [
      index + 1,
      item.name,
      item.email,
      item.phone,
      item.subject,
      item.message,
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
              ? 'bg-[#5c67f5] text-white'
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

  const handleOnClose2 = () => setShowMyModal2(false);

  function TableRow({ item, index }) {
    return (
      <tr
        key={index}
        className={`  border-y border-black p-1 text-center hover:bg-indigo-100  md:py-2 `}
      >
        <td className=' border-x border-black'>
          {(page - 1) * limit + index + 1}
        </td>
        <td className=' whitespace-nowrap border border-black px-1  text-center md:py-2  '>
          {item.date}
        </td>
        <td className=' border border-black px-1  text-center md:py-2  '>
          {item.time}
        </td>

        <td className=' border border-black px-1  text-center font-medium  md:py-2 '>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </td>
        <td className=' border-y border-black px-1  text-center md:py-2  '>
          {item.email}
        </td>
        <td className=' border-x border-gray-400 px-1 font-medium'>
          {item.phone}
        </td>
        <td className=' border-x border-gray-400 px-1 '> {item.subject}</td>

        <td className=' border-x border-gray-400 px-1 '>{item.message}</td>
        <td
          className=' cursor-pointer text-xl  text-orange-600 hover:text-red-600 '
          onClick={() => {
            setVal(item);
            setShowMyModal2(true);
          }}
        >
          <AiFillDelete className='mx-auto' />
        </td>
      </tr>
    );
  }

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
        <div className='overflow-y-none overflow-x-scroll md:overflow-x-hidden'>
          {/* <div>{JSON.stringify(data)}</div> */}
          <div className='my-2 flex justify-between md:mr-4 '>
            <div className='flex items-center'>
              <ExcelData data={data} fileName='Vendor Enquiries' />
              <PdfData fileName='Vendor Enquiries' bdy={bdy} wid={widths} />
            </div>
            <div className='my-auto bg-gradient-to-tl from-blue-600 to-pink-500 bg-clip-text text-center font-sans text-2xl font-semibold  text-transparent'>
              Vendor Enquiries
            </div>
            <div className='rounded-lg p-0.5 text-sm lg:p-2'>
              Rows per page:
              <select
                className='mx-1 cursor-pointer rounded-lg border p-1 text-lg shadow-indigo-300 hover:shadow-lg '
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          {data.length > 0 ? (
            <section
              className={`h-[80vh] overflow-x-scroll xl:overflow-x-hidden  `}
            >
              <table className='mx-auto border border-black shadow-xl'>
                <thead>
                  <tr className='border-y border-black bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] p-1 font-normal  text-white md:p-2 '>
                    <th className='border-x border-black py-1 md:py-2'>
                      Sr. No.
                    </th>
                    <th className='border-x border-gray-400 '>Date</th>
                    <th className='border-x border-gray-400 '>Time</th>
                    <th className='border-x border-gray-400'>Name</th>
                    <th className='border-x border-gray-400'>Email</th>
                    <th className='border-x border-gray-400'>Phone</th>
                    <th className='border-x border-gray-400'>Subject</th>
                    <th className='border-x border-gray-400'>Message</th>
                    <th className=' border-x border-gray-400 px-1'>Delete</th>
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
            'No data found'
          )}

          <div className='flex justify-center'>
            {totalPages > 1 && (
              <div className='my-2 flex '>
                <button
                  className={`  mr-4 rounded-md border border-gray-400 px-2 hover:bg-[#5c67f5] hover:text-white ${
                    page === 1 && 'cursor-not-allowed opacity-50'
                  }`}
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <div className=' '>{renderPagination()}</div>
                <button
                  className={`  ml-2 rounded-md border border-gray-400 px-2 hover:bg-[#5c67f5] hover:text-white ${
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
          <ModalDelete
            onClose={handleOnClose2}
            visible={showMyModal2}
            Values={val}
            setSub={setSub}
            deletePopup='contactForm'
          />
        </div>
      )}
    </>
  );
};

export default VendorEnquiries;
