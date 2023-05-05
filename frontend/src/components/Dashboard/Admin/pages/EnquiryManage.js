import React, { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import ExcelData from '../../ExcelData';
import PdfData from '../../PdfData';
import ModalUpdate from './Modals/ModalUpdate';
import ModalDelete from './Modals/ModalDelete';

const EnquiryManage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [screenSize, setScreenSize] = useState(undefined);
  const [btn, setBtn] = useState(6);
  const [showMyModal, setShowMyModal] = useState(false);
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
          `https://procuren-backend.onrender.com/getenquiries/${page}/${limit}`,
          // `http://localhost:3001/getenquiries/${page}/${limit}`,
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

  const handleLimitPlus = async () => {
    setLimit(limit + 10);
    console.log(page);
  };
  const handleLimitMinus = async () => {
    setLimit(limit - 10);
  };

  const handleOnClose = () => setShowMyModal(false);
  const handleOnClose2 = () => setShowMyModal2(false);

  function TableRow({ item, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    function handleToggleExpand() {
      setIsExpanded(!isExpanded);
    }

    const truncatedAddress = item.billingAddress.substring(0, 25);

    return (
      <tr
        key={index}
        className={`  border-y border-black p-1 text-center md:py-2 ${
          index % 2 === 0 && 'bg-slate-200 '
        } hover:bg-indigo-200 `}
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

        <td className=' border-y border-black px-1  text-center md:py-2  '>
          {item.productName}
        </td>
        <td className=' border-x border-gray-400 px-1 font-medium'>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </td>
        <td className=' border-x border-gray-400 px-1 '>{item.contact}</td>
        <td className=' border-x border-gray-400 px-1'>
          {item.alternativeNumber}
        </td>
        <td className=' border-x border-gray-400 px-1 '>{item.email}</td>
        <td className=' border-x border-gray-400 px-1 '>{item.quantity}</td>
        <td className='border-x border-gray-400 px-1 '>{item.state}</td>
        <td className='w-[15%]  border-x border-gray-400 px-1 '>
          {isExpanded ? item.billingAddress : truncatedAddress}
          {item.billingAddress.length > 25 && (
            <button
              className='whitespace-pre text-sm font-semibold text-indigo-500'
              onClick={handleToggleExpand}
            >
              {isExpanded ? ' show less' : '   ....'}
            </button>
          )}
        </td>
        <td className='  border-x border-gray-400 px-1'>
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
        <td className=' border-x border-gray-400 px-1'>
          {item.deliveryStatus}
        </td>
        <td
          onClick={() => {
            setVal(item);
            setShowMyModal(true);
          }}
          className='cursor-pointer  border-gray-400 px-3'
        >
          <FiEdit2 />
        </td>
        <td
          className='cursor-pointer border-x border-gray-400 px-1 text-orange-600 hover:text-red-600 '
          onClick={() => {
            setVal(item);
            setShowMyModal2(true);

            // handleDelete(item._id);
          }}
        >
          <AiOutlineDelete />
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
        <div className='overflow-y-none  '>
          <div className='my-2 flex justify-between md:mr-4 '>
            <div className='flex items-center'>
              <ExcelData data={data} fileName='Enquiry Form Data' />
              <PdfData fileName='Enquiry Form Data' bdy={bdy} wid={widths} />
            </div>
            <div className='my-auto bg-gradient-to-tl from-blue-600 to-pink-500 bg-clip-text text-center font-sans text-2xl font-semibold  text-transparent'>
              Retailer Enquiry Data
            </div>
            <div className='rounded-lg  p-0.5 text-sm   lg:p-2'>
              Data per page: <span className='text-lg'>{limit}</span>
              <button
                // disabled={totalPages >= page  }
                onClick={handleLimitPlus}
                className={`text-md mx-1 cursor-pointer  rounded-lg bg-indigo-300 p-1  shadow-lg shadow-indigo-300  lg:px-2 lg:text-lg xl:text-xl ${
                  totalPages === 1 ? 'hidden' : 'visible bg-indigo-300'
                }`}
              >
                &#43;
              </button>
              <button
                onClick={handleLimitMinus}
                className={`text-md mx-1 ml-2 cursor-pointer rounded-lg p-1 shadow-lg   shadow-indigo-300 lg:mx-2 lg:px-2 lg:text-lg xl:text-xl ${
                  limit <= 10 ? 'hidden' : 'visible bg-indigo-300'
                }`}
              >
                &minus;
              </button>
            </div>
          </div>
          {data.length > 0 ? (
            <section
              className={`h-[80vh] overflow-x-scroll xl:overflow-x-hidden `}
            >
              <table className=' border border-black shadow-xl'>
                <thead>
                  <tr className='border-y border-black bg-indigo-100  p-1 md:p-2 '>
                    <th className='border-x border-black py-1 md:py-2'>
                      Sr. No.
                    </th>
                    <th className='border-x border-gray-400 '>Date</th>
                    <th className='border-x border-gray-400 '>Time</th>

                    <th className='border-x border-gray-400 '>Product Name</th>
                    <th className='border-x border-gray-400 '>Name</th>
                    <th className='border-x border-gray-400 '>Phone</th>
                    <th className='border-x border-gray-400 '>
                      Alternative No
                    </th>
                    <th className='border-x border-gray-400 '>Email</th>
                    <th className='border-x border-gray-400 '>Quantity</th>
                    <th className='border-x border-gray-400 '>State</th>
                    <th className='border-x border-gray-400 '>
                      Billing Address
                    </th>
                    <th className='border-x border-gray-400 '>
                      Shipping Pincode
                    </th>
                    <th className='border-x border-gray-400 '>Status</th>
                    <th className='border-x border-gray-400 '>
                      Delivery Status
                    </th>
                    <th
                      className='col-span-2 border-x border-gray-400'
                      colSpan='2'
                    >
                      Edit
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
          <ModalUpdate
            onClose={handleOnClose}
            visible={showMyModal}
            initialValues={val}
            setSub={setSub}
          />
          <ModalDelete
            onClose={handleOnClose2}
            visible={showMyModal2}
            Values={val}
            setSub={setSub}
            deletePopup = "enquiry"
          />
        </div>
      )}
    </>
  );
};

export default EnquiryManage;
