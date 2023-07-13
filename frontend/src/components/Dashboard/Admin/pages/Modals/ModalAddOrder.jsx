import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const productSchema = Yup.object().shape({
  particular: Yup.string().required('Information is required*'),
  vchNo: Yup.string().required('Information is required*'),
  vendor: Yup.string().required('Information is required*'),
  quantity: Yup.number(),
  price: Yup.number(),
  // sizeUnit: Yup.string().required('Information is required*'),
  // productQuantity: Yup.string().required('Information is required*'),
});

const ModalAddOrder = ({ visible, onClose, setSub }) => {
  // const handleOnClose = (e) => {
  //   if (e.target.id === 'container') onClose();
  // };

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [next, setNext] = useState(true);

  const [customerID, setCustomerID] = useState('');

  useEffect(() => {
    setCustomerID(localStorage.getItem('customerID'));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) return alert('No file selected for upload');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('https://procuren-backend.onrender.com/importUser', {
      // fetch('https://procuren-backend.onrender.com/uploads', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        // Handle the response from the backend
        // ...
        setLoading(false);
        setSelectedFile(null);
        setSub(true);
        onClose();
      })
      .catch((error) => {
        // Handle error
        setLoading(false);
        console.error(error);
      });
  };

  if (!visible) return null;

  const initialValues = {
    particular: '',
    vchNo: '',
    vendor: '',
    quantity: '',
    price: '',
  };

  return (
    <div
      id='container'
      // onClick={handleOnClose}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'
    >
      <div className=' rounded bg-white p-2'>
      <div className='flex justify-around gap-2 px-10 py-10 '>
          <div
            className={`w-full cursor-pointer rounded-lg px-10 py-3  hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-500 border ${
              next === true && 'bg-gray-200 shadow-lg shadow-slate-500 '
            }`}
            onClick={() => setNext(true)}
          >
            <div
              
              className='  whitespace-nowrap  bg-gradient-to-tl from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-semibold uppercase text-transparent'
            >
              Single Entry
            </div>
          </div>
          <div
            className={`w-full cursor-pointer rounded-lg px-10 py-3 hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-500 border ${
              next === false && 'bg-gray-200 shadow-lg shadow-slate-500 '
            }`}
            onClick={() => setNext(false)}
          >
            <div
            
              className=' whitespace-nowrap bg-gradient-to-tr from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-semibold uppercase text-transparent'
            >
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
                  setSub(true);
                  setLoading(false);
                  alert('Error');
                  onClose();
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
                      placeholder='Enter your product name'
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
                      placeholder='Description of your product '
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
                      placeholder='Vendor'
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
                      placeholder='Quantity'
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
                      placeholder='Price'
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
                    type='submit'
                    disabled={isSubmitting}
                    className={`mt-6 flex w-full justify-center rounded-lg bg-gradient-to-tr from-blue-600  to-[#cb67ac] py-2 font-sans   text-xl tracking-wide text-white shadow-xl shadow-indigo-200 ${
                      loading && 'cursor-wait'
                    } `}
                  >
                    {' '}
                    {loading ? 'Adding' : 'Add Order'}
                  </button>
                  <button
                    onClick={onClose}
                    className=' mt-6  flex  w-1/3   justify-center rounded-lg border px-4 py-2  font-sans  text-lg font-semibold tracking-wide hover:border-red-600'
                  >
                    Cancel
                  </button>
                </div>
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
              className='   w-full rounded bg-gray-200 px-3 py-3'
              onChange={handleFileChange}
            />

            {/* <span className='text-red-500'>*No file selected</span> */}
            <div className=' my-6  flex justify-around gap-4  '>
              <button
                onClick={handleFileUpload}
                className={`w-full  rounded-lg   bg-gradient-to-tr from-blue-600 to-[#cb67ac] py-1 text-center  text-white ${
                  loading && 'cursor-pointer'
                }`}
              >
                {loading ? 'Uploading' : 'Upload'}
              </button>
              <button
                onClick={onClose}
                className=' flex   w-1/3   justify-center rounded-lg border px-4 py-2  font-sans  text-lg font-semibold tracking-wide hover:border-red-600'
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAddOrder;
