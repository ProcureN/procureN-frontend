import React, { useState } from 'react';
import LoginPage from '../assets/LoginBack.jpg';
import SignupPage2 from './SignupPage2';
import SignupPage1 from './SignupPage1';

const Signup = () => {
  const [next, setNext] = useState(false);
  const [formValue, setFormValue] = useState({});

  return (
    <>
      <div className='absolute inset-0 hidden h-full bg-black opacity-50 xl:block'></div>

      <div
        className=' flex h-screen w-full items-center justify-center bg-cover  bg-center '
        style={{ backgroundImage: `url(${LoginPage})` }}
      >
        <div className={`z-20 m-2  w-[400px]   shadow-2xl  `}>
          {next ? (
            <SignupPage2 setNext={setNext} formValue={formValue} />
          ) : (
            <SignupPage1 setNext={setNext} setFormValue={setFormValue} />
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
