import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';
import ExcelData from '../../ExcelData';
// import PdfData from '../../PdfData';
import { AiOutlineMenu } from 'react-icons/ai';
import ModalAddVendor from './Modals/ModalAddVendor';
// import ModalAddProduct from './Modals/ModalAddProduct';
// import ModalUpdateProduct from './Modals/ModalUpdateProduct';

import { BiCommentError, BiRefresh } from 'react-icons/bi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDuplicates from './Modals/ModalDuplicates';

const VendorMan = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [showMyModal, setShowMyModal] = useState(false);
  const [showMyModal2, setShowMyModal2] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [docAdded, setDocAdded] = useState(false);

  const [sub, setSub] = useState(false);
  // const [val, setVal] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          'https://procuren-backend.onrender.com/getVendor'
        );
        // console.log(res);
        setData(res.data.data);
        setLoading(false);
        setSub(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [sub]);

  const notify = () =>
    toast.error('Invalid rows or duplicate entries (check error tab)', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const notify2 = () =>
    toast.success('Document added successfully.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  useEffect(() => {
    if (docAdded) {
      notify2();
      setDocAdded(false);
    }
  }, [docAdded]);

  useEffect(() => {
    if (Object.keys(errorData).length > 0) notify();
  }, [errorData]);

  // const columns = [
  //   { field: '_id', headerName: 'ID' },
  //   // {
  //   //   field: "name",
  //   //   headerName: "Name",
  //   //   flex: 1,
  //   //   cellClassName: "name-column--cell",
  //   // },
  //   {
  //     field: 'date',
  //     headerName: 'Date',
  //     // flex: 1,
  //   },
  //   {
  //     field: 'particular',
  //     headerName: 'particular',
  //     // flex: 1,
  //   },
  //   {
  //     field: 'vchNo',
  //     headerName: 'vchNo',
  //     // flex: 1,
  //   },
  //   {
  //     field: 'vendor',
  //     headerName: 'vendor',
  //     // flex: 1,
  //   },

  //   {
  //     field: 'quantity',
  //     headerName: 'quantity',
  //     // flex: 1,
  //   },
  //   {
  //     field: 'price',
  //     headerName: 'price',
  //     // flex: 1,
  //   },
  // ];
  // const handleEdit = (x) => {
  //   setVal(x);
  //   setShowMyModal(true);
  // };

  const handleStatusChange = (row, newStatus) => {
    // const updatedRow = { ...row, status: newStatus };
    // Send the updated status to the backend using Axios call

    // .put(`/your-endpoint/${updatedRow.id}`, updatedRow)
    const token = localStorage.getItem('token');
    setSub(true);
    // console.log(updatedRow.id);
    axios
      .put(
        `https://procuren-backend.onrender.com/updateVendor/${row.id}`,
        // `http://localhost:3001/updateclient/${row.id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Handle the response from the backend
        console.log(response);
        // Set the sub state to trigger a data reload
        // setSub(true);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const statusOptions = ['Pending', 'Approved', 'Rejected'];

  const columns = [
    { field: 'no', headerName: 'Sr. No.', width: '60',sortable: false },
    { field: 'date', headerName: 'Date', width: '130' },
    {
      field: 'particular',
      headerName: 'Particulars',
      // width: '300',
      flex:1
    },
    { field: 'vchNo', headerName: 'Vch No.' },
    { field: 'vendor', headerName: 'Vendor', width: '300' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'price', headerName: 'Price' },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row, e.target.value)}
          style={{
            backgroundColor:
              params.row.status === 'Pending'
                ? '#f5d889'
                : params.row.status === 'Approved'
                ? '#8db598'
                : '#eb8888',
            // color: 'black',
            fontSize: '0.7rem',
            width:"5.5rem",
            height:"2rem",
            marginLeft:"-.25rem"
            // marginTop: '10px',
            // marginBottom: '10px',
            // border:"0px"
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },

    // {
    //   field: 'edit',
    //   headerName: 'Edit',

    //   renderCell: (params) => (
    //     <button onClick={() => handleEdit(params.row)}>Edit</button>
    //   ),
    // },
  ];
  // let widths = ['30%', '15%', '23%', '14%', '12%', '14%'];
  // let bdy = [
  //   [
  //     // 'No',
  //     'Particulars',
  //     'Vch No.',
  //     'Vendor',
  //     'Quantity',
  //     'Price',
  //     'Status',
  //   ],
  //   ...data.map((item, index) => [
  //     // index + 1,
  //     item.particular,
  //     item.vchNo,
  //     item.vendor,
  //     item.quantity,
  //     item.price,
  //     item.status,
  //   ]),
  // ];
  const rows = data.map((item, index) => ({
    id: item._id,
    no: index + 1,
    ...item,
  }));

  const handleOnClose = () => setShowMyModal(false);
  const handleOnClose2 = () => setShowMyModal2(false);

  const handleOpen = () => {
    setShowMyModal2(true);
    setShowMyModal(false);
  };

  return (
    <>
      <div className='my-2  flex  h-16 justify-between overflow-hidden rounded-md bg-gray-100 shadow-lg shadow-gray-400  md:mr-4'>
        <div className='my-auto pl-2 md:hidden'>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className='mx-auto my-auto bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
          Vendor Management
        </div>
        {data.length > 0 && (
          <div className='hidden items-center pr-2 md:visible md:flex'>
            {Object.keys(errorData).length > 0 && (
              <BiCommentError
                className='mr-2 cursor-pointer text-3xl text-red-600'
                onClick={() => setShowMyModal(true)}
              />
            )}
            <BiRefresh
              className='cursor-pointer text-4xl text-[#5c67f5] hover:rotate-180 duration-500'
              onClick={() => setSub(true)}
            />
            <button
              onClick={handleOpen}
              className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
            >
              Add Order
            </button>

            <ExcelData data={data} fileName=' Vendor Management' />
            {/* <PdfData fileName=' Vendor Management' bdy={bdy} wid={widths} /> */}
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className='flex justify-between md:hidden'>
          <div className='flex'>
            <button
              onClick={handleOpen}
              className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
            >
              Add Order
            </button>
            {Object.keys(errorData).length > 0 && (
              <BiCommentError
                className='mr-2 cursor-pointer text-3xl text-red-600'
                onClick={() => setShowMyModal(true)}
              />
            )}
          </div>
          <div className='flex'>
            <BiRefresh
              className='mx-2 cursor-pointer text-3xl hover:rotate-180 duration-500'
              onClick={() => setSub(true)}
            />
            <ExcelData data={data} fileName=' Vendor Management' />
            {/* <PdfData fileName=' Vendor Management' bdy={bdy} wid={widths} /> */}
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
              options={{ exportFileName: 'Vendor Management' }}
              // slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
            />
          )}
        </Box>
      </div>
      <ModalAddVendor
        onClose={handleOnClose2}
        visible={showMyModal2}
        setSub={setSub}
        setErrorData={setErrorData}
        errorData={errorData}
        setDocAdded={setDocAdded}
      />
      {/* <ModalUpdateProduct
        onClose={handleOnClose}
        visible={showMyModal}
        initialValues={val}
        setSub={setSub}
      /> */}

      <ModalDuplicates
        onClose={handleOnClose}
        visible={showMyModal}
        data={errorData}
      />

      <ToastContainer />
    </>
  );
};

