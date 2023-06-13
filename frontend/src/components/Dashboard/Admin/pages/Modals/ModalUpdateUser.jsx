import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// const phoneRegExp = /^(\+91-|\+91|0)?\d{10}$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Information is required*'),
  city: Yup.string().required('Information is required*'),
  state: Yup.string().required('Information is required*'),
  company: Yup.string().required('Information is required*'),
  jobTitle: Yup.string().required('Information is required*'),
  selectRole: Yup.string().required('Information is required*'),
  // phone: Yup.string()
  //   .matches(phoneRegExp, 'Invalid phone number')
  //   .required('Information is required*'),
  // email: Yup.string()
  //   .email('Invalid email address')
  //   .required('Information is required*'),
});

const ModalUpdateUser = ({ visible, onClose, initialValues, setSub }) => {
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
      <div className=' rounded '>
        <Formik
          initialValues={{
            name: initialValues.name,
            // email: initialValues.email,

            selectRole: initialValues.selectRole,
            company: initialValues.company,
            jobTitle: initialValues.jobTitle,
            // phone: initialValues.phone,
            state: initialValues.state,
            city: initialValues.city,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            const token = localStorage.getItem('token');
            setLoading(true);

            axios
              .put(
                `https://procuren-backend-g6z9.onrender.com/UpdateCostumer/${initialValues._id}`,
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
                onClose();
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className=' min-w-full rounded-b-lg bg-white p-4  text-center md:p-10'>
              <h1 className='mb-4 bg-gradient-to-tl  from-blue-600 to-pink-500 bg-clip-text text-center font-sans text-3xl font-semibold text-transparent'>
                Update Customer Details
              </h1>
              {/* <div className='mb-10 h-0.5 rounded-full  bg-gradient-to-tl from-blue-600 to-pink-500 ' /> */}

              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='name'
                  >
                    Name
                  </label>
                  <Field
                    className='w-full rounded-lg border-2 border-slate-400 bg-gray-100 px-4 py-2 shadow-xl focus:outline-none'
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
                    className='w-full rounded-lg  border-2 border-slate-400 px-4 py-2  shadow-xl focus:outline-none'
                    type='text'
                    name='email'
                    id='email'
                    disabled
                    placeholder={initialValues.email}
                  />
                  {/* <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-700'
                  /> */}
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='phone'
                  >
                    Phone Number
                  </label>
                  <Field
                    className='w-full rounded-lg  border-2 border-slate-400 px-4 py-2  shadow-xl focus:outline-none'
                    type='text'
                    name='phone'
                    id='phone'
                    disabled
                    placeholder={initialValues.phone}
                  />
                  {/* <ErrorMessage
                    name='phone'
                    component='div'
                    className='text-red-700'
                  /> */}
                </div>
                <div className='lg:col-span-2'>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='company'
                  >
                    Company Name
                  </label>
                  <Field
                    className='w-full rounded-lg  border-2 border-slate-400 px-4 py-2  shadow-xl focus:outline-none'
                    type='text'
                    name='company'
                    id='company'
                    placeholder='Company name'
                  />
                  <ErrorMessage
                    name='company'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='selectRole'
                  >
                    Select Role
                  </label>
                  <Field
                    as='select'
                    className='w-full rounded-lg  border-2 border-slate-400 px-4 py-2  shadow-xl focus:outline-none '
                    name='selectRole'
                    id='selectRole'
                  >
                    {/* <option className='text-sm text-gray-500' disabled></option> */}
                    <option value='Retailer'>Retailer</option>
                    <option value='Manufacturer'>Manufacturer</option>
                  </Field>
                  <ErrorMessage
                    name='selectRole'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='jobTitle'
                  >
                    Job Title
                  </label>
                  <Field
                    className='w-full rounded-lg  border-2 border-slate-400 px-4 py-2  shadow-xl focus:outline-none'
                    type='text'
                    name='jobTitle'
                    id='jobTitle'
                    placeholder='Job title'
                  />
                  <ErrorMessage
                    name='jobTitle'
                    component='div'
                    className='text-red-700'
                  />
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='city'
                  >
                    City
                  </label>
                  <Field
                    className='w-full rounded-lg  border-2 border-slate-400 bg-gray-100 px-4 py-2 shadow-xl focus:outline-none'
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
                    className='w-full rounded-lg  border-2 border-slate-400 px-4 py-2  shadow-xl focus:outline-none '
                    name='state'
                    id='state'
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
              </div>

              <button
                className='mb-4 mt-6 rounded-lg  bg-gradient-to-tl from-blue-600 to-pink-500 px-8 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-lg'
                type='submit'
                disabled={isSubmitting}
              >
                {loading ? 'Updating' : 'Update'}
              </button>
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

export default ModalUpdateUser;
