import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const productSchema = Yup.object().shape({
  productName: Yup.string().required('Information is required*'),
  category: Yup.string().required('Information is required*'),
  subCategory: Yup.string().required('Information is required*'),
  manufacturerName: Yup.string().required('Information is required*'),
  // priceBeforeDiscount: Yup.number().required('Information is required*'),
  price: Yup.number().required('Information is required*'),
  // withGST: Yup.number().required('Information is required*'),
  description: Yup.string().required('Information is required*'),
  // shippingCharges: Yup.number().required('Information is required*'),
  sizeUnit: Yup.string().required('Information is required*'),
  productQuantity: Yup.string().required('Information is required*'),
  availability: Yup.string().required('Information is required*'),
  // selectImage1: Yup.mixed()
  // .required('Image is required')
  // .test('fileType', 'Only PNG and JPEG images are allowed', (value) => {
  //   if (!value) {
  //     return false;
  //   }
  //   return ['image/png', 'image/jpeg'].includes(value.type);
  // }),
  // selectImage1: Yup.string(),
  // selectImage2: Yup.string(),
});

const ModalAddProduct = ({ visible, onClose, setSub }) => {
  useEffect(() => {
    setCustomerID(localStorage.getItem('customerID'));
  }, []);

  const [loading, setLoading] = useState(false);

  const [customerID, setCustomerID] = useState('');

  // const handleOnClose = (e) => {
  //   if (e.target.id === 'container') onClose();
  // };
  if (!visible) return null;
  const initialValues = {
    productName: '',
    category: '',
    subCategory: '',
    manufacturerName: '',
    price: '',
    description: '',
    sizeUnit: '',
    productQuantity: '',
    availability: 'Yes',
    // selectImage1: '',
    // selectImage2: '',
  };

  return (
    <div
      id='container'
      // onClick={handleOnClose}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'
    >
      <div className=' rounded bg-white p-2'>
        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem('token');
            setLoading(true);
            axios
              .post(
                `https://procuren-backend.onrender.com/addProducts`,
                // `http://localhost:3001/addProducts`,
                { ...values, costumerID: `${customerID}` },
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
                console.log(error.response.data.message);
                // alert(`${error.response.data.message}`);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className=' px-10 py-10'>
              <h1 className='mb-10 bg-gradient-to-tl from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-bold text-transparent lg:text-3xl xl:text-4xl'>
                Add Product
              </h1>

              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 '>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='productName'
                  >
                    Product Name
                  </label>
                  <Field
                    className='select w-full max-w-xs rounded-md border-2 bg-slate-100 p-2 '
                    name='productName'
                    id='productName'
                    placeholder='Enter your product name'
                  />
                  <ErrorMessage
                    name='productName'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md flex  font-semibold text-gray-800'
                    htmlFor='description'
                  >
                    Description
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='description'
                    id='description'
                    placeholder='Description of your product '
                  />
                  <ErrorMessage
                    name='description'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='category'
                  >
                    Category
                  </label>
                  <Field
                    className='w-full rounded-lg border-2 bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='category'
                    id='category'
                    placeholder='Category'
                  />
                  <ErrorMessage
                    name='category'
                    component='div'
                    className=' text-red-700'
                  />
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='subCategory'
                  >
                    Sub-category
                  </label>
                  <Field
                    className=' w-full max-w-xs rounded-md border-2 bg-slate-100 p-2 '
                    name='subCategory'
                    id='subCategory'
                    type='text'
                  />
                  <ErrorMessage
                    name='subCategory'
                    component='div'
                    className=' text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='manufacturerName'
                  >
                    Manufacturer Name
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='manufacturerName'
                    id='manufacturerName'
                    placeholder='Manufacturer name'
                  />
                  <ErrorMessage
                    name='manufacturerName'
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
                </div>

                <div className=''>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='sizeUnit'
                  >
                    Size Unit
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='sizeUnit'
                    id='sizeUnit'
                    placeholder='Enter your size unit'
                  />
                  <ErrorMessage
                    name='sizeUnit'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='productQuantity'
                  >
                    Product Quantity
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='productQuantity'
                    id='productQuantity'
                    placeholder='Enter your product total quantity'
                  />
                  <ErrorMessage
                    name='productQuantity'
                    component='div'
                    className='text-red-700'
                  />
                </div>
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
                </div> */}
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
                </div>
              </div>

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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalAddProduct;
