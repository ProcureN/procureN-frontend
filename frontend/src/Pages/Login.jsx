import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../assets/Login.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { FiUserPlus } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import logo from '../assets/logo1.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  let history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className='  flex h-screen w-full items-center justify-center  bg-cover '
      style={{ backgroundImage: `url(${LoginPage})` }}
    >
      <div className=' m-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 '>
        <div className='  rounded-t-xl bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac]'>
          <img
            src={logo}
            alt='logo'
            className='mx-auto h-20 animate-pulse py-2 lg:h-24  '
          />
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await axios
              .post(
                'https://procuren-backend.onrender.com/login',
                // `http://localhost:3001/login`,

                values
              )
              .then((response) => {
                localStorage.removeItem('token');
                localStorage.removeItem('customerID');
                localStorage.removeItem('role');
                if (response.data.message === 'Login Successful') {
                  localStorage.setItem('token', response.data.data.token);
                  localStorage.setItem(
                    'customerID',
                    response.data.data.customerID
                  );
                  localStorage.setItem('role', response.data.data.selectRole);

                  history(`/${response.data.data.selectRole}`);
                }
                setSubmitting(false);
              })
              .catch((error) => {
                if (error.response.data.message === 'you are not verified') {
                  alert('please verify your mail');
                  history('/otp/signup');
                } else alert(`${error.response.data.message}`);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className='   min-w-full rounded-b-2xl  bg-indigo-100 p-6 text-center shadow-2xl'>
              <h1 className='mb-2 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-2xl   font-bold text-transparent duration-500'>
                Welcome Back
              </h1>

              <div className='h-0.5 rounded-full  bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] ' />
              <div>
                <div className='mx-2 flex items-center justify-between'>
                  <label
                    className='text-md my-3 block text-center font-semibold text-gray-800  '
                    htmlFor='email'
                  >
                    EMAIL
                  </label>
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-center text-red-800'
                  />
                </div>
                <Field
                  required
                  className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none'
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Enter your email here'
                />
              </div>
              <div className='mt-2'>
                <div className='mx-2 flex items-center justify-between'>
                  <label
                    className='text-md mb-2 mt-4 block text-center font-semibold  text-gray-800 '
                    htmlFor='password'
                  >
                    PASSWORD
                  </label>
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-center text-red-800'
                  />
                </div>
                <div className='flex items-center'>
                  <Field
                    required
                    className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow-xl  focus:outline-none  '
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    placeholder='Enter your password here'
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

                <div className='mt-2'>
                  <Link
                    to='/otp/forget'
                    className=' text-md group relative mb-2 flex  items-center rounded-md 	p-1 pr-2 italic text-blue-500 underline '
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <button
                className=' mb-4 mt-1 rounded-md bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac]  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-xl shadow-indigo-300'
                type='submit'
                disabled={isSubmitting}
              >
                Login
              </button>
              <div className='mb-4  flex flex-wrap justify-between '>
                <div className='mr-4 '>
                  <Link
                    to='/signup'
                    className=' py-auto group relative mb-2 ml-2 flex items-center rounded-md p-1  pr-2 italic text-indigo-500  '
                  >
                    <FiUserPlus className=' mr-2 text-xl text-indigo-500 lg:text-3xl' />
                    Signup
                    <span className='absolute   -mb-8  translate-y-full whitespace-nowrap rounded-md bg-indigo-200 px-1 text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                      Don't have an account?
                    </span>
                  </Link>
                </div>
                <div>
                  <Link
                    to='/'
                    className='group relative mb-1 ml-2  flex items-center  rounded-md p-1  italic text-indigo-500 '
                  >
                    Home
                    <AiOutlineHome className=' mx-2 text-xl lg:text-3xl ' />
                    <span className='absolute   -mb-8 -translate-x-2/3 translate-y-full whitespace-nowrap rounded-md bg-indigo-200 px-1 text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                      Back to Homepage
                    </span>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
