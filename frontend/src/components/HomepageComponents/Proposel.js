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
    .required('Email is required*'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required*'),
  subject: Yup.string().required('Information is required*'),
  company: Yup.string(),
  message: Yup.string(),
  selectRole: Yup.string().required('required*'),
});

const Proposel = ({ setFormSub }) => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    selectRole: '',
    message: '',
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [submit, setSubmit] = useState(false);
  return (
    <div id='contact'>
      <div className='container mx-auto -mb-6 px-5 pt-10 md:pt-24'>
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
          className='container mx-auto flex flex-col justify-center  px-5 py-6 lg:flex-row'
          data-aos='fade-right'
          data-aos-delay='0'
          data-aos-duration='1000'
        >
          <div
            data-aos='fade-right'
            data-aos-delay='0'
            data-aos-duration='1000'
            className=' flex flex-col   overflow-hidden lg:w-1/2  '
          >
            <img src={deal} className='h-[90%]  ' alt='' srcSet='' />
          </div>

          <div
            data-aos='fade-left'
            data-aos-delay='0'
            data-aos-duration='1000'
            className=' flex flex-col lg:w-1/2   '
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
                      setFormSub(true);
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
                      <label
                        htmlFor='name'
                        className='my-auto pr-10   text-sm text-[#5c67f5] md:text-lg '
                      >
                        Name:
                      </label>
                      <div className='w-full'>
                        <Field
                          type='text'
                          id='name'
                          name='name'
                          placeholder='Enter your name'
                          required
                          className='placeholder:text-md w-full rounded-md border-b border-l-4 border-b-gray-500 border-l-[#5c67f5] bg-white px-3  py-1  leading-8 placeholder-gray-300 shadow-md outline-none'
                        />
                        <ErrorMessage
                          name='name'
                          component='div'
                          className='px-3 text-sm text-red-700'
                        />
                      </div>
                    </div>
                  </div>
                  <div className=' mb-4'>
                    <div className='flex'>
                      <label
                        htmlFor='email'
                        className='my-auto pr-11   text-sm text-[#5c67f5] md:text-lg '
                      >
                        Email:
                      </label>
                      <div className='w-full'>
                        <Field
                          type='email'
                          id='email'
                          name='email'
                          placeholder='Enter your email'
                          required
                          className='placeholder:text-md w-full rounded-md border-b border-l-4 border-b-gray-500 border-l-[#5c67f5] bg-white px-3 py-1 leading-8 placeholder-gray-300 shadow-md outline-none'
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className=' px-3 text-sm text-red-700'
                        />
                      </div>
                    </div>
                  </div>
                  <div className=' mb-4'>
                    <div className='flex'>
                      <label
                        htmlFor='phone'
                        className='my-auto pr-5   text-sm text-[#5c67f5]  md:text-lg'
                      >
                        Contact:
                      </label>
                      <div className='w-full'>
                        <Field
                          type='text'
                          id='phone'
                          name='phone'
                          placeholder='Enter your contact number '
                          required
                          className='placeholder:text-md w-full rounded-md border-b border-l-4 border-b-gray-500 border-l-[#5c67f5] bg-white px-3 py-1  leading-8 placeholder-gray-300 shadow-md outline-none'
                        />
                        <ErrorMessage
                          name='phone'
                          component='div'
                          className='px-3 text-sm text-red-700 '
                        />
                      </div>
                    </div>
                  </div>
                  <div className=' mb-4'>
                    <div className='flex'>
                      <label
                        htmlFor='company'
                        className='my-auto pr-1   text-sm text-[#5c67f5] md:text-lg'
                      >
                        Company:
                      </label>
                      <div className='w-full'>
                        <Field
                          type='text'
                          id='company'
                          name='company'
                          placeholder='Enter your contact number '
                          required
                          className='placeholder:text-md w-full rounded-md border-b border-l-4 border-b-gray-500 border-l-[#5c67f5] bg-white px-3 py-1  leading-8 placeholder-gray-300 shadow-md outline-none'
                        />
                        <ErrorMessage
                          name='company'
                          component='div'
                          className='px-3 text-sm text-red-700 '
                        />
                      </div>
                    </div>
                  </div>
                  <div className=' mb-4'>
                    <div className='flex '>
                      <label
                        htmlFor='selectRole'
                        className='my-auto pr-14   text-sm text-[#5c67f5] md:text-lg'
                      >
                        Role:
                      </label>
                      <div className='w-full'>
                        <Field
                          required
                          as='select'
                          className='placeholder:text-md w-full rounded-md border-b border-l-4 border-b-gray-500 border-l-[#5c67f5] bg-white px-3 py-2  placeholder-gray-300 shadow-md outline-none'
                          name='selectRole'
                          id='selectRole'
                        >
                          <option value='' className='' disabled>
                            Select Role
                          </option>
                          <option className='text-black' value='Client'>
                            Client
                          </option>
                          <option value='Vendor'>Vendor</option>
                        </Field>
                        {/* <ErrorMessage
                          name='selectRole'
                          component='div'
                          className='px-3 text-sm text-red-700 '
                        /> */}
                      </div>
                      {/* <div className='w-full'>
                        <Field
                          type='text'
                          id='selectRole'
                          name='selectRole'
                          placeholder='Enter your contact number '
                          required
                          className='placeholder:text-md w-full rounded-md border-b border-l-4 border-b-gray-500 border-l-[#5c67f5] bg-white px-3 py-1  leading-8 placeholder-gray-300 shadow-md outline-none'
                        />*/}
                      {/* </div>  */}
                      {/* <div className='flex w-full items-center justify-around text-[#5c67f5]'>
                        <label className='mr-2 '>
                          <Field
                            type='radio'
                            name='selectRole'
                            value='Client'
                            required
                            className='mr-1'
                          />
                          Client
                        </label>
                        <label>
                          <Field
                            type='radio'
                            name='selectRole'
                            value='Vendor'
                            required
                            className='mr-1'
                          />
                          Vendor
                        </label>
                      </div> */}
                    </div>
                  </div>
                  {/* <div>
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
                      <option value='Client'>Client</option>
                      <option value='Vendor'>Vendor</option>
                    </Field>
                  </div> */}
                  <div className=' mb-4'>
                    <div className='flex'>
                      <label
                        htmlFor='subject'
                        className='my-auto pr-7   text-sm text-[#5c67f5] md:text-lg '
                      >
                        Subject:
                      </label>
                      <div className='w-full'>
                        <Field
                          type='text'
                          id='subject'
                          name='subject'
                          placeholder='Enter your subject'
                          required
                          className='placeholder:text-md w-full rounded-md border-b border-l-4 border-b-gray-500 border-l-[#5c67f5] bg-white px-3 py-1  leading-8 placeholder-gray-300 shadow-md outline-none'
                        />
                        <ErrorMessage
                          name='subject'
                          component='div'
                          className=' px-3 text-sm text-red-700'
                        />
                      </div>
                    </div>
                  </div>
                  <div className=' mb-4 flex '>
                    <label
                      htmlFor='message'
                      className='my-auto mr-3.5   text-sm text-[#5c67f5] md:text-lg  '
                    >
                      Message:
                    </label>
                    <Field
                      as='textarea'
                      id='message'
                      name='message'
                      className='h-16 w-full resize-none rounded-md border-b border-l-4 border-b-gray-500  border-l-[#5c67f5] bg-white px-3 py-1  text-base leading-6 shadow-md  outline-none '
                    ></Field>
                  </div>
                  <div className=' container flex justify-center text-center '>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className={`mt-4 flex justify-center rounded-full border border-[#5c67f5] bg-white   from-[#5c67f5] to-[#cb67ac] px-10 py-2 text-center text-lg text-[#5c67f5]  duration-500  hover:border-white hover:bg-gradient-to-tr hover:text-white focus:outline-none `}
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
