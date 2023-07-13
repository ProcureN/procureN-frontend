import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { EmailContext } from '../context/Email';

import logo from '../assets/logo.png';

const SignupSchema = Yup.object().shape({
  city: Yup.string().required('Information is required*'),
  state: Yup.string().required('Information is required*'),
  company: Yup.string().required('Information is required*'),
  jobTitle: Yup.string().required('Information is required*'),
  selectRole: Yup.string().required('Information is required*'),
});

const SignupPage2 = ({ setNext, formValue }) => {
  let history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailContext = useContext(EmailContext);
  console.log(emailContext);

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

  return (
    <>
      <Formik
        initialValues={{
          selectRole: '',
          company: '',
          jobTitle: '',
          state: '',
          city: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          values = { ...values, ...formValue };
          console.log(values);
          axios
            .post('https://procuren-backend.onrender.com/register', values)
            // .post('http://localhost:3001/register', values)
            .then((response) => {
              if (response.data.status === true) {
                setLoading(false);
                // alert('Successfully signup');
                history('/otpsign');
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
          <Form className='  rounded-3xl    bg-white p-6  text-center shadow-xl shadow-black '>
            <div className='flex justify-center'>
              <Link to='/'>
                <img src={logo} alt='logo' className='mx-auto mb-8   h-20' />
              </Link>
            </div>

            <div>
              <div>
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
                  placeholder='Company Name'
                />
              </div>

              <div>
                <ErrorMessage
                  name='jobTitle'
                  component='div'
                  className=' -mt-5 text-right text-sm text-red-700'
                />
                <Field
                  required
                  className='mb-6 w-full rounded-lg  border border-gray-300 px-4 py-2 placeholder:text-black focus:outline-none'
                  type='text'
                  name='jobTitle'
                  id='jobTitle'
                  placeholder='Job Title'
                />
              </div>
              <div>
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
                  <option value='' className='text-sm text-gray-500' disabled>
                    Select Role
                  </option>
                  <option value='Retailer'>Retailer</option>
                  <option value='Manufacturer'>Manufacturer</option>
                </Field>
              </div>
              <div>
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

            <button
              className='col-span-3 mb-6 mt-1 w-full rounded-md bg-[#5c67f5] from-[#5c67f5] to-[#cb67ac]  px-6 py-2 font-sans text-lg font-semibold tracking-wide text-white '
              type='submit'
              disabled={isSubmitting}
            >
              {loading ? 'Sign in...' : 'Sign in'}
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

export default SignupPage2;
