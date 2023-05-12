import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginBack from '../assets/LoginBack.jpg';
import logo from '../assets/logo.png';
// import { FiUserCheck } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import { AiOutlineHome } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Information is required*'),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .required('Information is required*')
    .test(
      'is-unique',
      'This phone number is already taken',
      async function (value) {
        // make a request to the backend to check if the email address is unique
        try {
          const response = await axios.post(
            `https://procuren-backend.onrender.com/uniquePhone`,
            { phone: value }
          );

          return response.data.status;
        } catch (error) {
          // console.error(error);
          return false;
        }
      }
    ),
  email: Yup.string()
    .email('Invalid email address')
    .matches(emailReg, 'mail is not valid')
    .required('Information is required*')
    .test(
      'is-unique',
      'This email address is already taken',
      async function (value) {
        // make a request to the backend to check if the email address is unique
        try {
          const response = await axios.post(
            `https://procuren-backend.onrender.com/UniqueEmail`,
            { email: value }
          );

          return response.data.status;
        } catch (error) {
          // console.error(error);
          return false;
        }
      }
    ),
  password: Yup.string()
    .matches(passwordRegex, '8-16 chars, uppercase, symbol. Ex: P@ssword123')

    .required('Information is required*'),
  passwordConfirm: Yup.string()
    .required('Information is required*')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const SignupSchema2 = Yup.object().shape({
  city: Yup.string().required('Information is required*'),
  state: Yup.string().required('Information is required*'),
  companyName: Yup.string().required('Information is required*'),
  jobTitle: Yup.string().required('Information is required*'),
  selectRole: Yup.string().required('Information is required*'),
});