export default VendorMan;

// import React, { useState } from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { Box } from '@mui/material';
// import { useEffect } from 'react';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// import axios from 'axios';
// import ExcelData from '../../ExcelData';
// import PdfData from '../../PdfData';
// import { AiOutlineMenu } from 'react-icons/ai';
// // import ModalAddProduct from './Modals/ModalAddProduct';
// // import ModalUpdateProduct from './Modals/ModalUpdateProduct';
// import ModalAddVendor from './Modals/ModalAddVendor';

// const VendorMan = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [data, setData] = useState([]);
//   const [showMyModal3, setShowMyModal3] = useState(false);
//   // const [showMyModal, setShowMyModal] = useState(false);

//   const [sub, setSub] = useState(false);
//   // const [val, setVal] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           'https://procuren-backend.onrender.com/getVendor/1/1000'
//         );
//         // console.log(res);
//         setData(res.data.data);
//         setLoading(false);
//         setSub(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [sub]);

//   // const columns = [
//   //   { field: '_id', headerName: 'ID' },
//   //   // {
//   //   //   field: "name",
//   //   //   headerName: "Name",
//   //   //   flex: 1,
//   //   //   cellClassName: "name-column--cell",
//   //   // },
//   //   {
//   //     field: 'date',
//   //     headerName: 'Date',
//   //     // flex: 1,
//   //   },
//   //   {
//   //     field: 'particular',
//   //     headerName: 'particular',
//   //     // flex: 1,
//   //   },
//   //   {
//   //     field: 'vchNo',
//   //     headerName: 'vchNo',
//   //     // flex: 1,
//   //   },
//   //   {
//   //     field: 'vendor',
//   //     headerName: 'vendor',
//   //     // flex: 1,
//   //   },

//   //   {
//   //     field: 'quantity',
//   //     headerName: 'quantity',
//   //     // flex: 1,
//   //   },
//   //   {
//   //     field: 'price',
//   //     headerName: 'price',
//   //     // flex: 1,
//   //   },
//   // ];
//   // const handleEdit = (x) => {
//   //   setVal(x);
//   //   setShowMyModal(true);
//   // };

//   const handleStatusChange = (row, newStatus) => {
//     // const updatedRow = { ...row, status: newStatus };
//     // Send the updated status to the backend using Axios call

//     // .put(`/your-endpoint/${updatedRow.id}`, updatedRow)
//     const token = localStorage.getItem('token');
//     setSub(true);
//     // console.log(updatedRow.id);
//     axios
//       .put(
//         `https://procuren-backend.onrender.com/updateVendor/${row.id}`,
//         // `http://localhost:3001/updateclient/${row.id}`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       .then((response) => {
//         // Handle the response from the backend
//         console.log(response);
//         // Set the sub state to trigger a data reload
//         setSub(true);
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error(error);
//       });
//   };

