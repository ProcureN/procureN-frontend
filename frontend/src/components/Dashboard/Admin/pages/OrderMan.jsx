import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';
import ExcelData from '../../ExcelData';
import PdfData from '../../PdfData';
import { AiOutlineMenu } from 'react-icons/ai';
// import ModalAddProduct from './Modals/ModalAddProduct';
// import ModalUpdateProduct from './Modals/ModalUpdateProduct';
import ModalAddOrder from './Modals/ModalAddOrder';
import { BiCommentError, BiRefresh } from 'react-icons/bi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDuplicates from './Modals/ModalDuplicates';

const OrderMan = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [showMyModal2, setShowMyModal2] = useState(false);
  const [showMyModal, setShowMyModal] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [docAdded, setDocAdded] = useState(false);

  const [sub, setSub] = useState(false);
  // const [val, setVal] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          'https://procuren-backend.onrender.com/getclient'
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
    if (Object.keys(errorData).length > 0) notify();
  }, [errorData]);

  useEffect(() => {
    if (docAdded) {
      notify2()
      setDocAdded(false)
    }
  }, [docAdded]);

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
        `https://procuren-backend.onrender.com/updateclient/${row.id}`,
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
        setSub(true);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const statusOptions = ['Pending', 'Approved', 'Rejected'];

  const columns = [
    { field: 'no', headerName: 'Sr No', width: '50' },
    { field: 'date', headerName: 'Date', width: '130' },
    {
      field: 'particular',
      headerName: 'Particulars',
      width: '300',
    },
    { field: 'vchNo', headerName: 'Vch No' },
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
            fontSize: '0.6rem',
            // marginTop: '10px',
            // marginBottom: '10px',
            // border:"0px"
          }}
         
        >
          {statusOptions.map((option) => (
            <MenuItem  key={option} value={option}>
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
  let widths = ['30%', '15%', '23%', '14%', '12%', '14%'];
  let bdy = [
    [
      // 'No',
      'Particulars',
      'Vch No',
      'Vendor',
      'Quantity',
      'Price',
      'Status',
    ],
    ...data.map((item, index) => [
      // index + 1,
      item.particular,
      item.vchNo,
      item.vendor,
      item.quantity,
      item.price,
      item.status,
    ]),
  ];
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
      <div className='my-2 flex  h-16 justify-between overflow-hidden rounded-md bg-gray-100 shadow-lg shadow-gray-400  md:mr-4'>
        <div className='my-auto pl-2'>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className='my-auto bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text pr-1 text-center  font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
          Order Management
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
              className='cursor-pointer text-4xl text-[#5c67f5]'
              onClick={() => setSub(true)}
            />
            <button
              onClick={handleOpen}
              className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
            >
              Add Order
            </button>

            <ExcelData data={data} fileName='Order Management' />
            <PdfData fileName='Order Management' bdy={bdy} wid={widths} />
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
              className='mx-2 cursor-pointer text-3xl'
              onClick={() => setSub(true)}
            />
            <ExcelData data={data} fileName='Order Management' />
            <PdfData fileName='Order Management' bdy={bdy} wid={widths} />
          </div>
        </div>
      )}
      <div className=' overflow-hidden '>
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
            />
          )}
        </Box>
      </div>
      <ModalAddOrder
        onClose={handleOnClose2}
        visible={showMyModal2}
        setSub={setSub}
        setErrorData={setErrorData}
        errorData={errorData}
        setDocAdded= {setDocAdded}
      />

      <ModalDuplicates
        onClose={handleOnClose}
        visible={showMyModal}
        data={errorData}
      />

      <ToastContainer />

      {/* <ModalUpdateProduct
        onClose={handleOnClose}
        visible={showMyModal}
        initialValues={val}
        setSub={setSub}
      /> */}
    </>
  );
};

export default OrderMan;
