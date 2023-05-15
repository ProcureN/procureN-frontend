import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/logo.png';

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

const SignupPage1 = ({ setNext, setFormValue }) => {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(setFormValue);
  }, [setFormValue]);
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          phone: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          setFormValue({ ...values });
          console.log(values);
          setLoading(false);
          setNext(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form className='  rounded-3xl    bg-white p-6  text-center shadow-xl shadow-black '>
            <div className='flex justify-center'>
              <Link to='/'>
                <img src={logo} alt='logo' className='mx-auto mb-8   h-20' />
              </Link>
            </div>
            <div>
              <div>
                <ErrorMessage
                  name='name'
                  component='div'
                  className=' -mt-5 text-right text-sm text-red-700'
                />
                <Field
                  required
                  className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
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
                  id='passwordConfirm'
                  placeholder='Confirm password'
                />
              </div>
            </div>
            <button
              className=' mb-6 mt-1 w-full rounded-md bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac]  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white '
              type='submit'
              disabled={isSubmitting}
            >
              {loading ? 'Next...' : 'Next'}
            </button>

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
    </>
  );
};

export default SignupPage1;
