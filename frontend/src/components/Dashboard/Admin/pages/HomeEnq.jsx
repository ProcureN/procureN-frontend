import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import ExcelData from '../../ExcelData';
// import PdfData from '../../PdfData';
import { AiFillDelete, AiOutlineMenu } from 'react-icons/ai';
// import ModalAddProduct from './Modals/ModalAddProduct';
// import ModalUpdateProduct from './Modals/ModalUpdateProduct';

import { BiRefresh } from 'react-icons/bi';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';
import ModalDelete from './Modals/ModalDelete';

export function SortedDescendingIcon() {
  return <ExpandMoreIcon className='icon' />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className='icon' />;
}

export function UnsortedIcon() {
  return <SortIcon className='icon' />;
}

const HomeEnq = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [showMyModal2, setShowMyModal2] = useState(false);

  const [sub, setSub] = useState(false);
  const [val, setVal] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          'https://procuren-backend.onrender.com/getcontactform'
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
  const handleEdit = (row) => {
    setVal(row);
    setShowMyModal2(true);
  };

  const handleStatusChange = (row, newStatus) => {
    // const updatedRow = { ...row, status: newStatus };
    // Send the updated status to the backend using Axios call

    // .put(`/your-endpoint/${updatedRow.id}`, updatedRow)
    const token = localStorage.getItem('token');
    setSub(true);
    // console.log(updatedRow.id);
    axios
      .put(
        `https://procuren-backend.onrender.com/updateContactUs/${row.id}`,
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
    // { field: 'no', headerName: 'Sr. No.', width: '60', sortable: false },
    { field: 'date', headerName: 'Date',width: '110' },
    { field: 'time', headerName: 'Time' },
    { field: 'name', headerName: 'Name' },
    {
      field: 'email',
      headerName: 'Email',
      // width: '300',
      // flex: 1.5,
      flex: 1.5,
    },
    { field: 'phone', headerName: 'Phone', width: '120' },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'subject', headerName: 'Subject', flex: 1 },
    { field: 'selectRole', headerName: 'Role' },
    { field: 'message', headerName: 'Message' },
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
            width: '5.5rem',
            height: '2rem',
            marginLeft: '-.25rem',
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

    {
      field: 'delete',
      width: '10',
      headerName: <AiFillDelete className='text-lg' />,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => handleEdit(params.row)}>
          <AiFillDelete className='text-lg' />
        </button>
      ),
    },
  ];
  // let widths = ['10%', '15%', '24%', '16%', '16%', '19%'];
  // let bdy = [
  //   [
  //     'Date',
  //     'Name',
  //     'Email',
  //     'Phone',
  //     'Subject',
  //     'Message',
  //   ],
  //   ...data.map((item, index) => [
  //     // index + 1,
  //     item.date,
  //     item.name,
  //     item.email,
  //     item.phone,
  //     item.subject,
  //     item.message,
  //   ]),
  // ];
  const rows = data.map((item, index) => ({
    id: item._id,
    no: index + 1,
    ...item,
  }));

  // const handleOnClose = () => setShowMyModal(false);
  const handleOnClose2 = () => setShowMyModal2(false);

  // const handleOpen = () => {
  //   setShowMyModal2(true);
  //   setShowMyModal(false);
  // };

  return (
    <>
      <div className='my-2 flex  h-16 justify-between overflow-hidden rounded-md bg-gray-100 shadow-lg shadow-gray-400  md:mr-4'>
        <div className='my-auto pl-2 md:hidden '>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className='mx-auto my-auto bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text pr-1 text-center  font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
          Homepage Enquiries
        </div>
        {data.length > 0 && (
          <div className='hidden items-center pr-2 md:visible md:flex'>
            <BiRefresh
              className='mr-3 cursor-pointer text-4xl text-[#5c67f5] duration-500 hover:rotate-180'
              onClick={() => setSub(true)}
            />
            {/* <button
              onClick={handleOpen}
              className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
            >
              Add Order
            </button> */}

            <ExcelData data={data} fileName='Homepage Enquiries' />
            {/* <PdfData fileName='Homepage Enquiries' bdy={bdy} wid={widths} /> */}
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className='flex justify-between md:hidden'>
          <div className='flex'>
            {/* <button
              onClick={handleOpen}
              className='mx-2 rounded bg-gradient-to-tr  from-[#5c67f5] to-[#cb67ac] px-3 py-1  text-white'
            >
              Add Order
            </button> */}
          </div>
          <div className='flex'>
            <BiRefresh
              className='mx-4 cursor-pointer text-3xl duration-500 hover:rotate-180'
              onClick={() => setSub(true)}
            />
            <ExcelData data={data} fileName='Homepage Enquiries' />
            {/* <PdfData fileName='Homepage Enquiries' bdy={bdy} wid={widths} /> */}
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
              border: '0.1px solid', // Add the border style for the cell
              borderColor: 'lightgray', // Set the color of the border
              paddingBottom: '5px',
              paddingTop: '5px',
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
              // slots={{
              //   columnSortedDescendingIcon: SortedDescendingIcon,
              //   columnSortedAscendingIcon: SortedAscendingIcon,
              //   columnUnsortedIcon: UnsortedIcon,
              // }}
            />
          )}
        </Box>
      </div>
      {/* <ModalAddOrder
        onClose={handleOnClose2}
        visible={showMyModal2}
        setSub={setSub}
        setErrorData={setErrorData}
        errorData={errorData}
        setDocAdded={setDocAdded}
      />

      <ModalDuplicates
        onClose={handleOnClose}
        visible={showMyModal}
        data={errorData}
      /> */}

      {/* <ModalUpdateProduct
        onClose={handleOnClose}
        visible={showMyModal}
        initialValues={val}
        setSub={setSub}
      /> */}

      <ModalDelete
        onClose={handleOnClose2}
        visible={showMyModal2}
        Values={val}
        setSub={setSub}
        deletePopup='hompageEnquiry'
      />
    </>
  );
};

export default HomeEnq;
