import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../assets/LoginBack.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import logo from '../assets/logo.png';
import { EmailContext } from '../context/Email';

const RestPassSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long ')
    .required('Information is required*'),
  passwordConfirm: Yup.string()
    .required('Information is required*')
    .oneOf([Yup.ref('password'), null], 'Password must match'),
});

const RestPassword = () => {
  let history = useNavigate();
  const emailContext = useContext(EmailContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  console.log(emailContext);
  return (
    <>
      <div className='absolute inset-0 hidden bg-black opacity-50 xl:block'></div>
      <div
        className='  flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat '
        style={{ backgroundImage: `url(${LoginPage})` }}
      >
        <div className={` z-20  m-2 w-[400px] shadow-2xl `}>
          {/* <div className=' z-20   m-2 w-full shadow-2xl sm:w-4/5 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4  '> */}
          <Formik
            initialValues={{
              email: `${emailContext.email}`,
              password: '',
            }}
            validationSchema={RestPassSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setLoading(true);
              await axios
                .put(
                  'https://procuren-backend-g6z9.onrender.com/updatepassword',
                  // `http://localhost:3001/updatepassword`,

                  values
                )
                .then((response) => {
                  if (response.data.message === 'success') {
                    alert('Password updated successfully');
                    history(`/login`);
                  }
                  setSubmitting(false);
                  setLoading(false);
                })
                .catch((error) => {
                  setLoading(false);
                  alert(`${error.response.data.message}`);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className='  rounded-3xl    bg-white p-6  text-center shadow-xl shadow-black '>
                <img src={logo} alt='logo' className='mx-auto mb-8   h-20' />

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
                      placeholder='New Password'
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
                <button
                  className=' mb-3 mt-3 w-full rounded-md bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac]  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white '
                  type='submit'
                  disabled={isSubmitting}
                >
                  {loading ? 'Reseting Password' : 'Reset Password'}
                </button>

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

export default RestPassword;
