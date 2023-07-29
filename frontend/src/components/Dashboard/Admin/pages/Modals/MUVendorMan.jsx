import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const priceRegex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;

const productSchema = Yup.object().shape({
  particular: Yup.string().required('Information is required*'),
  vchNo: Yup.string().required('Information is required*'),
  vendor: Yup.string().required('Information is required*'),
  quantity: Yup.string().matches(priceRegex, 'Invalid quantity'),
  price: Yup.string().matches(priceRegex, 'Invalid price'),
});

const MUVendorMan = ({
  visible,
  onClose,
  setSub,
  initialValues,
}) => {
  // const handleOnClose = (e) => {
  //   if (e.target.id === 'container') onClose();
  // };

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(0);



  if (!visible) return null;

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      await axios.delete(
        `https://procuren-backend.onrender.com/DeleteVendor/${initialValues._id}`,
        // `http://localhost:3001/deletecostumer/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoading(false);
      setSub(true);
      onClose();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // const initialValues = {
  //   particular: '',
  //   vchNo: '',
  //   vendor: '',
  //   quantity: '',
  //   price: '',
  // };

  return (
    <div
      id='container'
      // onClick={handleOnClose}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'
    >
      <div className=' rounded bg-white p-2'>
        <div className='flex justify-around gap-2 px-10 py-10 '>
          <div
            className={`' } w-full cursor-pointer rounded-lg  border bg-gray-200 px-10 py-3 shadow-lg shadow-slate-500 hover:bg-gray-200 hover:shadow-lg
            hover:shadow-gray-500`}
          >
            <div className='  whitespace-nowrap  bg-gradient-to-tl from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-semibold uppercase text-transparent'>
              Update Entry
            </div>
          </div>
          <div
            className='group relative my-auto cursor-pointer border p-3 bg-gray-200 shadow-lg shadow-slate-500 rounded-lg'
            onClick={handleDelete}
          >
            <AiOutlineDelete className='text-2xl lg:text-3xl text-red-600' />
            <div className='absolute right-2 top-10 hidden whitespace-nowrap rounded-xl bg-red-600 px-3 py-2 text-sm text-white group-hover:block'>
              {loading?'Processing':"Delete Entry"}
            </div>
          </div>
        </div>

        <Formik
          initialValues={{
            particular: initialValues.particular,
            vchNo: initialValues.vchNo,
            vendor: initialValues.vendor,
            quantity: initialValues.quantity,
            price: initialValues.price,
          }}
          validationSchema={productSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem('token');
            const userID = localStorage.getItem('userID');
            setLoading(true);
            axios
              .put(
                `https://procuren-backend.onrender.com/updateVendor/${initialValues._id}`,
                // `http://localhost:3001/client`,
                { ...values, userID: userID },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then((response) => {
                setSub(true);
                resetForm({ values: initialValues });
                onClose();
                setLoading(false);
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
                  {loading ? 'Updating' : 'Update'}
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
      </div>
    </div>
  );
};

export default MUVendorMan;



