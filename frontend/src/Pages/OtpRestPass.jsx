import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../assets/Login.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import logo from '../assets/logo.png';
import { EmailContext } from '../context/Email';

const otpSchema = Yup.object().shape({
  otp: Yup.number('OTP will be number only').required('OTP is required'),
  // .min(5, 'Invalid OTP')
  // .max(5, 'Invalid OTP'),
});

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const OtpRestPass = () => {
  let history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShake(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [shake]);

  const emailContext = useContext(EmailContext);
  const handleResendOTP = async () => {
    try {
      await axios.post('https://procuren-backend.onrender.com/resendOtp ', {
        email: `${emailContext.email}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(emailContext.email);

  return (
    <>
      <div className='absolute inset-0 hidden bg-black opacity-50 xl:block'></div>
      <div
        className='  flex h-screen w-full items-center justify-center  bg-cover '
        style={{ backgroundImage: `url(${LoginPage})` }}
      >
        <div
          className={`z-20 m-2  w-[400px] ${
            shake && 'animate-shake'
          }  shadow-2xl `}
        >
          {/* <div className=' z-20   m-2 w-full shadow-2xl sm:w-4/5 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4  '> */}
          {open ? (
            <Formik
              initialValues={{
                otp: '',
              }}
              validationSchema={otpSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                await axios
                  .post(
                    'https://procuren-backend.onrender.com/otp ',

                    { ...values, email: `${emailContext.email}` }
                  )
                  .then((response) => {
                    if (response.data.message === 'login successful') {
                      console.log(response);
                      localStorage.removeItem('token');
                      localStorage.removeItem('customerID');
                      localStorage.removeItem('role');

                      localStorage.setItem('token', response.data.token);
                      localStorage.setItem(
                        'customerID',
                        response.data.customerID
                      );
                      localStorage.setItem('role', response.data.selectRole);

                      history(`/resetpass`);
                    }
                    setSubmitting(false);
                  })
                  .catch((error) => {
                    setLoading(false);
                    setShake(true);
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form className='  rounded-3xl  bg-white  p-6 text-center   shadow-xl shadow-black '>
                  <img src={logo} alt='logo' className='mx-auto mb-8   h-20' />
                  <div>
                    <div className='mx-2 flex items-center justify-end'>
                      <ErrorMessage
                        name='otp'
                        component='div'
                        className='-mt-2 text-center text-red-800'
                      />
                    </div>
                    <Field
                      required
                      className='mb-3 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      type='number'
                      name='otp'
                      id='otp'
                      placeholder='OTP'
                    />
                  </div>
                  <div className='mb-6 w-full text-xs text-red-500'>
                    An OTP has already been sent to your email address.*
                  </div>
                  <button
                    className=' mb-6 mt-1 w-full  rounded-md bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac]  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white '
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {loading ? 'Verifying' : 'Verify'}
                  </button>

                  <span className='text-sm ' to='/signup'>
                    Don't have an OTP? -{' '}
                    <span
                      onClick={handleResendOTP}
                      className='cursor-pointer font-medium text-[#5c67f5] hover:font-semibold'
                    >
                      Resend OTP
                    </span>
                  </span>

                  <div className='-mb-3 mt-4 text-[12px] '>
                    © 2023 ProcureN. All rights reserved{' '}
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={emailSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                await axios
                  .post(
                    'https://procuren-backend.onrender.com/resendOtp ',
                    values
                  )
                  .then((response) => {
                    if (response.data.message === 'OTP send successfully') {
                      alert('OTP sent successfully');
                      // setResendForm(true);
                      emailContext.setEmail(values.email);
                      setOpen(true);
                      setSubmitting(false);
                    }
                  })
                  .catch((error) => {
                    setLoading(false);
                    setShake(true);
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form className='  rounded-3xl  bg-white  p-6 text-center   shadow-xl shadow-black '>
                  <div className='flex justify-center'>
                    <Link to='/'>
                      <img
                        src={logo}
                        alt='logo'
                        className='mx-auto mb-8   h-20'
                      />
                    </Link>
                  </div>

                  <div>
                    <div className='mx-2 flex items-center justify-end'>
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='-mt-2 text-center text-red-800'
                      />
                    </div>
                    <Field
                      required
                      className='mb-3 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email ID'
                    />
                  </div>
                  <div className='mb-6 w-full text-xs text-left ml-2 text-red-500'>
                    Enter your registered email address*
                  </div>
                  <button
                    className=' mb-6 mt-1 w-full  rounded-md bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac]  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white '
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {loading ? 'Sending an OTP' : 'Get an OTP'}
                  </button>

                  {/* <span className='text-sm ' to='/signup'>
                    Don't have an OTP? -{' '}
                    <span
                      onClick={handleResendOTP}
                      className='cursor-pointer font-medium text-[#5c67f5] hover:font-semibold'
                    >
                      Resend OTP
                    </span>
                  </span> */}

                  <div className='-mb-3 mt-4 text-[12px] '>
                    © 2023 ProcureN. All rights reserved{' '}
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </>
  );
};

export default OtpRestPass;
