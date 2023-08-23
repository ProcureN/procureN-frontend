import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const phoneRegExp = /^(\+91-|\+91|0)?\d{10}$/;
const pincodeRegExp = /^[0-9]{6}$/;

const SignupSchema = Yup.object().shape({
  productName: Yup.string().required('Information is required*'),
  otherProduct: Yup.string(),
  quantity: Yup.string(),
  name: Yup.string().required('Information is required*'),
  contact: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Information is required*'),
  alternativeNumber: Yup.string().matches(phoneRegExp, 'Invalid phone number'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Information is required*'),
  password: Yup.string(),
  state: Yup.string().required('Information is required*'),
  city: Yup.string().required('Information is required*'),
  billingAddress: Yup.string().required('Information is required*'),
  shippingPincode: Yup.string()
    .matches(pincodeRegExp, 'Invalid Pincode')
    .required('Information is required*'),
});

const ModalUpdate = ({ visible, onClose, initialValues, setSub }) => {
  let state = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`https://procuren-backend-g6z9.onrender.com/getproductnames`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        alert(`${error.response.data.message}`);
        // setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };
  if (!visible) return null;
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'
    >
      <div className=' rounded bg-white'>
        <Formik
          initialValues={{
            productName: initialValues.productName,
            otherProduct: initialValues.otherProduct,
            quantity: initialValues.quantity,
            name: initialValues.name,
            email: initialValues.email,
            contact: initialValues.contact,
            alternativeNumber: initialValues.alternativeNumber,
            city: initialValues.city,
            state: initialValues.state,
            billingAddress: initialValues.billingAddress,
            shippingPincode: initialValues.shippingPincode,
            status: initialValues.status,
            deliveryStatus: initialValues.deliveryStatus,
          }}
          // initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            const token = localStorage.getItem('token');
            values = { ...values };
            setLoading(true);

            axios
              .put(
                `https://procuren-backend-g6z9.onrender.com/updateCostumersEnquiry/${initialValues._id}`,
                // `http://localhost:3001/UpdateCostumer/${initialValues._id}`,
                values,

                {
                  headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
                }
              )
              .then((response) => {
                setLoading(false);
                setSub(true);
                onClose();
                setSubmitting(false);
              })
              .catch((error) => {
                setSub(true);
                // setError(error.message);
                setLoading(false);
                alert(`${error.response.data.message}`);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className=' rounded-xl  px-10 py-10'>
              <h1 className='mb-10 bg-gradient-to-tl from-blue-600 to-[#cb67ac] bg-clip-text text-center font-sans text-3xl font-semibold text-transparent '>
                Update Customer Enquiry Form
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
                    as='select'
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    name='productName'
                    id='productName'
                  >
                    <option className=' ' disabled></option>
                    {product.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name='productName'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='otherProduct'
                  >
                    Other Product
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='otherProduct'
                    id='otherProduct'
                    placeholder='Enter other product name'
                  />
                  <ErrorMessage
                    name='otherProduct'
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
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='quantity'
                    id='quantity'
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
                    htmlFor='name'
                  >
                    Name
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Name'
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    className=' text-red-700'
                  />
                </div>
                <div className='lg:col-span-2'>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Enter your email address'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='contact'
                  >
                    Phone Number
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='contact'
                    id='contact'
                    placeholder='Enter your phone number'
                  />
                  <ErrorMessage
                    name='contact'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md flex  font-semibold text-gray-800'
                    htmlFor='alternativeNumber'
                  >
                    Alternative No.
                    <div className='text-sm text-gray-600'>( ~ optional )</div>
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='number'
                    name='alternativeNumber'
                    id='alternativeNumber'
                    // placeholder='Enter alternative number'
                  />
                  <ErrorMessage
                    name='alternativeNumber'
                    component='div'
                    className='text-red-700'
                  />
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='confirm'
                  >
                    City
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='city'
                    id='city'
                    placeholder='Enter your city name'
                  />

                  <ErrorMessage
                    name='city'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='state'
                  >
                    Select State
                  </label>
                  <Field
                    as='select'
                    // className=' w-full max-w-xs rounded-md border p-2'
                    className='max-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    name='state'
                    id='state'
                    placeholder='. '
                  >
                    <option disabled></option>
                    {state.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name='state'
                    component='div'
                    className='text-red-700'
                  />
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='billingAddress'
                  >
                    Billing Address
                  </label>
                  <Field
                    as='textarea'
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='billingAddress'
                    id='billingAddress'
                    placeholder='Enter your billing address'
                  />
                  <ErrorMessage
                    name='billingAddress'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='shippingPincode'
                  >
                    Shipping Pincode
                  </label>
                  <Field
                    className='w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='shippingPincode'
                    id='shippingPincode'
                    placeholder='Enter your city pincode'
                  />
                  <ErrorMessage
                    name='shippingPincode'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='status'
                  >
                    Update Status
                  </label>
                  <Field
                    as='select'
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none '
                    name='status'
                    id='status'
                  >
                    <option className='text-sm text-gray-500' disabled></option>
                    <option value='Pending'>Pending</option>
                    <option value='Approved'>Approved</option>
                    <option value='Rejected'>Rejected</option>
                  </Field>
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='deliveryStatus'
                  >
                    Update Delivery Status
                  </label>
                  <Field
                    as='select'
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none '
                    name='deliveryStatus'
                    id='deliveryStatus'
                  >
                    <option className='text-sm text-gray-500' disabled></option>
                    <option value='Processing'>Processing</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='InTransit'>in Transit</option>
                    <option value='Delivered'>Delivered</option>
                  </Field>
                </div>
              </div>

              <div className='flex justify-center'>
                <button
                  className='  mt-6 flex rounded-lg bg-gradient-to-tl from-blue-600 to-[#cb67ac] px-4 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-xl shadow-indigo-200'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {loading ? 'Loading...' : 'Update Enquiry'}
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

export default ModalUpdate;
