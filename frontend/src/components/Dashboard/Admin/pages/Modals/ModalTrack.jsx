

import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const trackingSchema = Yup.object().shape({
  trackingID: Yup.string()
    .required('TrackingID is required.*')
    // .min(15, 'Invalid TrackingID')
    // .max(15, 'Invalid TrackingID'),
});

const ModalTrack = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };
  if (!visible) return null;

  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed inset-0 z-20  flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'
    >
      <div className=' w-full rounded-lg bg-white p-2 sm:w-[500px]'>
        <div
          onClick={onClose}
          className='mx-2 my-1 flex cursor-pointer items-center justify-end text-3xl text-red-600'
        >
          <AiOutlineCloseCircle />
        </div>
        <Formik
          initialValues={{
            trackingID: '',
          }}
          validationSchema={trackingSchema}
          onSubmit={(values, { setSubmitting }) => {
            setLoading(true);
            axios
              .get(
                `https://procuren-backend.onrender.com/trackEnquiry/${values.trackingID}`
                // `http://localhost:3001/trackEnquiry/${values.trackingID}`,
              )
              .then((response) => {
                if (response.data.status === true) {
                  setError(``);
                  setLoading(false);
                  setData(response.data.data);
                } else {
                  setLoading(false);
                }
                setSubmitting(false);
              })
              .catch((error) => {
                setLoading(false);
                setError(`${error.response.data.message}`);

                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className=' min-w-full   p-2 py-4   md:px-10'>
              <h1 className='mb-6 bg-gradient-to-tl from-blue-600  to-pink-500 bg-clip-text text-center  font-sans text-2xl font-semibold text-transparent'>
                TRACKING
              </h1>
              {/* <div className='mb-6 h-0.5 rounded-full w-1/2 mx-auto bg-gradient-to-tl from-blue-600 to-pink-500 ' /> */}

              <div className=''>
                <div>
                  {/* <label
                    className='text-md mb-4 block  text-gray-800'
                    htmlFor='trackingID'
                  >
                    Enter your tracking id below.
                  </label> */}
                  <Field
                    className='w-full rounded-lg  border-2 bg-gray-100 px-4 py-2 focus:outline-none'
                    type='text'
                    name='trackingID'
                    id='trackingID'
                    placeholder='Enter your tracking id'
                    // placeholder='eg. 123456789101112'
                  />
                  <ErrorMessage
                    name='trackingID'
                    component='div'
                    className=' mt-2 pl-1 text-red-700'
                  />
                </div>
              </div>
              {error ? (
                <div className='mt-4 text-center text-xl text-blue-700'>
                  {error}
                </div>
              ) : (
                data.status && (
                  <div className='mt-2 items-center text-center text-xl'>
                    Status is{' '}
                    <span
                      className={`${
                        data.status === 'Approved'
                          ? 'text-green-500 '
                          : data.status === 'Pending'
                          ? 'text-orange-500'
                          : 'text-red-500'
                      } font-semibold `}
                    >
                      {' '}
                      {data.status}
                    </span>
                  </div>
                )
              )}
              <div className='text-center'>
                <button
                  className={`mt-6 inline-flex  rounded-full border-2 border-white bg-gradient-to-tr   from-[#5c67f5] to-[#cb67ac] px-5 py-2 text-lg text-white duration-500  hover:border-[#5c67f5] hover:bg-white hover:from-white hover:text-[#5c67f5] focus:outline-none lg:px-8 `}
                  type='submit'
                  disabled={isSubmitting}
                >
                  {loading ? 'Tracking' : 'Track'}
                </button>
                {/* <button
                  onClick={onClose}
                  className='mb-4 mt-6 rounded-lg   border border-indigo-300  px-8 py-2 font-sans text-lg font-semibold tracking-wide '
                >
                  Close
                </button> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalTrack;
