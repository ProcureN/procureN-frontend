import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginBack from '../assets/LoginBack.jpg';
import logo from '../assets/logo1.png';
import { FiUserCheck } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AiOutlineHome } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Information is required*'),
  city: Yup.string().required('Information is required*'),
  state: Yup.string().required('Information is required*'),
  company: Yup.string().required('Information is required*'),
  jobTitle: Yup.string().required('Information is required*'),
  selectRole: Yup.string().required('Information is required*'),
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

  return (
    <div
      className='h-[200%] w-full items-center  justify-center bg-cover md:flex md:h-screen '
      style={{ backgroundImage: `url(${LoginBack})` }}
    >
      <div className='p-4'>
        <div className='mx-auto w-full rounded-t-lg bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac]'>
          <img
            src={logo}
            alt='logo'
            className='mx-auto h-20 animate-pulse py-2 lg:h-24 '
          />
        </div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            selectRole: '',
            company: '',
            jobTitle: '',
            phone: '',
            state: '',
            city: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setLoading(true);
            axios
              .post('https://procuren-backend.onrender.com/register', values)
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
            <Form className=' min-w-full rounded-b-lg bg-indigo-100 p-4  text-center md:p-10'>
              <h1 className='mb-4 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] bg-clip-text text-center font-sans text-2xl font-bold text-transparent'>
                Create a new account
              </h1>
              <div className='mb-10 h-0.5 rounded-full  bg-gradient-to-tl from-blue-600 to-pink-500 ' />

              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='name'
                  >
                    Name
                  </label>
                  <Field
                    required
                    className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow-xl focus:outline-none'
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
                    required
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none'
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email'
                  />

                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-sm text-red-700'
                  />
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='password'
                  >
                    Password
                  </label>
                  <div className='flex items-center'>
                    <Field
                      required
                      className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none'
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
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-sm text-red-700 '
                  />
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='confirm'
                  >
                    Confirm Password
                  </label>
                  <Field
                    required
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none'
                    type='password'
                    name='passwordConfirm'
                    id='confirm'
                    placeholder='Confirm password'
                  />

                  <ErrorMessage
                    name='passwordConfirm'
                    component='div'
                    className='text-sm text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='phone'
                  >
                    Phone Number
                  </label>
                  <Field
                    required
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none'
                    type='text'
                    name='phone'
                    id='phone'
                    placeholder='Number'
                  />
                  <ErrorMessage
                    name='phone'
                    component='div'
                    className='text-sm text-red-700'
                  />
                </div>
                <div className='lg:col-span-2'>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='company'
                  >
                    Company Name
                  </label>
                  <Field
                    required
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none'
                    type='text'
                    name='company'
                    id='company'
                    placeholder='Company name'
                  />
                  <ErrorMessage
                    name='company'
                    component='div'
                    className='text-sm text-red-700'
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
                    required
                    as='select'
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none '
                    name='selectRole'
                    id='selectRole'
                  >
                    <option className='text-sm text-gray-500' disabled></option>
                    <option value='Retailer'>Retailer</option>
                    <option value='Manufacturer'>Manufacturer</option>
                  </Field>
                  <ErrorMessage
                    name='selectRole'
                    component='div'
                    className='text-sm text-red-700'
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
                    required
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none'
                    type='text'
                    name='jobTitle'
                    id='jobTitle'
                    placeholder='Job title'
                  />
                  <ErrorMessage
                    name='jobTitle'
                    component='div'
                    className='text-sm text-red-700'
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
                    required
                    className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow-xl focus:outline-none'
                    type='text'
                    name='city'
                    id='city'
                    placeholder='City name'
                  />
                  <ErrorMessage
                    name='city'
                    component='div'
                    className='text-sm text-red-700'
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
                    required
                    as='select'
                    className='w-full rounded-lg  px-4 py-2  shadow-xl focus:outline-none '
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
                    className='text-sm text-red-700'
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
                  className='mb-4 mt-6 rounded-lg  bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] px-8 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-lg'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Register
                </button>
              )}

              <div className='mb-2 flex justify-between'>
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
