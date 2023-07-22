
import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useEffect } from 'react';

import axios from 'axios';
import ExcelData from '../../ExcelData';
import PdfData from '../../PdfData';
import { AiOutlineMenu } from 'react-icons/ai';

import { BiRefresh } from 'react-icons/bi';

const VendorDetails = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [sub, setSub] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(
  //         'https://procuren-backend.onrender.com/getclient/1/100'
  //       );
  //       // console.log(res);
  //       setData(res.data.data);
  //       setLoading(false);
  //       setSub(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [sub]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        const res = await axios.get(
          `https://procuren-backend.onrender.com/getroles`,
          // `http://localhost:3001/getroles/${page}/${limit}`,

          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              selectRole: 'Vendor',
            },
          }
        );
        setData(res.data.data);
        setSub(false);
        // setTotalPages(Math.ceil(res.data.count / limit)); // calculate total number of pages
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [sub]);

  const columns = [
    { field: 'no', headerName: 'Sr No', width: '50',sortable: false },
    { field: 'date', headerName: 'Date', width: '130' },
    {
      field: 'name',
      headerName: 'Name',
      // width: '300',
    },
    { field: 'email', headerName: 'Email', flex:1},
    { field: 'company', headerName: 'Company', width: '150' },
    { field: 'jobTitle', headerName: 'Job',flex:1 },
    { field: 'phone', headerName: 'Phone', width: '120' },
    { field: 'city', headerName: 'City', width: '120' },
    { field: 'state', headerName: 'State' },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: (params) => (
    //     <Select
    //       value={params.row.status}
    //       onChange={(e) => handleStatusChange(params.row, e.target.value)}
    //       style={{
    //         backgroundColor:
    //           params.row.status === 'Pending'
    //             ? '#f5ddc4'
    //             : params.row.status === 'Approved'
    //             ? '#8db598'
    //             : '#eb8888',
    //         color: 'black',
    //         fontSize: '0.875rem',
    //         marginTop: '10px',
    //         marginBottom: '10px',
    //       }}
    //     >
    //       {statusOptions.map((option) => (
    //         <MenuItem key={option} value={option}>
    //           {option}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   ),
    // },
  ];
  let widths = ['4%', '10%', '15%', '40%', '15%', '15%'];
  let bdy = [
    ['No', 'Name', 'Phone', 'Email', 'Company', 'State'],

    ...data.map((item, index) => [
      index + 1,
      item.name,
      item.phone,
      item.email,
      item.company,
      item.state,
    ]),
  ];

  const rows = data.map((item, index) => ({
    id: item._id,
    no: index + 1,
    ...item,
  }));

  // const handleOnClose = () => setShowMyModal(false);

  return (
    <>
      <div className='my-2 flex  h-16 justify-between overflow-hidden rounded-md bg-gray-100 shadow-lg shadow-gray-400  md:mr-4'>
        <div className='my-auto pl-2'>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className='mx-auto my-auto bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
        Vendor Details
        </div>
        {data.length > 0 && (
          <div className='hidden items-center pr-2 md:visible md:flex'>
            <BiRefresh
              className='mr-2 cursor-pointer text-3xl text-[#5c67f5] hover:rotate-180 duration-500'
              onClick={() => setSub(true)}
            />
            {/* <button
              onClick={() => setShowMyModal3(true)}
              className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
            >
              Add Order
            </button> */}

            <ExcelData data={data} fileName='Vendor Details' />
            <PdfData fileName='Vendor Details' bdy={bdy} wid={widths} />
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className='flex justify-between md:hidden'>
          {/* <button
            onClick={() => setShowMyModal3(true)}
            className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
          >
            Add Order
          </button> */}
          <div className='flex'>
            <BiRefresh
              className='mx-2 cursor-pointer text-3xl hover:rotate-180 duration-500'
              onClick={() => setSub(true)}
            />
            <ExcelData data={data} fileName='Vendor Details' />
            <PdfData fileName='Vendor Details' bdy={bdy} wid={widths} />
          </div>
        </div>
      )}
      <div className=' overflow-hidden'>
        <Box
          m='0 20px 0 0'
          height='90vh'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              border: '1px solid', // Add the border style for the cell
              borderColor: 'lightgray', // Set the color of the border
              padding: '4px',
            },
            '& .name-column--cell': {
              // color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              // backgroundColor: colors.blueAccent[700],
              background: 'linear-gradient(to top right, #5c67f5, #cb67ac)',
              borderBottom: 'none',
              color: 'white',
            },
            '& .MuiDataGrid-virtualScroller': {
              // backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              // borderTop: '1 solid',
              // backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              // color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          {loading ? (
            <div>Loading</div>
          ) : error ? (
            'Error ~ Something went wrong :)'
          ) : (
            <DataGrid
              // checkboxSelection
             
              getRowHeight={() => 'auto'}
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default VendorDetails;



// import React, { useState, useEffect } from 'react';
// import { FiEdit2 } from 'react-icons/fi';
// import { AiFillDelete, AiOutlineMenu } from 'react-icons/ai';

// import axios from 'axios';
// import { CgSpinner } from 'react-icons/cg';
// import ExcelData from '../../ExcelData';
// import PdfData from '../../PdfData';
// import ModalUpdateUser from './Modals/ModalUpdateUser';
// import ModalDelete from './Modals/ModalDelete';

// const VendorDetails = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   // const [limit, setLimit] = useState(10);
//   const limit = 10;
//   const [screenSize, setScreenSize] = useState(undefined);
//   const [btn, setBtn] = useState(6);
//   const [showMyModal, setShowMyModal] = useState(false);
//   const [sub, setSub] = useState(false);
//   const [val, setVal] = useState({});
//   const [showMyModal2, setShowMyModal2] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setScreenSize(window.innerWidth);

//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (screenSize <= 900) setBtn(3);
//     else if (screenSize <= 1300) setBtn(4);
//     else setBtn(5);
//   }, [screenSize]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('token');
//         if (!token) {
//           window.location.href = '/login';
//           return;
//         }
//         const res = await axios.get(
//           `https://procuren-backend.onrender.com/getroles`,
//           // `http://localhost:3001/getAllDetails/${page}/${limit}`,

//           {
//             headers: { Authorization: `Bearer ${token}` },
//             params: {
//               selectRole: 'Vendor',
//             },
//           }
//         );
//         setData(res.data.data);
//         setSub(false);
//         setTotalPages(Math.ceil(res.data.count / limit)); // calculate total number of pages
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [page, limit, sub]);

//   const handlePageChange = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   let widths = ['4%', '10%', '40%', '15%'];
//   let bdy = [
//     ['No', 'Name', 'email', 'role'],

//     ...data.map((item, index) => [
//       index + 1,
//       item.name,
//       item.email,
//       // item.company,
//       item.selectRole,
//       // item.phone,
//     ]),
//   ];

//   const renderPagination = () => {
//     const pageNumbers = [];
//     const maxButtons = btn; // The maximum number of buttons to show
//     const halfButtons = Math.floor(maxButtons / 2);
//     let startPage, endPage;

//     if (totalPages <= maxButtons) {
//       startPage = 1;
//       endPage = totalPages;
//     } else if (page <= halfButtons) {
//       startPage = 1;
//       endPage = maxButtons;
//     } else if (page + halfButtons >= totalPages) {
//       startPage = totalPages - maxButtons + 1;
//       endPage = totalPages;
//     } else {
//       startPage = page - halfButtons;
//       endPage = page + halfButtons;
//     }

//     // Add "..." to indicate that there are more pages available
//     if (startPage > 1) {
//       pageNumbers.push(
//         <li key={1} onClick={() => handlePageChange(1)}>
//           <button className='py-auto mr-1 rounded-md border border-gray-300 bg-white px-2 focus:outline-none'>
//             1
//           </button>
//         </li>
//       );
//       if (startPage > 2) {
//         pageNumbers.push(
//           <li key='ellipsis-start' className='mx-2'>
//             ...
//           </li>
//         );
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <li
//           key={i}
//           className={`py-auto mr-2 rounded-md px-2 ${
//             i === page
//               ? 'bg-indigo-500 text-white'
//               : 'border border-gray-300 bg-white'
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           <button className='focus:outline-none'>{i}</button>
//         </li>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pageNumbers.push(
//           <li
//             key='ellipsis-end'
//             className='py-auto mr-1 rounded-md border border-gray-300 bg-white px-2 focus:outline-none'
//           >
//             ...
//           </li>
//         );
//       }
//       pageNumbers.push(
//         <li key={totalPages} onClick={() => handlePageChange(totalPages)}>
//           <button className='py-auto mr-1 rounded-md border border-gray-300 bg-white px-2 focus:outline-none'>
//             {totalPages}
//           </button>
//         </li>
//       );
//     }

//     return <ul className='flex'>{pageNumbers}</ul>;
//   };

//   // const handleLimitChange = (event) => {
//   //   const newLimit = parseInt(event.target.value);
//   //   setLimit(newLimit);
//   // };

//   const handleOnClose = () => setShowMyModal(false);
//   const handleOnClose2 = () => setShowMyModal2(false);

//   function TableRow({ item, index }) {
//     return (
//       <tr
//         key={index}
//         className={`  border-y border-black p-1 text-center hover:bg-indigo-100  md:py-2 `}
//       >
//         <td className=' border-x border-black'>
//           {(page - 1) * limit + index + 1}
//         </td>
//         {/* <td className='whitespace-nowrap border  border-black px-1 text-center  text-sm md:py-2  '>
//           {item.date}
//           <br />
//           {item.time}
//         </td> */}
//         {/* <td className=' border border-black px-1  text-center md:py-2  '>
//           {item.time}
//         </td> */}

//         <td className=' border border-black px-1  text-center font-medium  md:py-2 '>
//           {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
//         </td>
//         <td className=' border-y border-black px-1  text-center md:py-2  '>
//           {item.email}
//         </td>
//         <td className=' border-x border-gray-400 px-1 '>{item.company}</td>
//         <td className=' border-x border-gray-400 px-1 '> {item.jobTitle}</td>
//         {/* <td
//           className={`border-x border-gray-400 px-1 text-sm font-medium ${
//             item.selectRole === 'Retailer'
//               ? '  bg-[#cb67ac] bg-opacity-50 '
//               : ' bg-[#5c67f5] bg-opacity-50'
//           }`}
//         >
//           {item.selectRole}
//         </td> */}
//         <td className=' border-x border-gray-400 px-1 '>{item.phone}</td>
//         <td className=' border-x border-gray-400 px-1 '>
//           {item.city}
//           <br />
//           {item.state}
//         </td>
//         <td
//           onClick={() => {
//             setVal(item);
//             setShowMyModal(true);
//           }}
//           className='cursor-pointer  border-gray-400 px-3'
//         >
//           <FiEdit2 />
//         </td>
//         <td
//           className='cursor-pointer border-x border-gray-400 px-1 text-xl text-orange-600 hover:text-red-600 '
//           onClick={() => {
//             setVal(item);
//             setShowMyModal2(true);

//             // handleDelete(item._id);
//           }}
//         >
//           <AiFillDelete />
//         </td>
//       </tr>
//     );
//   }

//   return (
//     <>
//       {loading ? (
//         <CgSpinner
//           size={60}
//           className='mx-auto mt-16 animate-spin text-indigo-600'
//         />
//       ) : error ? (
//         'Error ~ Something went wrong :)'
//       ) : (
//         <div className='overflow-y-none overflow-x-scroll md:overflow-x-hidden'>
//           {/* <div className='my-2 flex justify-between md:mr-4 '>
//             <div className='flex items-center'>
//               <ExcelData data={data} fileName='Vendor Details' />
//               <PdfData fileName='Vendor Details' bdy={bdy} wid={widths} />
//             </div>
//             <div className='my-auto bg-gradient-to-tl from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-semibold  text-transparent'>
//               Vendor Details
//             </div>
//             <div className='rounded-lg p-0.5 text-sm lg:p-2'>
//               Rows per page:
//               <select
//                 className='mx-1 cursor-pointer rounded-lg border p-1 text-lg shadow-indigo-300 hover:shadow-lg '
//                 value={limit}
//                 onChange={handleLimitChange}
//               >
//                 <option c value={10}>
//                   10
//                 </option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//             </div>
//           </div> */}
//           <div className='my-2 flex h-16 justify-between rounded-md bg-white shadow md:mr-4'>
//             <div className='my-auto pl-2'>
//               <AiOutlineMenu
//                 className=' cursor-pointer text-3xl text-[#5c67f5] '
//                 onClick={() => setOpen(!open)}
//               />
//             </div>

//             <div className='mx-auto my-auto bg-gradient-to-tl from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
//               Vendor Details
//             </div>
//             {data.length > 0 && (
//               <>
//                 <div className='hidden items-center pr-2 md:visible md:flex'>
//                   <ExcelData data={data} fileName='Vendor Details' />
//                   <PdfData fileName='Vendor Details' bdy={bdy} wid={widths} />
//                 </div>
//                 {/* <div className='my-auto hidden  rounded-lg  pr-2 text-sm md:block'>
//                   Rows per page:
//                   <select
//                     className='mx-1 cursor-pointer rounded-lg border p-1 text-lg shadow-indigo-300 hover:shadow-lg '
//                     value={limit}
//                     onChange={handleLimitChange}
//                   >
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                     <option value={50}>50</option>
//                     <option value={100}>100</option>
//                   </select>
//                 </div> */}
//               </>
//             )}
//           </div>
//           {data.length > 0 && (
//             <div className='flex justify-between md:hidden'>
//               <div className='flex items-center md:visible  '>
//                 <ExcelData data={data} fileName='Vendor Details' />
//                 <PdfData fileName='Vendor Details' bdy={bdy} wid={widths} />
//               </div>
//               {/* <div className='my-auto   rounded-lg  pr-2 text-sm '>
//                 Rows / page:
//                 <select
//                   className='mx-1 cursor-pointer rounded-lg border p-1 text-lg shadow-indigo-300 hover:shadow-lg '
//                   value={limit}
//                   onChange={handleLimitChange}
//                 >
//                   <option value={10}>10</option>
//                   <option value={20}>20</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                 </select>
//               </div> */}
//             </div>
//           )}
//           {data.length > 0 ? (
//             <section className={`mb-6 overflow-x-scroll lg:overflow-x-hidden `}>
//               <table className=' mx-auto border  border-black'>
//                 <thead>
//                   <tr className='border-y border-black bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] p-1 font-normal  text-white md:p-2 '>
//                     <th className='border-x border-black py-1 md:py-2'>
//                       Sr. No.
//                     </th>
//                     {/* <th className='border-x border-gray-400 '>Date</th> */}
//                     {/* <th className='border-x border-gray-400 '>Time</th> */}

//                     <th className='border-x border-gray-400'>Name</th>
//                     <th className='border-x border-gray-400'>Email</th>
//                     <th className='border-x border-gray-400'>Company</th>
//                     <th className='border-x border-gray-400'>Job Title</th>
//                     {/* <th className='border-x border-gray-400'>Role</th> */}
//                     <th className='border-x border-gray-400'>Phone No</th>
//                     <th className='border-x border-gray-400'>City</th>

//                     <th
//                       className='col-span-2 border-x border-gray-400'
//                       colSpan='2'
//                     >
//                       Edit
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.map((item, index) => (
//                     <TableRow key={index} index={index} item={item} />
//                   ))}
//                 </tbody>
//               </table>
//             </section>
//           ) : (
//             'No data found'
//           )}

//           <div className='flex justify-center'>
//             {totalPages > 1 && (
//               <div className='my-2 flex '>
//                 <button
//                   className={`  mr-4 rounded-md border border-gray-400 px-2 hover:bg-[#5c67f5] hover:text-white ${
//                     page === 1 && 'cursor-not-allowed opacity-50'
//                   }`}
//                   onClick={() => setPage(page - 1)}
//                   disabled={page === 1}
//                 >
//                   Prev
//                 </button>
//                 <div className=' '>{renderPagination()}</div>
//                 <button
//                   className={`  ml-2 rounded-md border border-gray-400 px-2 hover:bg-[#5c67f5] hover:text-white ${
//                     page === totalPages && 'cursor-not-allowed opacity-50'
//                   } `}
//                   onClick={() => setPage(page + 1)}
//                   disabled={page === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//           <ModalUpdateUser
//             onClose={handleOnClose}
//             visible={showMyModal}
//             initialValues={val}
//             setSub={setSub}
//           />
//           <ModalDelete
//             onClose={handleOnClose2}
//             visible={showMyModal2}
//             Values={val}
//             setSub={setSub}
//             deletePopup='user'
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default VendorDetails;


