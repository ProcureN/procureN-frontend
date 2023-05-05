// import React from 'react'

// const PasswordRest = () => {
//   return (
//     <div>PasswordRest</div>
//   )
// }

// export default PasswordRest

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginPage from '../assets/Login.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import logo from '../assets/logo1.png';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long ')
    .required('Information is required.*'),
  passwordConfirm: Yup.string()
    .required('Information is required.*')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const PasswordRest = () => {
  let history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  console.log(useParams())
  let email = ''
  email  = useParams().email ;

  return (
    <div
      className='  flex h-screen w-full items-center justify-center  bg-cover '
      style={{ backgroundImage: `url(${LoginPage})` }}
    >
      <div className=' m-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 '>
        <div className='  rounded-t-xl bg-gradient-to-tl from-blue-600 to-pink-500'>
          <img src={logo} alt='logo' className='mx-auto h-20 py-2 lg:h-24 animate-pulse  ' />
        </div>
        <Formik
          initialValues={{
            email: email || '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await axios
              .put(
                'https://procuren-backend.onrender.com/updatepassword',
                // `http://localhost:3001/updatepassword`,

                values
              )
              .then((response) => {
                if (response.data.message === 'success') {
                  history(`/login`);
                }
                setSubmitting(false);
              })
              .catch((error) => {
                alert(`${error.response.data.message}`);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className='   min-w-full rounded-b-2xl  bg-indigo-100 p-6 text-center shadow-2xl'>
              <h1 className='mb-2 bg-gradient-to-tl from-blue-600 to-pink-500 bg-clip-text text-center font-sans text-2xl   font-bold text-transparent duration-500'>
                Welcome Back
              </h1>

              <div className='h-0.5 rounded-full  bg-gradient-to-tl from-blue-600 to-pink-500 ' />

              <div className='mt-2'>
                <div className='mx-2 flex items-center justify-between'>
                  <label
                    className='text-md mb-2 whitespace-nowrap mt-4 block text-center font-semibold  text-gray-800 '
                    htmlFor='password'
                  >
                    NEW PASSWORD :
                  </label>
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-center  text-sm text-red-800'
                  />
                </div>
                <div className='flex items-center'>
                  <Field
                    className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow-xl  focus:outline-none  '
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    placeholder='Enter your password here.'
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className=' relative mb-4 cursor-pointer text-xl'
                  >
                    {showPassword ? (
                      <FaEye className='absolute -left-10 text-gray-600' />
                    ) : (
                      <FaEyeSlash className='absolute -left-10 text-gray-600' />
                    )}
                  </div>
                </div>
              </div>
              <div className='mt-2'>
                <div className='mx-2 flex items-center justify-between'>
                  <label
                    className='text-md mb-2 mt-4 block text-center font-semibold  text-gray-800 '
                    htmlFor='passwordConfirm'
                  >
                    CONFIRM PASSWORD :
                  </label>
                  <ErrorMessage
                    name='passwordConfirm'
                    component='div'
                    className='text-center whitespace-nowrap text-sm text-red-800'
                  />
                </div>
                <div className='flex items-center'>
                  <Field
                    className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow-xl  focus:outline-none  '
                    type='password'
                    name='passwordConfirm'
                    id='passwordConfirm'
                    placeholder='Enter your password here.'
                  />
                  {/* <div
                    onClick={() => setShowPassword(!showPassword)}
                    className=' relative mb-4 cursor-pointer text-xl'
                  >
                    {showPassword ? (
                      <FaEye className='absolute -left-10 text-gray-600' />
                    ) : (
                      <FaEyeSlash className='absolute -left-10 text-gray-600' />
                    )}
                  </div> */}
                </div>
              </div>
              <button
                className=' my-4 rounded-md bg-gradient-to-tl from-blue-600 to-pink-500  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-xl shadow-indigo-300'
                type='submit'
                disabled={isSubmitting}
              >
                Reset
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordRest;
