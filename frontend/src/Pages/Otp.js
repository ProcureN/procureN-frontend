import React, { useState } from 'react';

import LoginPage from '../assets/Login.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo1.png';
import { IoIosArrowRoundBack } from 'react-icons/io';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  // otp: Yup.number('OTP will be number only').required('Opt is required'),
});

const Otp = () => {
  const { path } = useParams();

  let history = useNavigate();

  const [resendForm, setResendForm] = useState(true);
  return (
    <div
      className=' flex h-screen w-full items-center justify-center  bg-cover  '
      style={{ backgroundImage: `url(${LoginPage})` }}
    >
      <div className='w-[90%] md:w-1/2 lg:w-2/5 '>
        <div className='  rounded-t-xl bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac]'>
          <img
            src={logo}
            alt='logo'
            className='mx-auto h-20 animate-pulse py-2 lg:h-24  '
          />
        </div>
        {resendForm ? (
          <Formik
            initialValues={{
              email: '',
              otp: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await axios
                .post('https://procuren-backend.onrender.com/otp ', values)
                // .post('http://localhost:3001/otp ', values)
                .then((response) => {
                  if (
                    response.data.message === 'login successful' &&
                    path === 'signup'
                  ) {
                    console.log(response)
                    localStorage.removeItem('token');
                    localStorage.removeItem('customerID');
                    localStorage.removeItem('role');

                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem(
                      'customerID',
                      response.data.customerID
                    );
                    localStorage.setItem('role', response.data.selectRole);

                    history(`/${response.data.selectRole}`);
          
                  } else {
                    history(`/resetpass/${response.data.email}`);
                  }
                  setSubmitting(false);
                })
                .catch((error) => {
                  console.log(error)
                  alert(`Invalid Otp `);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className='min-w-full rounded-b-lg bg-indigo-100 p-4 opacity-100 shadow-lg md:p-10'>
                <h1 className='mb-2 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-2xl   font-bold text-transparent duration-500'>
                  Verify your Email
                </h1>

                <hr className='rounded-full border-2 border-indigo-500  duration-500 hover:border-red-500' />
                <div className='mb-4 mt-8 flex justify-around'>
                  <label
                    className='my-3 block text-center text-lg font-semibold text-gray-800 md:ml-6 md:mr-5'
                    htmlFor='email'
                  >
                    Email :
                  </label>
                  <div className='mx-4 flex-1'>
                    <Field
                      className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow focus:outline-none '
                      type='text'
                      name='email'
                      id='email'
                      placeholder='Enter your email here'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-center text-red-800'
                    />
                  </div>
                </div>
                <div className='flex justify-around'>
                  <label
                    className='text-md my-3 mr-8 block text-center font-semibold text-gray-800 md:ml-6 lg:text-lg'
                    htmlFor='otp'
                  >
                    OTP :
                  </label>
                  <div className='mx-4 flex-1'>
                    <Field
                      className='w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none'
                      type='number'
                      name='otp'
                      id='otp'
                      placeholder='Enter your OTP here'
                    />
                    {/* <ErrorMessage
                      name='otp'
                      component='div'
                      className='text-center text-red-800'
                    /> */}
                  </div>
                </div>
                <div className='mx-3 mb-4 mt-6 flex justify-between '>
                  <button
                    className='w-4/6  rounded-lg bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] px-4 py-2 font-sans text-lg  font-semibold tracking-wide text-white shadow-xl shadow-indigo-300'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Verify
                  </button>
                  <button
                    className='border-1 mx-5 whitespace-nowrap rounded-lg border border-gray-400 px-4 shadow-xl shadow-indigo-200 hover:bg-slate-200'
                    onClick={() => setResendForm(false)}
                  >
                    Resend OTP
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await axios
                .post(
                  'https://procuren-backend.onrender.com/resendOtp ',
                  values
                )
                // .post('http://localhost:3001/resendOtp ', values)
                .then((response) => {
                  if (response.data.message === 'OTP send successfully') {
                    alert('OTP sent successfully.');
                    setResendForm(true);
                    setSubmitting(false);
                  }
                })
                .catch((error) => {
                  alert('something went wrong :)');
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className='min-w-full rounded-b-lg bg-indigo-100 p-4 opacity-100 shadow-lg md:p-10'>
                {/* <h1 className='mb-2 bg-gradient-to-tl from-blue-600 to-pink-500 bg-clip-text text-center font-sans text-2xl   font-bold text-transparent duration-500'>
                  Verify Your Email
                </h1>

                <hr className='rounded-full border-2 border-indigo-500  duration-500 hover:border-red-500' /> */}
                <div className='my-8 flex  '>
                  <label
                    className='my-3 block text-center text-xl font-semibold text-gray-800 md:ml-6 md:mr-8'
                    htmlFor='email'
                  >
                    Email :
                  </label>
                  <div className='mx-4 flex-1'>
                    <Field
                      className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow focus:outline-none '
                      type='text'
                      name='email'
                      id='email'
                      placeholder='Enter your email here'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='text-center text-red-800'
                    />
                  </div>
                </div>

                <div className=' mb-4 flex justify-around text-center'>
                  <button
                    className='w-3/6  rounded-lg bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] px-2 py-1 font-sans text-lg  font-semibold tracking-wide text-white shadow-xl shadow-indigo-300'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Get an OTP
                  </button>
                  <div
                    className='group relative rounded-lg text-indigo-500'
                    onClick={() => setResendForm(true)}
                  >
                    <IoIosArrowRoundBack className=' mr-2 animate-pulse text-2xl lg:text-4xl ' />
                    <span className='absolute    my-2 -translate-x-1/3 whitespace-nowrap rounded-md bg-indigo-200 p-1 text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                      Back to verificaion page
                    </span>
                  </div>
                </div>
                <div className='mt-8 w-full text-center text-sm text-red-500'>
                  An OTP has already been sent to your email address.*
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Otp;
