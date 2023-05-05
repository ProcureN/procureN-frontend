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
  subject: Yup.string().required('Information is required.*'),
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
      <div className='container mx-auto px-5 pt-10 md:pt-24 '>
        <div
          data-aos='fade-up'
          data-aos-delay='0'
          data-aos-duration='1000'
          className='flex w-full flex-col text-center '
        >
          <h1 className='title-font mb-2 text-3xl font-medium uppercase text-[#5c67f5] sm:text-4xl'>
            REQUEST FOR A BUSINESS PROPOSAL
          </h1>
          {/* <div className='flex w-full flex-col items-center'>
            <div className='h-[1px] w-1/2 bg-indigo-800 '></div>
            <div className='-mt-0.5 mb-2 h-1 w-28 rounded-full bg-indigo-600 '></div>
          </div> */}
          <span className='mx-auto  text-base leading-relaxed text-gray-800 lg:w-2/3'>
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
            data-aos='fade-left'
            data-aos-delay='0'
            data-aos-duration='1000'
            className=' flex flex-col   md:w-1/2   '
          >
            <img src={deal} className='h-[90%]  ' alt='' srcSet='' />
          </div>
          {/* <div className='mr-6  md:w-1/2'>
            <iframe
              width='80%'
              height='60%'
              className='mx-auto'
              title='map'
              marginidth='0'
              // src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.25176871577!2d78.40804555!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1677584260081!5m2!1sen!2sin'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d992.6833046939811!2d78.41681614326876!3d17.416482942099805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9136aaaaaaab%3A0x307c19259dd73c83!2sNAR%20Infra!5e0!3m2!1sen!2sin!4v1681112862309!5m2!1sen!2sin'
              style={{ filter: { grayscale: 1, contrast: 1.2, opacity: 0.4 } }}
            ></iframe>
            <div className='  mt-4 flex flex-wrap rounded bg-gray-100 py-6 shadow-md  '>
              <div className='px-6 lg:w-1/2'>
                <h2 className='title-font text-xs font-semibold tracking-widest text-gray-900 underline underline-offset-2'>
                  ADDRESS:-
                </h2>

                <span className='mt-1  flex items-end md:items-center'>
                  <div>
                    Park NAR, 3rd Floor, 565/B, Road no. 92, Jubilee Hills,
                    Hyderabad, Telangana -500033{' '}
                  </div>
                  <span>
                    <a
                      href='https://goo.gl/maps/raxXSnmsxUzMBeBp6'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FiMapPin className='animate-bounce text-2xl text-blue-600' />
                    </a>
                  </span>{' '}
                </span>
              </div>
              <div className='mt-4 px-6  lg:mt-0 lg:w-1/2 '>
                <h2 className=' text-xs font-semibold tracking-widest text-gray-900 underline underline-offset-2'>
                  EMAIL:-
                </h2>
                <a
                  className='leading-relaxed text-indigo-500 hover:font-medium '
                  href='mailto:info@procuren.in'
                >
                  info@procuren.in
                </a>
                <h2 className='title-font mt-4 text-xs font-semibold tracking-widest text-gray-900 underline underline-offset-2'>
                  PHONE:-
                </h2>
                <a href='tel:+91 9399399391'>
                  <span className='hover:font-medium hover:text-black'>
                    (+91) 939-939-9391
                  </span>
                </a>
              </div>
            </div>
          </div> */}

          <div
            data-aos='fade-left'
            data-aos-delay='0'
            data-aos-duration='1000'
            className=' flex flex-col  md:w-1/2   '
          >
            {/* <div  className='title-font mb-1 text-xl font-medium text-gray-900 mx-auto'>
              Contact Us
            </div>
            <span className='  text-gray-600'>
              Connect with us for any business proposals, inquiries, or to
              enlist your product, or to get all the details of our products. We
              will be happy to work with you.
            </span> */}

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
                <Form className='  py-5'>
                  <div
                    data-aos='fade-left'
                    data-aos-delay='0'
                    data-aos-duration='1000'
                    className=' mb-4'
                  >
                    <div className='flex '>
                      <label htmlFor='name' className='text-md my-auto pr-6 '>
                        Name:
                      </label>

                      <Field
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Enter your name'
                        required
                        className='placeholder:text-md w-full rounded-full border border-gray-300  bg-white px-3 py-1 text-center leading-8  placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 '
                      />
                    </div>
                    <ErrorMessage
                      name='name'
                      component='div'
                      className=' ml-10 flex justify-center text-sm text-red-700'
                    />
                  </div>
                  <div
                    data-aos='fade-left'
                    data-aos-delay='0'
                    data-aos-duration='1000'
                    className=' mb-4'
                  >
                    <div className='flex'>
                      <label htmlFor='email' className='text-md my-auto pr-7 '>
                        Email:
                      </label>

                      <Field
                        type='email'
                        id='email'
                        name='email'
                        placeholder='example@email.com'
                        required
                        className='placeholder:text-md w-full rounded-full border border-gray-300 bg-white px-3 py-1 text-center text-base leading-8 placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 '
                      />
                    </div>
                    <ErrorMessage
                      name='email'
                      component='div'
                      className=' ml-8 flex justify-center text-sm text-red-700'
                    />
                  </div>
                  <div
                    data-aos='fade-left'
                    data-aos-delay='0'
                    data-aos-duration='1000'
                    className=' mb-4'
                  >
                    <div className='flex'>
                      <label htmlFor='phone' className='text-md my-auto  pr-4'>
                        Contact:
                      </label>
                      <Field
                        type='text'
                        id='phone'
                        name='phone'
                        placeholder='+91 00000 00000 '
                        required
                        className='placeholder:text-md w-full rounded-full border border-gray-300 bg-white px-3 py-1 text-center text-base leading-8 placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                      />
                    </div>
                    <ErrorMessage
                      name='phone'
                      component='div'
                      className=' ml-10 flex justify-center text-sm text-red-700 '
                    />
                  </div>
                  <div
                    data-aos='fade-left'
                    data-aos-delay='0'
                    data-aos-duration='1000'
                    className=' mb-4'
                  >
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
                        placeholder='Enter your subject'
                        required
                        className='placeholder:text-md w-full rounded-full border border-gray-300 bg-white px-3 py-1 text-center text-base leading-8 placeholder-gray-300  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                      />
                    </div>
                    <ErrorMessage
                      name='subject'
                      component='div'
                      className=' ml-16 flex justify-center text-sm text-red-700'
                    />
                  </div>
                  <div
                    data-aos='fade-left'
                    data-aos-delay='0'
                    data-aos-duration='1000'
                    className=' mb-4 flex '
                  >
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
                      className='h-32 w-full resize-none rounded-3xl border  border-gray-300 bg-white px-3 py-1 text-base leading-6  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                    ></Field>
                  </div>
                  <div className='ml-4 flex justify-center '>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className=' mt-2 flex rounded-full border border-gray-500   from-[#5c67f5]  to-[#cb67ac]  bg-clip-text px-6 py-2  font-sans duration-500 hover:bg-gradient-to-tl   hover:text-black hover:text-transparent   focus:outline-none md:mx-2  lg:mx-10  '
                    >
                      {loading ? 'Submitting...' : 'Submit'}
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

                // <Form className='  py-10'>
                //   <div className='relative mb-4'>
                //     <label
                //       htmlFor='name'
                //       className='text-sm leading-7 text-gray-600'
                //     >
                //       Name
                //     </label>

                //     <Field
                //       type='text'
                //       id='name'
                //       name='name'
                //       required
                //       className='w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                //     />
                //     <ErrorMessage
                //       name='name'
                //       component='div'
                //       className=' text-red-700'
                //     />
                //   </div>
                //   <div className='relative mb-4'>
                //     <label
                //       htmlFor='email'
                //       className='text-sm leading-7 text-gray-600'
                //     >
                //       Email
                //     </label>

                //     <Field
                //       type='email'
                //       id='email'
                //       name='email'
                //       required
                //       className='w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                //     />
                //     <ErrorMessage
                //       name='email'
                //       component='div'
                //       className=' text-red-700'
                //     />
                //   </div>
                //   <div className='relative mb-4'>
                //     <label
                //       htmlFor='phone'
                //       className='text-sm leading-7 text-gray-600'
                //     >
                //       Phone No.
                //     </label>
                //     <Field
                //       type='text'
                //       id='phone'
                //       name='phone'
                //       required
                //       className='w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                //     />
                //     <ErrorMessage
                //       name='phone'
                //       component='div'
                //       className=' text-red-700'
                //     />
                //   </div>
                //   <div className='relative mb-4'>
                //     <label
                //       htmlFor='subject'
                //       className='text-sm leading-7 text-gray-600'
                //     >
                //       Subject
                //     </label>
                //     <Field
                //       type='text'
                //       id='subject'
                //       name='subject'
                //       required
                //       className='w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                //     />
                //     <ErrorMessage
                //       name='subject'
                //       component='div'
                //       className=' text-red-700'
                //     />
                //   </div>
                //   <div className='relative mb-4'>
                //     <label
                //       htmlFor='message'
                //       className='text-sm leading-7 text-gray-600'
                //     >
                //       Message
                //     </label>
                //     <Field
                //       as='textarea'
                //       id='message'
                //       name='message'
                //       className='h-32 w-full resize-none rounded border border-gray-300 bg-white px-3 py-1 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                //     ></Field>
                //   </div>
                //   <div className='flex justify-center'>
                //     <button
                //       type='submit'
                //       disabled={isSubmitting}
                //       className='mt-6 flex rounded-full border border-gray-500   from-[#5c67f5]  to-[#cb67ac]  bg-clip-text p-2 pl-3 font-sans duration-500 hover:bg-gradient-to-tl   hover:text-black hover:text-transparent   focus:outline-none md:mx-2 md:pr-1 lg:mx-10 xl:pr-3 '
                //     >
                //       {loading ? 'Submitting...' : 'Submit'}
                //     </button>

                //   </div>
                // </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proposel;
