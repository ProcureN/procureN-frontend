import React, { useEffect } from 'react';

const ModalDubplicates = ({ visible, onClose, data }) => {
  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onClose();
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [onClose]);

  useEffect(() => {
    // console.log(data);
    console.log(data);
  }, [data]);

  function TableRow({ item, index }) {
    return (
      <tr
        key={index}
        className={` whitespace-nowrap border-y  border-black p-1 text-center hover:bg-indigo-100 md:py-2  xl:whitespace-normal `}
      >
        {/* <td className='whitespace-nowrap border border-black px-1 text-center  text-sm md:py-2  '>
          {index + 1}
        </td> */}
        <td className='whitespace-nowrap border-l border-black px-1 text-center  text-sm md:py-2  '>
          {item.row}
        </td>
        <td className=' border-r border-black px-1  text-center md:py-2  '>
          {item['Vch-No']}
        </td>
      </tr>
    );
  }

  if (!visible) return null;
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed  top-16 flex items-center justify-center whitespace-nowrap md:right-[18%] '
    >
      {/* {Object.keys(data).length > 0 && data.dupesClients.length > 0 ? (
        <div className=' absolute top-20 overflow-hidden bg-white px-4 py-6 md:w-2/3 '>
          <table className='w-full'>
            <thead className=''>
              <tr className='border-y border-gray-400 bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] p-1 font-normal  text-white md:p-2 '>
                <th className='border-x border-gray-400 px-4 py-1 md:py-2'>
                  Sr. No.
                </th>
                <th className='border-x border-gray-400 px-4'>Row No.</th>
                <th className='border-x border-gray-400 px-4'>Voucher No</th>
              </tr>
            </thead>
            <tbody>
              {data.dupesClients.map((item, index) => (
                <TableRow key={index} index={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=' rounded-md border bg-white  '>
          <div
            className=' mr-4 flex cursor-pointer justify-end pt-2 text-red-500 '
            onClick={onClose}
          >
            <div className='w-min rounded-full border border-red-500 px-1.5'>
              X
            </div>
          </div>
          <div className='px-10 pb-3'>No duplicates entries.</div>
        </div>
      )} */}
      <div className=' rounded-md border bg-gray-50 shadow-lg shadow-gray-800 '>
        <div
          className=' mr-4 flex cursor-pointer justify-end gap-2 py-2 text-red-500 '
          onClick={onClose}
        >
          {Object.keys(data).length > 0 && data.dupesClients.length > 0 && <div className=''>Duplicates Rows </div>}
          <div className='w-min rounded-full border border-red-500 px-1.5'>
            X
          </div>
        </div>
        {Object.keys(data).length > 0 ? (
           data.invalidRows && data.invalidRows.length > 0 ? (
            <div className='px-10 pb-3 '>
              <span className='text-red-700 text-sm'>Invalid heading presents</span> <br />
              {data.invalidRows[0].join(', ')}
            </div>
          ) 
          :data.dupesClients && data.dupesClients.length > 0 ? (
            <div className='mr-6 max-h-[70vh] overflow-y-scroll rounded-md pb-4 pl-4 pr-2'>
              <table>
                <thead>
                  <tr className='border border-black bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] p-1 font-normal text-white md:p-2'>
                    {/* <th className='border-x border-gray-400 px-2 py-1 md:py-2'>
              Sr. No.
            </th> */}
                    <th className='px-5 py-2'>Row No.</th>
                    <th className='px-8 py-2'>Voucher No.</th>
                  </tr>
                </thead>
                <tbody>
                  {data.dupesClients.map((item, index) => (
                    <TableRow key={index} index={index} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='px-10 pb-3'>No duplicates entries.</div>
          )
        ) : (
          <div className='px-10 pb-3'>No duplicates entries.</div>
        )}
      </div>

      {/* <div
          className=' mr-4 flex cursor-pointer justify-end pt-2 text-red-500 '
          onClick={onClose}
        >
          <div className='w-min rounded-full border border-red-500 px-1.5'>
            X
          </div>
        </div> */}
    </div>
  );
};

export default ModalDubplicates;