const Signup = () => {
  let history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
  const [error, setError] = useState(null);
  const [next, setNext] = useState(true);
  const [formValue, setFormValue] = useState({});

  return (
    <div
      className='h-[200%] w-full items-center   justify-center bg-cover sm:h-screen flex '
      style={{ backgroundImage: `url(${LoginBack})` }}
    >
      <div className='p-4'>
        {/* <div className='mx-auto w-full rounded-t-lg bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac]'>
          <img
            src={logo}
            alt='logo'
            className='mx-auto h-20 animate-pulse py-2 lg:h-24 '
          />
        </div> */}
        {next ? (
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              phone: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setFormValue({ ...formValue, ...values });
              setNext(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className=' min-w-full w-[400px] rounded-3xl bg-white p-4  text-center md:p-6'>
                {/* <h1 className='mb-4 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-bold text-transparent'>
                Create a new account
              </h1> */}
                {/* <div className='mb-10 h-0.5 rounded-full  bg-gradient-to-tl from-blue-600 to-pink-500 ' /> */}
                <div className='flex justify-center'>
                  <Link to='/'>
                    <img
                      src={logo}
                      alt='logo'
                      className='mx-auto mb-8   h-20'
                    />
                  </Link>
                </div>
                <div className=' '>
                  {/* <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'> */}
                  <div>
                    {/* <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='name'
                  >
                    Name
                  </label> */}
                    <ErrorMessage
                      name='name'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      // className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow-xl focus:outline-none'
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Name'
                    />
                  </div>

                  <div>
                    <ErrorMessage
                      name='phone'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      type='text'
                      name='phone'
                      id='phone'
                      placeholder='Phone number'
                    />
                  </div>
                  <div className=''>
                    <ErrorMessage
                      name='email'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email ID'
                    />
                  </div>
                  <div>
                    <ErrorMessage
                      name='password'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <div className='flex items-center'>
                      <Field
                        required
                        className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id='password'
                        placeholder='Password'
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className=' relative mb-10 cursor-pointer text-xl'
                      >
                        {showPassword ? (
                          <FaEye className='absolute -left-10 text-gray-600' />
                        ) : (
                          <FaEyeSlash className='absolute -left-10 text-gray-600' />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <ErrorMessage
                      name='passwordConfirm'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      type='password'
                      name='passwordConfirm'
                      id='confirm'
                      placeholder='Confirm password'
                    />
                  </div>
                </div>

                {loading ? (
                  <CgSpinner
                    size={60}
                    className='mx-auto mt-16 animate-spin text-indigo-600'
                  />
                ) : (
                  <button
                    className='mb-4 mt-6 w-full rounded-lg bg-[#5c67f5]  px-8 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-lg'
                    type='submit'
                    // disabled={isSubmitting}
                  >
                    Next
                  </button>
                )}

                {/* <div className='mb-2 flex justify-between'>
                <div className='mr-4 '>
                  <Link
                    to='/login'
                    className='group relative mb-2 flex items-center rounded-md p-1 text-indigo-500 shadow-md shadow-indigo-300'
                  >
                    <FiUserCheck className=' mr-2 text-xl  lg:text-3xl' />
                    Login
                    <span className='absolute mx-auto -mb-8  translate-y-full whitespace-nowrap rounded-md bg-indigo-200 p-1  text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                      Already have an account.
                    </span>
                  </Link>
                </div>
                <div>
                  <Link
                    to='/'
                    className='group relative mb-2 flex items-center rounded-md p-1  pr-2 text-indigo-500 shadow-md shadow-indigo-300'
                  >
                    <AiOutlineHome className='mr-2 text-xl lg:text-3xl' />
                    Home
                    <span className='absolute   -mb-8 -translate-x-2/3 translate-y-full whitespace-nowrap rounded-md bg-indigo-200 p-1 text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                      Back to Homepage
                    </span>
                  </Link>
                </div>
              </div> */}
                <Link to='/login'>
                  Already have an account -{' '}
                  <span to='/signup' className='font-medium text-[#5c67f5]'>
                    Sign in
                  </span>
                </Link>
                <div className='-mb-3 mt-4 text-[12px] '>
                  © 2023 ProcureN. All rights reserved{' '}
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              selectRole: '',
              company: '',
              jobTitle: '',
              state: '',
              city: '',
            }}
            validationSchema={SignupSchema2}
            onSubmit={(values, { setSubmitting }) => {
              setLoading(true);
              setFormValue({ ...formValue, ...values });
              axios
                .post(
                  'https://procuren-backend.onrender.com/register',
                  formValue
                )
                // .post('http://localhost:3001/register', values)
                .then((response) => {
                  if (response.data.status === true) {
                    setLoading(false);
                    alert('Successfully signup');
                    history('/otp/signup');
                  } else {
                    setError(error.message);
                    setLoading(false);
                  }
                  setSubmitting(false);
                })
                .catch((error) => {
                  setError(error.message);
                  setLoading(false);
                  alert(`${error.response.data.message}`);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className=' w-[400px] rounded-3xl bg-white p-4  text-center md:p-6'>
                {/* <h1 className='mb-4 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-bold text-transparent'>
                Create a new account
              </h1> */}
                {/* <div className='mb-10 h-0.5 rounded-full  bg-gradient-to-tl from-blue-600 to-pink-500 ' /> */}
                <div className='flex justify-center'>
                  <Link to='/'>
                    <img
                      src={logo}
                      alt='logo'
                      className='mx-auto mb-8   h-20'
                    />
                  </Link>
                </div>
                <div className=' '>
                  {/* <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'> */}

                  <div className=''>
                    
                    <ErrorMessage
                      name='company'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      type='text'
                      name='company'
                      id='company'
                      placeholder='Company'
                    />
                  </div>
                  <div>
                    {/* <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='selectRole'
                  >
                    Select Role
                  </label> */}
                    <ErrorMessage
                      name='selectRole'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      as='select'
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      name='selectRole'
                      id='selectRole'
                    >
                      <option
                        value=''
                        className='text-sm text-gray-500'
                        disabled
                      >
                        Select Role
                      </option>
                      <option value='Retailer'>Retailer</option>
                      <option value='Manufacturer'>Manufacturer</option>
                    </Field>
                  </div>
                  <div>
                    {/* <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='jobTitle'
                  >
                    Job Title
                  </label> */}
                    <ErrorMessage
                      name='jobTitle'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      name='jobTitle'
                      id='jobTitle'
                      placeholder='Job title'
                    />
                  </div>

                  <div>
                    {/* <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='city'
                  >
                    City
                  </label> */}
                    <ErrorMessage
                      name='city'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      type='text'
                      name='city'
                      id='city'
                      placeholder='City name'
                    />
                  </div>
                  <div>
                    {/* <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='state'
                  >
                    Select State
                  </label> */}
                    <ErrorMessage
                      name='state'
                      component='div'
                      className=' -mt-5 text-right text-sm text-red-700'
                    />
                    <Field
                      required
                      as='select'
                      className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                      name='state'
                      id='state'
                    >
                      <option value='' disabled>
                        Select State
                      </option>
                      {state.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                {loading ? (
                  <CgSpinner
                    size={60}
                    className='mx-auto mt-16 animate-spin text-indigo-600'
                  />
                ) : (
                  < >
                  <div className='flex gap-10'>
                  <button
                      className='mb-4 mt-6 w-full rounded-lg bg-[#5c67f5]  px-8 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-lg'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Register
                    </button>
                    <button onClick={()=>setNext(true)}  className='mb-4 mt-6 w-full rounded-lg bg-[#5c67f5]  px-8 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-lg' >Back</button>
                  </div>
                    
                  </>
                )}

                {/* <div className='mb-2 flex justify-between'>
                <div className='mr-4 '>
                  <Link
                    to='/login'
                    className='group relative mb-2 flex items-center rounded-md p-1 text-indigo-500 shadow-md shadow-indigo-300'
                  >
                    <FiUserCheck className=' mr-2 text-xl  lg:text-3xl' />
                    Login
                    <span className='absolute mx-auto -mb-8  translate-y-full whitespace-nowrap rounded-md bg-indigo-200 p-1  text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                      Already have an account.
                    </span>
                  </Link>
                </div>
                <div>
                  <Link
                    to='/'
                    className='group relative mb-2 flex items-center rounded-md p-1  pr-2 text-indigo-500 shadow-md shadow-indigo-300'
                  >
                    <AiOutlineHome className='mr-2 text-xl lg:text-3xl' />
                    Home
                    <span className='absolute   -mb-8 -translate-x-2/3 translate-y-full whitespace-nowrap rounded-md bg-indigo-200 p-1 text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                      Back to Homepage
                    </span>
                  </Link>
                </div>
              </div> */}
                <Link to='/login'>
                  Already have an account -{' '}
                  <span to='/signup' className='font-medium text-[#5c67f5]'>
                    Sign in
                  </span>
                </Link>
                <div className='-mb-3 mt-4 text-[12px] '>
                  © 2023 ProcureN. All rights reserved{' '}
                </div>
              </Form>
            )}
          </Formik>
        )}
        
      </div>
    </div>
  );
};

export default Signup;
