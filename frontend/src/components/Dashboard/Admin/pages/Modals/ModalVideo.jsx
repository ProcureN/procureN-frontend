import React from 'react';

const ModalVideo = ({ visible, onClose }) => {
  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };
  if (!visible) return null;
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed inset-0  flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'
    >
      <div className=' overflow-hidden m-1  lg:w-2/3 xl:h-2/3'>
        <video
          autoPlay
          muted
          loop
          style={{
            top: 0,
            left: 0,
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            // borderWidth: "1px",
          }}
        >
          <source
            src='https://test-saboo-rks.s3.ap-south-1.amazonaws.com/heroVideo.mp4'
            type='video/mp4'
          />
        </video>
      </div>

      <button
        onClick={onClose}
        className='mt-4 rounded-full border px-4 py-1 lg:px-8 lg:py-2  text-lg text-white md:text-xl'
      >
        Close
      </button>
    </div>
  );
};

export default ModalVideo;
