import React, { useEffect } from 'react';


const ModalVideo2 = ({ visible, onClose }) => {
  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  if (!visible) return null;
  return (
    <div
      id='container'
      onClick={handleOnClose}
     
      className='fixed  inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'
    >
      <div className=' md:w-2/3 p-1 overflow-hidden' >
       

         <div className='flex justify-around text-center'>
          
          <button
            onClick={onClose}
            className='rounded text-lg md:text-xl border  px-4 text-white mt-4'
          >
            Close
          </button>
        </div> 
      </div>
    </div>
  );
};

export default ModalVideo2;
