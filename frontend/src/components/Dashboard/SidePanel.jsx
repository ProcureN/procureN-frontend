// import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import {  useNavigate } from 'react-router-dom';

import { AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';

const SidePanel = ({ open, setOpen, selectedItem, setSelectedItem, links }) => {
  // const [screenSize, setScreenSize] = useState(undefined);
  let history = useNavigate();

  // useEffect(() => {
  //   const handleResize = () => setScreenSize(window.innerWidth);

  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // useEffect(() => {
  //   screenSize <= 1600 ? setOpen(false) : setOpen(true);
  // }, [screenSize, setOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerID');
    localStorage.removeItem('role');
    history('/');
  };

  // const handleSelect = (value) => {
  //   setSelectedItem(value);
  //   setOpen(!open);
  // };

  const handleClick = (item) => {
    // console.log(item);
    // setInputValue(item.name);
    setSelectedItem(item.name);
  };

  return (
    <div className='flex    '>
      <div
        className={`absolute z-10  border-r bg-white duration-500 md:hidden   ${
          open ? 'left-0  ' : '-left-[100%]'
        }  flex flex-col justify-between rounded-r-xl   `}
      >
        <div>
          <div className='relative  mt-2  pt-2'>
            <img src={logo} alt='logo' className='mx-4  h-[56px] '  />

            <AiOutlineClose
              onClick={() => setOpen(false)}
              className='absolute right-2 top-1/2 cursor-pointer  hover:text-red-800'
            />
          </div>
          <div className=''>
            <ul>
              {links.map((items, index) => (
                <div key={index}>
                  <li
                    className={`mt-6 border-t border-gray-400 p-4 font-medium    `}
                  >
                    <span className={`${open ? 'visible' : 'hidden'}`}>
                      {items.Head}
                    </span>
                  </li>
                  <ul>
                    {items.subLinks.map((x, subIndex) => (
                      <li
                        key={subIndex}
                        className={` mx-2 mb-2  flex items-center rounded-xl py-2 pl-2 pr-2 font-mono text-[#5c67f5] duration-75 lg:mb-4  ${
                          selectedItem === x.name
                            ? 'bg-[#5c67f5] text-white   '
                            : ' hover:hover:bg-[#5c67f5] hover:text-white'
                        }`}
                        onClick={() => handleClick(x)}
                      >
                        <div className={`mx-2 text-2xl ${open ? 'visible' : 'hidden'} `}>{x.logo[0]}</div>
                        <div className={`${open ? 'visible' : 'hidden'} `}>
                          {x.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`mx-2 mb-8 flex cursor-pointer gap-2 rounded-xl border-2 border-gray-300 py-2 pl-2  pr-2 font-mono   text-[#5c67f5] duration-75 hover:border-[#5c67f5]  `}
          onClick={handleLogout}
        >
          <AiOutlineLogout className='' />
          <span> Logout</span>
        </div>
      </div>
      <div
        className={`hidden border-r shadow-lg md:block ${
          open ? 'min-w-max' : 'w-20'
        }   mr-2  rounded-r-md bg-white  transition   `}
      >
        
          <div>
            <div className='mb-6 py-4 cursor-pointer'  onClick={()=>setSelectedItem(links[0].subLinks[0].name)}>
        
                {open ? (
                  <img src={logo} alt='logo' className='mx-auto  h-16  ' />
                ) : (
                  <img src={logo2} alt='logo' className=' h-12  px-4 ' />
                )}
          
            </div>
            <div className=''>
              <div>
                <ul>
                  {links.map((items, index) => (
                    <div key={index}>
                      <li
                        className={`mt-6 border-t border-gray-400 p-4 font-medium   `}
                      >
                        <span className={`${open ? 'visible' : 'hidden'}`}>
                          {items.Head}
                        </span>
                      </li>
                      <ul>
                        {items.subLinks.map((x, subIndex) => (
                          <li
                            key={subIndex}
                            className={`text-md cursor-pointer group relative mx-2 mb-2 flex items-center rounded-xl py-2 pl-2 pr-2 font-mono text-[#5c67f5] duration-75 lg:mb-4 ${
                              selectedItem === x.name
                                ? 'bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] text-white   '
                                : ' hover:bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] hover:text-white'
                            }`}
                            onClick={() => handleClick(x)}
                          >
                            <div className={`mx-2 text-2xl ${open ? 'hidden' : 'visible'} `}>{x.logo[0]}</div>
                            {/* {!open && (
                              <span class='absolute   -mb-8  translate-y-full whitespace-nowrap rounded-md bg-indigo-800 px-1 text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                                {x.name}
                              </span>
                            )} */}
                            <div
                              className={`${
                                open ? 'visible' : 'hidden'
                              } text-md mx-2`}
                            >
                              {x.name}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`mx-2 mt-8 flex cursor-pointer gap-2 rounded-xl border  py-2 pl-4  pr-2 font-mono  text-[#5c67f5] duration-75 hover:border-[#5c67f5] `}
            onClick={handleLogout}
          >
            <AiOutlineLogout className={`${open ? 'hidden' : 'visible'} text-2xl`} />
            {/* <span > Logout</span> */}
            <span className={`${open ? 'visible' : 'hidden'}`}> Logout</span>
          </div>
        </div>
      </div>
  
  );
};

export default SidePanel;
