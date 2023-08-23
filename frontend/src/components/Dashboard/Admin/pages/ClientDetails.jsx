import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useEffect } from 'react';

import axios from 'axios';
import ExcelData from '../../ExcelData';
// import PdfData from '../../PdfData';
import { AiOutlineMenu } from 'react-icons/ai';

import { BiRefresh } from 'react-icons/bi';

const ClientDetails = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [sub, setSub] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(
  //         'https://procuren-backend-g6z9.onrender.com/getclient/1/100'
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
          `https://procuren-backend-g6z9.onrender.com/getroles`,
          // `http://localhost:3001/getroles/${page}/${limit}`,

          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              selectRole: 'Client',
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
    { field: 'jobTitle', headerName: 'Job',width: '150'  },
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
  // let widths = ['4%', '10%', '15%', '40%', '15%', '15%'];
  // let bdy = [
  //   ['No', 'Name', 'Phone', 'Email', 'Company', 'State'],

  //   ...data.map((item, index) => [
  //     index + 1,
  //     item.name,
  //     item.phone,
  //     item.email,
  //     item.company,
  //     item.state,
  //   ]),
  // ];

  const rows = data.map((item, index) => ({
    id: item._id,
    no: index + 1,
    ...item,
  }));

  // const handleOnClose = () => setShowMyModal(false);

  return (
    <>
      <div className='my-2 flex  h-16 justify-between overflow-hidden rounded-md bg-gray-100 shadow-lg shadow-gray-400  md:mr-4'>
        <div className='my-auto pl-2 md:hidden'>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div> 

        <div className='mx-auto my-auto bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-xl font-semibold text-transparent  lg:text-2xl'>
          Client Details
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

            <ExcelData data={data} fileName='Client Details' />
            {/* <PdfData fileName='Client Details' bdy={bdy} wid={widths} /> */}
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
            <ExcelData data={data} fileName='Client Details' />
            {/* <PdfData fileName='Client Details' bdy={bdy} wid={widths} /> */}
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

export default ClientDetails;
