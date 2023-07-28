import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const priceRegex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;

const productSchema = Yup.object().shape({
  particular: Yup.string().required('Information is required*'),
  vchNo: Yup.string().required('Information is required*'),
  vendor: Yup.string().required('Information is required*'),
  quantity: Yup.string().matches(priceRegex, 'Invalid quantity'),
  // quantity: Yup.string().transform((value) => {
  //   // Remove any non-digit characters except dots and commas
  //   return value ? value.replace(/[^\d.,-]/g, '') : value;
  // }).test('valid-price', 'Invalid price format', (value) => {
  //   // Check the price format using a regular expression
  //   // The price format can have optional commas and a maximum of two decimal places
  //   return /^-?\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?$/.test(value);
  // }),
  price: Yup.string().matches(priceRegex, 'Invalid price'),
  // sizeUnit: Yup.string().required('Information is required*'),
  // productQuantity: Yup.string().required('Information is required*'),
});

const ModalAddOrder = ({
  visible,
  onClose,
  setSub,
  setErrorData,
  setDocAdded,
}) => {
  // const handleOnClose = (e) => {
  //   if (e.target.id === 'container') onClose();
  // };

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [next, setNext] = useState(true);
  const [customerID, setCustomerID] = useState('');
  const [err, setErr] = useState(0);

  useEffect(() => {
    setCustomerID(localStorage.getItem('customerID'));
  }, []);

  // useEffect(() => {
  //   console.log(errorData);
  // }, [errorData]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) return alert('No file selected for upload');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post('https://procuren-backend.onrender.com/importUser', formData)
      .then((response) => {
        setLoading(false);
        setSelectedFile(null);
        setSub(true);
        setDocAdded(true);
        onClose();
        setErr(0);
      })
      .catch((error) => {
        setLoading(false);
        setSelectedFile(null);
        setSub(false);
        // console.error(error);
        if (
          error.response.data.message ===
          `Invalid rows or duplicate entries found in document`
        ) {
          setErrorData(error.response.data.data);
          onClose();
        } else {
          setErr(2);
        }
        // console.error(error.response.data);
        // alert('Error ~ Invalid rows or duplicate entries found');
        // onClose();
      });
  };

  // fetch('https://procuren-backend.onrender.com/importUser', {
  //   // fetch('https://procuren-backend.onrender.com/uploads', {
  //   method: 'POST',
  //   body: formData,
  // })
  //   .then((response) => {
  //     // Handle the response from the backend
  //     // ...
  //     setLoading(false);
  //     setSelectedFile(null);
  //     setSub(true);
  //     setError(false);
  //     // onClose();
  //   })
  //   .catch((error) => {
  //     // Handle error
  //     alert("Error")
  //     setError(true);
  //     setLoading(false);
  //     console.error(error);
  //   });

  if (!visible) return null;

  const initialValues = {
    particular: '',
    vchNo: '',
    vendor: '',
    quantity: '',
    price: '',
  };

  // const notify = () =>
  // toast.error('Invalid rows or duplicate entries', {
  //   position: 'top-right',
  //   autoClose: 2000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: 'light',
  // });

  return (
    <div
      id='container'
      // onClick={handleOnClose}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'
    >
      <div className=' rounded bg-white p-2'>
        <div className='flex justify-around gap-2 px-10 py-10 '>
          <div
            className={`w-full cursor-pointer rounded-lg border px-10  py-3 hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-500 ${
              next === true && 'bg-gray-200 shadow-lg shadow-slate-500 '
            }`}
            onClick={() => setNext(true)}
          >
            <div className='  whitespace-nowrap  bg-gradient-to-tl from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-semibold uppercase text-transparent'>
              Single Entry
            </div>
          </div>
          <div
            className={`w-full cursor-pointer rounded-lg border px-10 py-3 hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-500 ${
              next === false && 'bg-gray-200 shadow-lg shadow-slate-500 '
            }`}
            onClick={() => setNext(false)}
          >
            <div className=' whitespace-nowrap bg-gradient-to-tr from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-semibold uppercase text-transparent'>
              Bulk Entry
            </div>
          </div>
        </div>
        {next ? (
          <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const token = localStorage.getItem('token');
              setLoading(true);
              axios
                .post(
                  `https://procuren-backend.onrender.com/client`,
                  // `http://localhost:3001/client`,
                  { ...values, userID: customerID },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => {
                  setSub(true);
                  resetForm({ values: initialValues });
                  onClose();
                  setLoading(false);
                  setDocAdded(true);
                  setErr(0);
                  if (response.data.status === true) {
                    setLoading(false);
                  } else {
                    // setError(error.message);
                    setLoading(false);
                  }
                  setSubmitting(false);
                })
                .catch((error) => {
                  // setError(error.message);
                  // setSub(true);
                  setLoading(false);
                  // alert('Error');
                  // onClose();
                  setErr(1);
                  console.log(error.response.data.message);
                  // alert(`${error.response.data.message}`);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className=' px-10 pb-10'>
                {/* <div className='mb-10 bg-gradient-to-tl from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-semibold uppercase text-transparent '>
                  Single Entry
                </div> */}

                <div className='grid grid-cols-1 gap-2 gap-y-4 md:grid-cols-2 lg:grid-cols-3 '>
                  <div className='md:col-span-2'>
                    <label
                      className='text-md block font-semibold text-gray-800'
                      htmlFor='particular'
                    >
                      Order*
                    </label>
                    <Field
                      className=' w-full  rounded-md border-2 bg-slate-100 p-2 '
                      name='particular'
                      id='particular'
                      // placeholder='Order details'
                    />
                    <ErrorMessage
                      name='particular'
                      component='div'
                      className='text-red-700'
                    />
                  </div>
                  <div>
                    <label
                      className='text-md flex  font-semibold text-gray-800'
                      htmlFor='vchNo'
                    >
                      Voucher No*
                    </label>
                    <Field
                      className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                      type='text'
                      name='vchNo'
                      id='vchNo'
                      // placeholder='Unique voucher no '
                    />
                    <ErrorMessage
                      name='vchNo'
                      component='div'
                      className='text-red-700'
                    />
                  </div>
                  <div>
                    <label
                      className='text-md block font-semibold text-gray-800'
                      htmlFor='vendor'
                    >
                      Vendor*
                    </label>
                    <Field
                      className='w-full rounded-lg border-2 bg-slate-100 px-4 py-2 focus:outline-none'
                      type='text'
                      name='vendor'
                      id='vendor'
                      // placeholder='Vendor name'
                    />
                    <ErrorMessage
                      name='vendor'
                      component='div'
                      className=' text-red-700'
                    />
                  </div>

                  <div>
                    <label
                      className='text-md block font-semibold text-gray-800'
                      htmlFor='quantity'
                    >
                      Quantity
                    </label>
                    <Field
                      className=' w-full max-w-xs rounded-md border-2 bg-slate-100 p-2 '
                      name='quantity'
                      id='quantity'
                      type='text'
                      // placeholder='Quantity of product'
                    />
                    <ErrorMessage
                      name='quantity'
                      component='div'
                      className=' text-red-700'
                    />
                  </div>
                  <div>
                    <label
                      className='text-md block font-semibold text-gray-800'
                      htmlFor='price'
                    >
                      Price
                    </label>
                    <Field
                      className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                      type='text'
                      name='price'
                      id='price'
                      // placeholder='Price'
                    />
                    <ErrorMessage
                      name='price'
                      component='div'
                      className=' text-red-700'
                    />
                  </div>

                  {/* <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='price'
                  >
                    Price
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='number'
                    name='price'
                    id='price'
                    placeholder='Enter the price with discount'
                  />
                  <ErrorMessage
                    name='price'
                    component='div'
                    className=' text-red-700'
                  />
                </div> */}

                  {/* <div>
                  <label
                    className='text-md flex  font-semibold text-gray-800'
                    htmlFor='availability'
                  >
                    Availability
                    <div className='text-sm text-gray-400'>( ~optional )</div>
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='select'
                    name='availability'
                    id='availability'
            
                  >
                    <option value={'Yes'}>Yes</option>
                    <option value={'No'}>No</option>
                  </Field>
                  <ErrorMessage
                    name='alternativeNumber'
                    component='div'
                    className='text-red-700'
                  />
                </div> 
                 <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='availability'
                  >
                    Availability
                  </label>
                  <Field
                    as='select'
                    className='w-full rounded-lg border  px-4 py-2  focus:outline-none '
                    name='availability'
                    id='availability'
                  >
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Field>
                  <ErrorMessage
                    name='availability'
                    component='div'
                    className='text-red-700'
                  />
                </div>*/}
                </div>
                <div className='flex justify-around gap-4'>
                  <button
                    onClick={onClose}
                    className=' mt-6  flex  w-1/3   justify-center rounded-lg border px-4 py-2  font-sans  text-lg font-semibold tracking-wide hover:border-red-600'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`mt-6 flex w-full justify-center rounded-lg bg-gradient-to-tr from-blue-600  to-[#cb67ac] py-2 font-sans   text-xl tracking-wide text-white shadow-xl shadow-indigo-200 ${
                      loading && 'cursor-wait'
                    } `}
                  >
                    {' '}
                    {loading ? 'Adding' : 'Add Order'}
                  </button>
                </div>
                {err === 1 && (
                  <div className='mt-2 text-sm text-red-500'>
                    Voucher number already exists.
                  </div>
                )}
                {/* <div>
                <div className='flex justify-center'>
                  <button
                    className='  mt-6 flex rounded-lg bg-gradient-to-tl from-blue-600 to-[#cb67ac] px-4 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-xl shadow-indigo-200'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {loading ? 'Adding' : 'Add Product'}
                  </button>
                </div>
                <div className='flex justify-end'>
                  <button
                    onClick={onClose}
                    className=' rounded bg-red-400 px-4 py-2 text-white'
                  >
                    Close
                  </button>
                </div>
              </div> */}
              </Form>
            )}
          </Formik>
        ) : (
          <div className='container mx-auto px-6 '>
            <input
              type='file'
              name=''
              id=''
              accept='.csv, .xlsx' // Set the accept attribute to only allow CSV files
              className=' w-full rounded-xl border px-3 py-2 file:mr-2 file:rounded-full  file:border-0 file:bg-gray-100 file:px-6 file:py-3 file:text-sm file:font-semibold file:text-violet-500  file:shadow-md file:shadow-gray-400 hover:file:cursor-pointer focus:border-indigo-500  '
              onChange={handleFileChange}
            />

            {/* <span className='text-red-500 pl-2'>Note: Only CSV files are accepted</span> */}
            <div className='my-6 flex justify-around gap-4'>
              <button
                onClick={onClose}
                className=' flex w-1/3 justify-center rounded-lg border px-4 py-2  font-sans  text-lg font-semibold tracking-wide hover:border-red-600'
              >
                Cancel
              </button>
              <button
                onClick={handleFileUpload}
                className={`w-full  rounded-lg   bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] py-1 text-center  text-white ${
                  loading && 'cursor-progress'
                }`}
              >
                {loading ? 'Uploading' : 'Upload'}
              </button>
            </div>
            {err === 2 && (
              <div className='mb-2 text-sm text-red-500'>
                Incorrect file type. Please upload a filename contains text
                CLIENT
              </div>
            )}
            {/* {Object.keys(errorData).length > 0 && (
              <div className='text-sm text-red-500'>
                Invalid rows or duplicate entries found in document <br />for more
                information check error tab.
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAddOrder;