//   const statusOptions = ['Pending', 'Approved', 'Rejected'];

//   const columns = [
//     { field: 'no', headerName: 'Sr. No', width:"50" },
//     { field: 'date', headerName: 'Date', },
//     {
//       field: 'particular',
//       headerName: 'Particular',
//       width:400,
//     },
//     { field: 'vchNo', headerName: 'Vch No' },
//     { field: 'vendor', headerName: 'Vendor', width:200 },
//     { field: 'quantity', headerName: 'Quantity' },
//     { field: 'price', headerName: 'Price' },
//     {
//       field: 'status',
//       headerName: 'Status',

//       renderCell: (params) => (
//         <Select
//           value={params.row.status}
//           onChange={(e) => handleStatusChange(params.row, e.target.value)}
//         >
//           {statusOptions.map((option) => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       ),
//     },
//     // {
//     //   field: 'edit',
//     //   headerName: 'Edit',

//     //   renderCell: (params) => (
//     //     <button onClick={() => handleEdit(params.row)}>Edit</button>
//     //   ),
//     // },
//   ];
//   let widths = ['30%', '15%', '23%', '14%', '12%', '14%'];
//   let bdy = [
//     [
//       // 'No',
//       'Particular',
//       'Vch No',
//       'Vendor',
//       'Quantity',
//       'Price',
//       'Status',
//     ],
//     ...data.map((item, index) => [
//       // index + 1,
//       item.particular,
//       item.vchNo,
//       item.vendor,
//       item.quantity,
//       item.price,
//       item.status,
//     ]),
//   ];
//   const rows = data.map((item, index) => ({
//     id: item._id,
//     no: index + 1,
//     ...item,
//   }));

//   // const handleOnClose = () => setShowMyModal(false);
//   const handleOnClose3 = () => setShowMyModal3(false);

//   return (
//     <>
//       <div className='my-2 flex h-16 justify-between rounded-md bg-gray-100 shadow md:mr-4'>
//         <div className='my-auto pl-2'>
//           <AiOutlineMenu
//             className=' cursor-pointer text-3xl text-[#5c67f5] '
//             onClick={() => setOpen(!open)}
//           />
//         </div>

//         <div className='mx-auto my-auto bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
//           Vendor Management
//         </div>
//         {data.length > 0 && (
//           <div className='hidden items-center pr-2 md:visible md:flex'>
//             <button
//               onClick={() => setShowMyModal3(true)}
//               className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
//             >
//               Add Order <span className='animate-pulse text-xl'>+</span>
//             </button>
//             <ExcelData data={data} fileName='Vendor Management' />
//             <PdfData fileName='Vendor Management' bdy={bdy} wid={widths} />
//           </div>
//         )}
//       </div>
//       {data.length > 0 && (
//         <div className='flex justify-between md:hidden'>
//           <ExcelData data={data} fileName='Vendor Management' />
//           <PdfData fileName='Vendor Management' bdy={bdy} wid={widths} />
//         </div>
//       )}
//       <div>
//         <Box
//           m='0 20px 0 20px'
//           height='80vh'
//           width="auto"

//           sx={{
//             '& .MuiDataGrid-root': {
//               border: '1',
//             },
//             '& .MuiDataGrid-cell': {
//               border: '1',
//               borderRight:"1"
//             },
//             '& .name-column--cell': {
//               // borderRight:"1"
//               // color: colors.greenAccent[300],
//             },
//             '& .MuiDataGrid-columnHeaders': {
//               // backgroundColor: colors.blueAccent[700],
//               background: 'linear-gradient(to top right, #5c67f5, #cb67ac)',
//               border: '1',
//               color: 'white',
//             },
//             '& .MuiDataGrid-virtualScroller': {
//               // backgroundColor: colors.primary[400],
//             },
//             '& .MuiDataGrid-footerContainer': {
//               borderTop: '1',
//               // backgroundColor: colors.blueAccent[700],
//             },
//             '& .MuiCheckbox-root': {
//               // color: `${colors.greenAccent[200]} !important`,
//             },
//           }}
//         >
//           {loading ? (
//             <div>Loading</div>
//           ) : error ? (
//             'Error ~ Something went wrong :)'
//           ) : (
//             <DataGrid
//               // checkboxSelection
//               rows={rows}
//               columns={columns}
//               components={{ Toolbar: GridToolbar }}
//               getRowHeight={() => 'auto'}

//             />
//           )}
//         </Box>
//       </div>
//       <ModalAddVendor
//         onClose={handleOnClose3}
//         visible={showMyModal3}
//         setSub={setSub}
//       />
//       {/* <ModalUpdateProduct
//         onClose={handleOnClose}
//         visible={showMyModal}
//         initialValues={val}
//         setSub={setSub}
//       /> */}
//     </>
//   );
// };

// export default VendorMan;
