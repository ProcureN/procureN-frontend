import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../assets/Login.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import Header2 from '../components/HomepageComponents/Header2';

// import { FiUserPlus } from 'react-icons/fi';

// import { FcGoogle } from 'react-icons/fc';
// import { BsFacebook } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { AiOutlineHome } from 'react-icons/ai';
import logo from '../assets/logo.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  let history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(() => {
      setShake(false)
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  },[shake])

  return (
    <>
      {/* <Header2 /> */}
      <div
        className='  flex h-screen w-full items-center justify-center  bg-cover '
        style={{ backgroundImage: `url(${LoginPage})` }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className= {`z-20 m-2  w-[400px] ${shake && "animate-shake"}  shadow-2xl `}>
          {/* <div className=' z-20   m-2 w-full shadow-2xl sm:w-4/5 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4  '> */}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setLoading(true);
              await axios
                .post(
                  'https://procuren-backend.onrender.com/login',
                  // `http://localhost:3001/login`,

                  values
                )
                .then((response) => {
                  setLoading(false);
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
                  setLoading(false);
                  if (error.response.data.message === 'you are not verified') {
                    alert('please verify your mail');
                    history('/otp/signup');
                  } else {
                    setShake(true)
                  };

                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className='  rounded-3xl    bg-white p-6  text-center shadow-xl shadow-black '>
                {/* <h1 className='mb-2 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-2xl   font-bold text-transparent duration-500'>
                Welcome Back
              </h1> */}
                <div className='flex justify-center'>
                  <Link to='/'>
                    <img
                      src={logo}
                      alt='logo'
                      className='mx-auto mb-8   h-20'
                    />
                  </Link>
                </div>
                {/* <div className='h-0.5 rounded-full  bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] ' /> */}
                <div>
                  <div className='mx-2 flex items-center justify-end'>
                    {/* <label
                      className='text-md my-3 block text-center font-semibold text-gray-800  '
                      htmlFor='email'
                    >
                      EMAIL
                    </label> */}
                    <ErrorMessage
                      name='email'
                      component='div'
                      className='-mt-2 text-center text-red-800'
                    />
                  </div>
                  <Field
                    required
                    className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Email ID'
                  />
                </div>
                <div className='mt-2'>
                  <div className='mx-2 flex items-center justify-end'>
                    {/* <label
                      className='text-md mb-2 mt-4 block text-center font-semibold  text-gray-800 '
                      htmlFor='password'
                    >
                      PASSWORD
                    </label> */}
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='-mt-4 text-center text-red-800'
                    />
                  </div>
                  <div className='flex items-center'>
                    <Field
                      required
                      className='w-full rounded-lg  border border-gray-300  px-4 py-2 placeholder:text-black focus:outline-none'
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      id='password'
                      placeholder='Password'
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
                      className=' text-md group relative mb-4 flex  items-center rounded-md 	p-1 pr-2  '
                    >
                      Having trouble in sign in?
                    </Link>
                  </div>
                </div>
                <button
                  className=' mb-6 mt-1 w-full rounded-md bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac]  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white '
                  type='submit'
                  disabled={isSubmitting}
                >
                  {loading ? 'Sign in...' : 'Sign in'}
                </button>
                {/* <span>or Sign in with</span>
                <div className='mb-6 mt-3 flex justify-around'>
                  <Link
                    to='/'
                    className='flex  w-2/5 items-center justify-center gap-3 rounded-lg border py-[5px]'
                  >
                    <FcGoogle className='text-2xl' />
                    <span>Google</span>
                  </Link>
                  <Link
                    to='/'
                    className='flex w-2/5 items-center justify-center gap-3 rounded-lg border py-[5px]'
                  >
                    <BsFacebook className='text-2xl text-blue-500' />
                    <span>Facebook</span>
                  </Link>
                </div> */}
                <Link to='/signup'>
                  Don't have an account? -{' '}
                  <span to='/signup' className='font-medium text-[#5c67f5]'>
                    Sign up
                  </span>
                </Link>
                {/* <div className='mb-4  flex flex-wrap justify-between '>
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
                </div> */}
                <div className='-mb-3 mt-4 text-[12px] '>
                  © 2023 ProcureN. All rights reserved{' '}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
