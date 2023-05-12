import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// import { FiMapPin } from 'react-icons/fi';

import AOS from 'aos';
import 'aos/dist/aos.css';
import deal from '../../assets/deal.png';

const phoneRegExp = /^(\+91-|\+91|0)?\d{10}$/;

const proposelSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.*'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required.*'),
  subject: Yup.string().required('Information is required*'),
  message: Yup.string(),
});

const Proposel = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [submit, setSubmit] = useState(false);
  return (
    <div id='contact'>
      <div className='container mx-auto px-5 pt-10 md:pt-24 -mb-6'>
        <div
          data-aos='fade-up'
          data-aos-delay='0'
          data-aos-duration='1000'
          className='flex w-full flex-col text-center '
        >
          <h1 className='title-font mb-2 text-3xl font-medium uppercase text-[#5c67f5] sm:text-4xl'>
            CONTACT US
          </h1>
          {/* <div className='flex w-full flex-col items-center'>
            <div className='h-[1px] w-1/2 bg-indigo-800 '></div>
            <div className='-mt-0.5 mb-2 h-1 w-28 rounded-full bg-indigo-600 '></div>
          </div> */}
          <span className='text-md mx-auto  leading-relaxed text-gray-800 lg:w-2/3'>
            Ready to make better business decisions?
          </span>
        </div>
      </div>
      <section className=' '>
        <div
          className='container mx-auto flex flex-col justify-center  px-5 py-6 md:flex-row'
          data-aos='fade-right'
          data-aos-delay='0'
          data-aos-duration='1000'
        >
          <div
            data-aos='fade-right'
            data-aos-delay='0'
            data-aos-duration='1000'
            className=' flex flex-col   md:w-1/2 overflow-hidden  '
          >
            <img src={deal} className='h-[90%]  ' alt='' srcSet='' />
          </div>

          <div
            data-aos='fade-left'
            data-aos-delay='0'
            data-aos-duration='1000'
            className=' flex flex-col  md:w-1/2   '
          >
            <Formik
              initialValues={initialValues}
              validationSchema={proposelSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setLoading(true);
                axios
                  .post(
                    'https://procuren-backend.onrender.com/contactform',
                    values
                  )
                  .then((response) => {
                    if (response.data.status === true) {
                      setLoading(false);
                      // setSubmit(true);
                      alert(
                        'form submitted successfully. Our team will contact you soon'
                      );
                      resetForm({ values: initialValues });
                    } else {
                      setError(error.message);
                      setLoading(false);
                    }
                    setSubmitting(false);
                  })
                  .catch((error) => {
                    // console.error(error);
                    setError(error.message);
                    setLoading(false);
                    // alert(`Invalid data ~ ${error.message}`);
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  data-aos='fade-left'
                  data-aos-delay='0'
                  data-aos-duration='1000'
                  className='md:my-12 '
                >
                  <div className=' mb-4'>
                    <div className='flex '>
                      <label htmlFor='name' className='text-md my-auto pr-6 '>
                        Name:
                      </label>

                      <Field
                        type='text'
                        id='name'
                        name='name'
                        // placeholder='Enter your name'
                        required
                        className='placeholder:text-md w-full rounded-lg  border-b border-gray-500  bg-white px-3 py-1 text-center leading-8  placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 '
                      />
                    </div>
                    <ErrorMessage
                      name='name'
                      component='div'
                      className=' ml-10 flex justify-center text-sm text-red-700'
                    />
                  </div>
                  <div className=' mb-4'>
                    <div className='flex'>
                      <label htmlFor='email' className='text-md my-auto pr-7 '>
                        Email:
                      </label>

                      <Field
                        type='email'
                        id='email'
                        name='email'
                        // placeholder='example@email.com'
                        required
                        className='placeholder:text-md w-full rounded-lg  border-b border-gray-500  bg-white px-3 py-1 text-center leading-8  placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 '
                      />
                    </div>
                    <ErrorMessage
                      name='email'
                      component='div'
                      className=' ml-8 flex justify-center text-sm text-red-700'
                    />
                  </div>
                  <div className=' mb-4'>
                    <div className='flex'>
                      <label htmlFor='phone' className='text-md my-auto  pr-4'>
                        Contact:
                      </label>
                      <Field
                        type='text'
                        id='phone'
                        name='phone'
                        // placeholder='+91 00000 00000 '
                        required
                        className='placeholder:text-md w-full rounded-lg  border-b border-gray-500  bg-white px-3 py-1 text-center leading-8  placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 '
                      />
                    </div>
                    <ErrorMessage
                      name='phone'
                      component='div'
                      className=' ml-10 flex justify-center text-sm text-red-700 '
                    />
                  </div>
                  <div className=' mb-4'>
                    <div className='flex'>
                      <label
                        htmlFor='subject'
                        className='text-md my-auto pr-4 '
                      >
                        Subject:
                      </label>
                      <Field
                        type='text'
                        id='subject'
                        name='subject'
                        // placeholder='Enter your subject'
                        required
                        className='placeholder:text-md w-full rounded-lg  border-b border-gray-500  bg-white px-3 py-1 text-center leading-8  placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 '
                      />
                    </div>
                    <ErrorMessage
                      name='subject'
                      component='div'
                      className=' ml-16 flex justify-center text-sm text-red-700'
                    />
                  </div>
                  <div className=' mb-4 flex '>
                    <label
                      htmlFor='message'
                      className='text-md my-auto mr-2 pr-2 '
                    >
                      Message:
                    </label>
                    <Field
                      as='textarea'
                      id='message'
                      name='message'
                      className='h-16 w-full resize-none rounded-lg  border-b  border-gray-500 bg-white px-3 py-1 text-base leading-6  outline-none transition-colors duration-200 ease-in-out focus-within:ring-2 focus:border-indigo-500 focus:ring-indigo-200'
                    ></Field>
                  </div>
                  <div className='ml-4 flex justify-center '>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className={`mt-4 inline-flex  rounded-full border-2 border-white bg-gradient-to-tr   from-[#5c67f5] to-[#cb67ac] px-4 py-2 text-lg text-white duration-500  hover:border-[#5c67f5] hover:bg-white hover:from-white hover:text-[#5c67f5] focus:outline-none  xl:px-5`}
                    >
                      {loading ? 'Submitting' : 'Submit'}
                    </button>
                    {/* <span className='mt-3 text-xs text-gray-500'>
                      {submit && (
                        <div>
                          form submitted successfully. Our team will contact you
                          soon. Thank You
                        </div>
                      )}
                    </span> */}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proposel;
