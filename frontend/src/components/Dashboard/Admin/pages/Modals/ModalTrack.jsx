// import React, { useEffect } from 'react';

// const ModalTrack = ({ visible, onClose }) => {
//   const handleOnClose = (e) => {
//     if (e.target.id === 'container') onClose();
//   };
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [onClose]);

//   if (!visible) return null;
//   return (
//     <div
//       id='container'
//       onClick={handleOnClose}

//       className='fixed  inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'
//     >
//       <div className=' md:w-2/3 p-1 overflow-hidden' >
//        HIIIII

//          <div className='flex justify-around text-center'>
//           Salman
//           <button
//         onClick={onClose}
//         className='mt-4 hover:bg-red-500 rounded-full border px-4 py-1 lg:px-8 lg:py-2  text-lg text-white md:text-xl'
//       >
//         Close
//       </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalTrack;

// import React from 'react';

// const ModalTrack = ({ visible, onClose }) => {
//   const handleOnClose = (e) => {
//     if (e.target.id === 'container') onClose();
//   };
//   if (!visible) return null;
//   return (
//     <div
//       id='container'
//       onClick={handleOnClose}
//       className='fixed inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'
//     >
//       <div className=' overflow-hidden m-1  lg:w-2/3 xl:h-2/3'>

//       </div>

//       <button
//         onClick={onClose}
//         className='mt-4 rounded-full border px-4 py-1 lg:px-8 lg:py-2  text-lg text-white md:text-xl'
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default ModalTrack;

import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const trackingSchema = Yup.object().shape({
  trackingID: Yup.string()
    .required('TrackingID is required.*')
    .min(15, 'Invalid TrackingID')
    .max(15, 'Invalid TrackingID'),
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
      <div className=' rounded-lg bg-indigo-100 p-2'>
        <div
          onClick={onClose}
          className='m-2 flex cursor-pointer items-center justify-end text-2xl text-red-600'
        >
          <span className='pr-1 text-lg'>Close</span>
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
              <h1 className='mb-4 bg-gradient-to-tl   from-blue-600 to-pink-500 bg-clip-text  font-sans text-2xl font-semibold text-transparent'>
                Track product or enquiry status
              </h1>
              <div className='mb-6 h-0.5 rounded-full  bg-gradient-to-tl from-blue-600 to-pink-500 ' />

              <div className=''>
                <div>
                  <label
                    className='text-md mb-4 block  text-gray-800'
                    htmlFor='trackingID'
                  >
                    Enter your tracking id below.
                  </label>
                  <Field
                    className='w-full rounded-lg bg-gray-100 px-4 py-2 shadow-xl focus:outline-none'
                    type='number'
                    name='trackingID'
                    id='trackingID'
                    placeholder='eg. 123456789101112'
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
                  className='mt-6 rounded-full border shadow-lg   hover:border-gray-500   bg-indigo-300  from-[#5c67f5]  to-[#cb67ac] p-2 px-8 font-sans text-lg text-white duration-500 hover:bg-gradient-to-tl   hover:bg-clip-text    hover:text-transparent    '
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
