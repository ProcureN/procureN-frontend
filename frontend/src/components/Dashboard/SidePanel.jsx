import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import { Link, useNavigate } from 'react-router-dom';

import { AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';

const SidePanel = ({ open, setOpen, selectedItem, setSelectedItem, links }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  let history = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    screenSize <= 1600 ? setOpen(false) : setOpen(true);
  }, [screenSize, setOpen]);

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
    <div className='flex   '>
      <div
        className={`absolute z-10  border-r bg-white duration-500 md:hidden   ${
          open ? 'left-0  ' : '-left-[100%]'
        }  flex flex-col justify-between rounded-r-xl   `}
      >
        <div>
          <div className='relative  mt-2  pt-2'>
            <Link to='/'>
              <img src={logo} alt='logo' className='mx-4  h-[56px] ' />
            </Link>
            <AiOutlineClose
              onClick={() => setOpen(false)}
              className='absolute right-2 top-1/2 cursor-pointer  hover:text-red-800'
            />
          </div>
          <div>
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
                        <div className={`mx-2 text-2xl `}>{x.logo[0]}</div>
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
          className={`mx-2 mb-8 flex cursor-pointer gap-2 rounded-xl border-2 border-gray-300 py-2 pl-2  pr-2 font-mono  text-lg text-[#5c67f5] duration-75 hover:border-[#5c67f5]  lg:text-xl`}
          onClick={handleLogout}
        >
          <AiOutlineLogout className='' />
          <span> Logout</span>
        </div>
      </div>
      <div
        className={`hidden shadow-xl md:block ${
          open ? 'min-w-max' : 'w-20'
        }   mr-2 justify-between rounded-r-md bg-white  transition  `}
      >
        <div className='flex h-full flex-col justify-between'>
          <div>
            <div className='mb-6    py-4'>
              <Link to='/'>
                {open ? (
                  <img src={logo} alt='logo' className='mx-auto  h-16  ' />
                ) : (
                  <img src={logo2} alt='logo' className=' h-12  px-4 ' />
                )}
              </Link>
            </div>
            <div className=''>
              <div>
                <ul>
                  {links.map((items, index) => (
                    <div key={index}>
                      <li
                        className={`mt-6 border-t border-gray-400 p-4 font-medium  lg:text-lg  `}
                      >
                        <span className={`${open ? 'visible' : 'hidden'}`}>
                          {items.Head}
                        </span>
                      </li>
                      <ul>
                        {items.subLinks.map((x, subIndex) => (
                          <li
                            key={subIndex}
                            className={`text-md group relative mx-2 mb-2 flex items-center rounded-xl py-2 pl-2 pr-2 font-mono text-[#5c67f5] duration-75 lg:mb-4 xl:text-lg ${
                              selectedItem === x.name
                                ? 'bg-[#5c67f5] text-white   '
                                : ' hover:hover:bg-[#5c67f5] hover:text-white'
                            }`}
                            onClick={() => handleClick(x)}
                          >
                            <div className={`mx-2 text-2xl `}>{x.logo[0]}</div>
                            {/* {!open && (
                              <span class='absolute   -mb-8  translate-y-full whitespace-nowrap rounded-md bg-indigo-800 px-1 text-sm opacity-0 transition-opacity  group-hover:opacity-100'>
                                {x.name}
                              </span>
                            )} */}
                            <div
                              className={`${
                                open ? 'visible' : 'hidden'
                              } text-md`}
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
            className={`mx-2 mb-8 flex cursor-pointer gap-2 rounded-xl border-2 border-gray-300 py-2 pl-2  pr-2 font-mono  text-lg text-[#5c67f5] duration-75 hover:border-[#5c67f5] `}
            onClick={handleLogout}
          >
            <AiOutlineLogout className='text-3xl' />
            <span className={`${open ? 'visible' : 'hidden'}`}> Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
