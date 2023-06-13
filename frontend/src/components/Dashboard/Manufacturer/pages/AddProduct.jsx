import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AiOutlineMenu } from 'react-icons/ai';

const productSchema = Yup.object().shape({
  productName: Yup.string().required('Information is required*'),
  category: Yup.string().required('Information is required*'),
  subCategory: Yup.string().required('Information is required*'),
  manufacturerName: Yup.string().required('Information is required*'),
  // priceBeforeDiscount: Yup.number().required('Information is required*'),
  price: Yup.number().required('Information is required*'),
  // withGST: Yup.number().required('Information is required*'),
  description: Yup.string().required('Information is required*'),
  // shippingCharges: Yup.number().required('Information is required*'),
  sizeUnit: Yup.string().required('Information is required*'),
  productQuantity: Yup.string().required('Information is required*'),
  availability: Yup.string().required('Information is required*'),
  // selectImage1: Yup.mixed()
  // .required('Image is required')
  // .test('fileType', 'Only PNG and JPEG images are allowed', (value) => {
  //   if (!value) {
  //     return false;
  //   }
  //   return ['image/png', 'image/jpeg'].includes(value.type);
  // }),
  // selectImage1: Yup.string(),
  // selectImage2: Yup.string(),
});

const AddProduct = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [customerID, setCustomerID] = useState('');

  useEffect(() => {
    setCustomerID(localStorage.getItem('customerID'));
  }, []);

  const initialValues = {
    productName: '',
    category: '',
    subCategory: '',
    manufacturerName: '',
    // priceBeforeDiscount: '',
    price: '',
    // withGST: '',
    description: '',
    // shippingCharges: '',
    sizeUnit: '',
    productQuantity: '',
    availability: '',
    // selectImage1: '',
    // selectImage2: '',
  };

  return (
    <>
      <div className='my-2 flex h-16 justify-between rounded-md bg-white shadow md:mr-4'>
        <div className='my-auto pl-2'>
          <AiOutlineMenu
            className=' cursor-pointer text-3xl text-[#5c67f5] '
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className=' mx-auto my-auto bg-gradient-to-tr from-[#5c67f5]  to-pink-500 bg-clip-text font-sans text-2xl font-semibold  uppercase  text-transparent'>
          Add Your Product
        </div>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem('token');
            setLoading(true);
            axios
              .post(
                `https://procuren-backend-g6z9.onrender.com/addProducts`,
                // `http://localhost:3001/addProducts`,
                { ...values, costumerID: `${customerID}` },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then((response) => {
                resetForm({ values: initialValues });

                setLoading(false);

                if (response.data.status === true) {
                  setLoading(false);
                  alert('Product added successfully.');
                } else {
                  // setError(error.message);
                  setLoading(false);
                }
                setSubmitting(false);
              })
              .catch((error) => {
                // setError(error.message);
                setLoading(false);
                alert(`${error.response.data.message}`);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className=' px-10 py-10'>
              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 '>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='productName'
                  >
                    Product Name
                  </label>
                  <Field
                   className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    name='productName'
                    id='productName'
                    // placeholder='Enter your product name'
                  />
                  <ErrorMessage
                    name='productName'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md flex  font-semibold text-gray-800'
                    htmlFor='description'
                  >
                    Description
                  </label>
                  <Field
                  className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='text'
                    name='description'
                    id='description'
                    // placeholder='Description of your product '
                  />
                  <ErrorMessage
                    name='description'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='category'
                  >
                    Category
                  </label>
                  <Field
                    className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='text'
                    name='category'
                    id='category'
                    // placeholder='Category'
                  />
                  <ErrorMessage
                    name='category'
                    component='div'
                    className=' text-red-700'
                  />
                </div>

                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='subCategory'
                  >
                    Sub-category
                  </label>
                  <Field
                    className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    name='subCategory'
                    id='subCategory'
                    type='text'
                  />
                  <ErrorMessage
                    name='subCategory'
                    component='div'
                    className=' text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='manufacturerName'
                  >
                    Manufacturer Name
                  </label>
                  <Field
                  className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='text'
                    name='manufacturerName'
                    id='manufacturerName'
                    // placeholder='Manufacturer name'
                  />
                  <ErrorMessage
                    name='manufacturerName'
                    component='div'
                    className=' text-red-700'
                  />
                </div>
                {/* <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='priceBeforeDiscount'
                  >
                    Price Before Discount
                  </label>
                  <Field
                   className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='number'
                    name='priceBeforeDiscount'
                    id='priceBeforeDiscount'
                    placeholder='Enter the price '
                  />
                  <ErrorMessage
                    name='priceBeforeDiscount'
                    component='div'
                    className=' text-red-700'
                  />
                </div> */}
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='price'
                  >
                    Price - ₹
                  </label>
                  <Field
                    className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='number'
                    name='price'
                    id='price'
                    // placeholder='Price '
                  />
                  <ErrorMessage
                    name='price'
                    component='div'
                    className=' text-red-700'
                  />
                </div>
                {/* <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='withGST'
                  >
                    Price with GST
                  </label>
                  <Field
                    className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='number'
                    name='withGST'
                    id='withGST'
                    // placeholder='Enter the price with GST'
                  />
                  <ErrorMessage
                    name='withGST'
                    component='div'
                    className=' text-red-700'
                  />
                </div> */}
                {/* <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='shippingCharges'
                  >
                    Delivery Charges
                  </label>
                  <Field
                    className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='number'
                    name='shippingCharges'
                    id='shippingCharges'
                    placeholder='Enter the shipping charges '
                  />
                  <ErrorMessage
                    name='shippingCharges'
                    component='div'
                    className=' text-red-700'
                  />
                </div> */}
                <div >
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='sizeUnit'
                  >
                    Size Unit
                  </label>
                  <Field
                   className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='text'
                    name='sizeUnit'
                    id='sizeUnit'
                    // placeholder='Enter your size unit'
                  />
                  <ErrorMessage
                    name='sizeUnit'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='productQuantity'
                  >
                    Product Quantity
                  </label>
                  <Field
                   className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    type='text'
                    name='productQuantity'
                    id='productQuantity'
                    // placeholder='Enter your product total quantity'
                  />
                  <ErrorMessage
                    name='productQuantity'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-md block font-semibold text-gray-800'
                    htmlFor='availability'
                  >
                    Availability
                  </label>
                  <Field
                    as='select'
                    className=' w-full  rounded-md border-2 border-indigo-200 bg-indigo-100 p-2 '
                    name='availability'
                    id='availability'
                  >
                    <option className=' ' disabled></option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Field>
                  <ErrorMessage
                    name='availability'
                    component='div'
                    className='text-red-700'
                  />
                </div>

                {/* <div>
                  <label
                    className='text-gray-800 font-semibold  text-md '
                    htmlFor='selectImage1'
                  >
                    Image1
                  </label>
                  <Field
                    className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
                    type='text'
                    name='selectImage1'
                    id='selectImage1'
                    placeholder='selectImage1'
                  />
                  <ErrorMessage
                    name='selectImage1'
                    component='div'
                    className='text-red-700'
                  />
                </div>
                <div>
                  <label
                    className='text-gray-800 font-semibold  text-md flex'
                    htmlFor='selectImage2'
                  >
                    Image 2
                    <div className='text-gray-400 text-sm'>( ~optional )</div>
                  </label>
                  <Field
                    className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
                    type='text'
                    name='selectImage1'
                    id='selectImage1'
                    placeholder='Image 2'
                  />
                  <ErrorMessage
                    name='selectImage2'
                    component='div'
                    className='text-red-700'
                  />
                </div> */}
              </div>

              <div className='flex justify-center'>
                <button
                  className='mb-4 mt-6 hover:shadow-xl hover:border-2 hover:border-[#5c67f5] flex rounded-lg bg-[#5c67f5] px-8  py-2 font-sans text-lg font-semibold tracking-wide text-white'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>

              {/* {error && <div>{data.message}</div>} */}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProduct;

// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// const customerID = localStorage.getItem('customerID');

// const SignupSchema = Yup.object().shape({
//   productName: Yup.string().required('Information is required*'),
//   category: Yup.string().required('Information is required*'),
//   subCategory: Yup.string().required('Information is required*'),
//   manufacturer: Yup.string().required('Information is required*'),
//   priceBeforeDiscount: Yup.number().required('Information is required*'),
//   price: Yup.number().required('Information is required*'),
//   withGST: Yup.number().required('Information is required*'),
//   description: Yup.string().required('Information is required*'),
//   shippingCharges: Yup.number().required('Information is required*'),
//   sizeUnit: Yup.string().required('Information is required*'),
//   productQuantity: Yup.string().required('Information is required*'),
//   availability: Yup.string().required('Information is required*'),
//   selectImage1: Yup.mixed()
//     .required('Image is required')
//     .test('fileType', 'Only PNG and JPEG images are allowed', (value) => {
//       if (!value) {
//         return false;
//       }
//       return ['image/png', 'image/jpeg'].includes(value.type);
//     }),
//   selectImage2: Yup.mixed()
//     .required('Image is required')
//     .test('fileType', 'Only PNG and JPEG images are allowed', (value) => {
//       if (!value) {
//         return false;
//       }
//       return ['image/png', 'image/jpeg'].includes(value.type);
//     }),
// });

// const AddProduct = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       productName: '',
//       category: '',
//       subCategory: '',
//       manufacturer: '',
//       priceBeforeDiscount: '',
//       price: '',
//       withGST: '',
//       description: '',
//       shippingCharges: '',
//       sizeUnit: '',
//       productQuantity: '',
//       availability: '',
//       selectImage1: null,
//       selectImage2: null,
//     },
//     validationSchema: SignupSchema,
//     onSubmit: (values) => {
//       const formData = new FormData();
//       formData.append('name', values.name);
//       formData.append('email', values.email);
//       formData.append('image', values.image);

//       // Send the formData to the backend using an API call
//       // Example using Axios library:
//       console.log(customerID);
//       const token = localStorage.getItem('token');
//       setLoading(true);
//       axios

//         .post(
//           `https://procuren-backend-g6z9.onrender.com/addProducts`,
//           // `http://localhost:3001/costumer/enquiryForm`,
//           { ...values, customerID: `${customerID}` },
//           {
//             headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
//           }
//         )
//         .then((response) => {
//           console.log(response);
//           setData(response.data.data);

//           if (response.data.status === true) {
//             alert('Enquiry Send Successfully');
//           } else {
//             setError(error.message);
//             setLoading(false);
//           }
//         })
//         .catch((error) => {
//           setError(error.message);
//           setLoading(false);
//           // alert(`Invalid data ~ ${error.message}`);
//         });
//       axios
//         .post('/api/upload', formData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//   });

//   const handleImageChange = (event) => {
//     formik.setFieldValue('image', event.currentTarget.files[0]);
//   };

//   return (
//     <div>
//       <Form className=' px-10 py-10'  onSubmit={formik.handleSubmit} encType="multipart/form-data">
//         <h1 className='text-center text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-tl from-blue-600 to-pink-500 text-transparent bg-clip-text font-bold font-sans mb-10'>
//           Add Your Product
//         </h1>

//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='productName'
//             >
//               Product Name
//             </label>
//             <Field
//               className='select w-full max-w-xs p-2 rounded-md border-2 bg-slate-100 '
//               name='productName'
//               id='productName'
//               placeholder='Enter your product name.'
//             />
//             <ErrorMessage
//               name='productName'
//               component='div'
//               className='text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='category'
//             >
//               Category
//             </label>
//             <Field
//               className='w-full border-2 px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='text'
//               name='category'
//               id='category'
//               placeholder='Category'
//             />
//             <ErrorMessage
//               name='otherProduct'
//               component='div'
//               className=' text-red-700'
//             />
//           </div>
//           {/* <div>
//                   <label
//                     className='text-gray-800 font-semibold block text-md'
//                     htmlFor='subCategory'
//                   >
//                     Sub-category
//                   </label>
//                   <Field
//                     as='select'
//                     className='select w-full max-w-xs p-2 rounded-md border-2 bg-slate-100 '
//                     name='subCategory'
//                     id='subCategory'
//                   >
//                     <option className=' ' disabled></option>
//                     <option value='Wire'>Wire</option>
//                     <option value='Pipe'>Pipe</option>
//                     <option value='GI pipe'>GI pipe</option>
//                     <option value='40mm pipe'>40mm pipe</option>
//                     <option value='GI Elbow Joints'>GI Elbow Joints</option>
//                   </Field>
//                   <ErrorMessage
//                     name='productName'
//                     component='div'
//                     className='text-red-700'
//                   />
//                 </div> */}
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='subCategory'
//             >
//               Sub-category
//             </label>
//             <Field
//               as='select'
//               className='select w-full max-w-xs p-2 rounded-md border-2 bg-slate-100 '
//               name='subCategory'
//               id='subCategory'
//             />
//             <ErrorMessage
//               name='subCategory'
//               component='div'
//               className=' text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='manufacturer'
//             >
//               Manufacturer Name
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='text'
//               name='manufacturer'
//               id='manufacturer'
//               placeholder='Manufacturer Name'
//             />
//             <ErrorMessage
//               name='manufacturer'
//               component='div'
//               className=' text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='priceBeforeDiscount'
//             >
//               Price Before Discount
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='number'
//               name='priceBeforeDiscount'
//               id='priceBeforeDiscount'
//               placeholder='Enter the Price '
//             />
//             <ErrorMessage
//               name='priceBeforeDiscount'
//               component='div'
//               className=' text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='price'
//             >
//               Price
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='number'
//               name='price'
//               id='price'
//               placeholder='Enter the price with discount. '
//             />
//             <ErrorMessage
//               name='price'
//               component='div'
//               className=' text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='withGST'
//             >
//               Price with GST
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='number'
//               name='withGST'
//               id='withGST'
//               placeholder='Enter the Price with GST'
//             />
//             <ErrorMessage
//               name='withGST'
//               component='div'
//               className=' text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='shippingCharges'
//             >
//               Delivery Charges
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='number'
//               name='shippingCharges'
//               id='shippingCharges'
//               placeholder='Enter the Shipping Charges '
//             />
//             <ErrorMessage
//               name='shippingCharges'
//               component='div'
//               className=' text-red-700'
//             />
//           </div>
//           <div className='lg:col-span-2'>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='sizeUnit'
//             >
//               Size Unit
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='text'
//               name='sizeUnit'
//               id='sizeUnit'
//               placeholder='Enter your sizeUnit'
//             />
//             <ErrorMessage
//               name='sizeUnit'
//               component='div'
//               className='text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='productQuantity'
//             >
//               Product Quantity
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='text'
//               name='productQuantity'
//               id='productQuantity'
//               placeholder='Enter your product total quantity'
//             />
//             <ErrorMessage
//               name='productQuantity'
//               component='div'
//               className='text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold  text-md flex'
//               htmlFor='availability'
//             >
//               Availability
//               <div className='text-gray-400 text-sm'>( ~optional )</div>
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='text'
//               name='availability'
//               id='availability'
//               placeholder='Availability of your product (Yes/No)'
//             />
//             <ErrorMessage
//               name='alternativeNumber'
//               component='div'
//               className='text-red-700'
//             />
//           </div>

//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='confirm'
//             >
//               City
//             </label>
//             <Field
//               className='w-full border px-4 py-2 rounded-lg focus:outline-none bg-slate-100'
//               type='text'
//               name='city'
//               id='city'
//               placeholder='Enter your city name. '
//             />

//             <ErrorMessage
//               name='city'
//               component='div'
//               className='text-red-700'
//             />
//           </div>

//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='billingAddress'
//             >
//               Billing Address
//             </label>
//             <Field
//               as='textarea'
//               className='w-full  border bg-slate-100 px-4 py-2 rounded-lg focus:outline-none'
//               type='text'
//               name='billingAddress'
//               id='billingAddress'
//               placeholder='Enter your billing address'
//             />
//             <ErrorMessage
//               name='billingAddress'
//               component='div'
//               className='text-red-700'
//             />
//           </div>
//           <div>
//             <label
//               className='text-gray-800 font-semibold block text-md'
//               htmlFor='shippingPincode'
//             >
//               Shipping Pincode
//             </label>
//             <Field
//               className='w-full  border bg-slate-100 px-4 py-2 rounded-lg focus:outline-none'
//               type='text'
//               name='shippingPincode'
//               id='shippingPincode'
//               placeholder='Enter your city pincode.'
//             />
//             <ErrorMessage
//               name='shippingPincode'
//               component='div'
//               className='text-red-700'
//             />
//           </div>
//         </div>

//         <div className='flex justify-center'>
//           <button
//             className='flex  mt-6 bg-indigo-500 rounded-lg px-4 py-2 mb-4 text-lg text-white tracking-wide font-semibold font-sans'
//             type='submit'
//           >
//             {loading ? 'Loading...' : 'Send Enquiry'}
//           </button>
//         </div>

//         {error && <div>{error}</div>}
//       </Form>
//     </div>
//   );
// };

// export default AddProduct;

//  const AddProductsSchema = new mongoose.Schema({
//    productName: {
//        type: String,
//        require: true,
//        trim: true,
//    },
//    costumerID: {
//        type: ObjectId,
//        required: true,
//        ref: "costumer",
//        trim: true
//    },
//    category: {
//        type: String,
//        require: true,
//        trim: true
//    },
//    subCategory: {
//        type: String,
//        require: true,
//        trim: true
//    },
//    manufacturer: {
//        type: String,
//        require: true,
//        trim: true
//    },
//    priceBeforeDiscount: {
//        type: Number,
//        require: true,
//        trime: true
//    },
//    price: {
//        type: Number,
//        require: true,
//        trime: true
//    },
//    withGST: {
//        type: Number,
//        require: true,
//        trim: true
//    },
//    description: {
//        type: String,
//        require: true,
//        trim: true
//    },
//    shippingCharges: {
//        type: Number,
//        require: true,
//        trim: true
//    },
//    sizeUnit: {
//        type: String,
//        require: true,
//        trim: true
//    },
//    productQuantity: {
//        type: String,
//        require: true,
//        trim: true
//    },
//    availability: {
//        type: String,
//        require: true,
//        trim: true
//    },
//    selectImage1: {
//        require: true,
//        type: String,
//        require: true
//    },
//    selectImage2: {
//        type: String,
//    }, deletedAt: {
//        type: Date
//    },
//    isDeleted: {
//        type: Boolean,
//        default: false
//    },
//    status:{
//        type: String,
//        enum:["pending","approved","rejected"],
//        default:"pending"
//    },
//    deliveryStatus:{
//        type: String,
//        enum:["processing","shipped","inTransit","delivered"],
//        default:"processing"
//    }
//  }, { timestamps: true })
