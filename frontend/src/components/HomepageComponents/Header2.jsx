import { useState } from 'react';

// import logo from '../../assets/logo1.png';
import logo2 from '../../assets/logo.png';

import { Link } from 'react-router-dom';

const navigation = [
  // { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#service' },
  { name: 'Inventory', href: '#inventory' },
  { name: 'Contact', href: '#contact' },
];

export default function Header2({ setShowMyModal }) {
  const [open, setOpen] = useState(false);
  //change nav color when crolling

  const [selectedItem, setSelectedItem] = useState(0);
  // ...

  return (
    <div
      className={`fixed isolate z-10
       w-full   border-b bg-[white] duration-150 `}
    >
      <>
        {/* bg-[#492DD5] */}
        <nav className={`  container mx-auto  py-1   `}>
          <div className='flex items-center justify-between'>
            <div
              className={`  text-[#5c67f5]md:w-auto flex w-full items-center 
               justify-between`}
            >
              <a href='#hero' id='logoForHeader'>
                <img
                  src={logo2}
                  alt='logo'
                  className='h-16 px-3 py-1 md:h-20 md:cursor-pointer md:px-8  '
                />
              </a>
              <div
                className='z-10 flex p-3 text-3xl md:hidden md:p-5 '
                onClick={() => setOpen(!open)}
              >
                <ion-icon name={`${open ? 'close' : 'menu'}`}></ion-icon>
              </div>
            </div>
            <div>
              <ul
                className={`hidden  items-center gap-6 pr-4 uppercase text-[#5c67f5]   md:flex`}
              >
                {navigation.map((item, i) => (
                  <div className='relative'>
                    <a
                      key={i}
                      href={item.href}
                      onClick={() => setSelectedItem(i)}
                    >
                      <li
                        className={`from-[#5c67f5] to-[#cb67ac]  ${
                          selectedItem === i
                            ? ` border-b-2 bg-gradient-to-tr  font-bold  tracking-wide text-transparent                              `
                            : 'hover:border-b-2 '
                        }  border-indigo-500 bg-clip-text hover:bg-gradient-to-tr hover:font-bold hover:text-transparent
                         `}
                      >
                        {item.name}
                      </li>
                    </a>
                  </div>
                ))}
                <li>
                  <div>
                    <Link to='/login'>
                      {/* <button
                        type='button'
                        className='flex items-center rounded-lg bg-gradient-to-b from-purple-500 to-[#cb67ac] px-2.5 py-1.5  text-center text-lg font-medium text-white  hover:bg-gradient-to-t hover:from-[#5440ef] hover:to-[#E82FE8] focus:outline-none focus:ring-4  focus:ring-purple-200 dark:focus:ring-purple-800 '
                      >
                        Login
                        
                      </button> */}
                      <button
                        className={`inline-flex rounded-full  border-2 border-[#5c67f5]  bg-white  from-[#5c67f5] to-[#cb67ac] px-2 py-1 text-lg text-[#5c67f5]  duration-500 hover:bg-gradient-to-tr  hover:text-white focus:outline-none lg:px-4`}
                        // className={` inline-flex  rounded-full border-2  hover:border-[#5c67f5]   bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] px-2 py-1 text-lg text-white  duration-500 hover:bg-white hover:from-white hover:text-[#5c67f5] focus:outline-none lg:px-4 `}
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                </li>
              </ul>

              {/* Mobile nav */}
              <ul
                className={` fixed bottom-0 top-0 mx-4 mt-2 h-[45%] min-h-[370px] w-full overflow-y-auto rounded-3xl bg-gray-100 pl-4 pt-10  text-lg text-indigo-800 duration-500 md:mt-1 md:hidden      md:h-[60%] ${
                  open ? 'left-[60%]  md:left-[70%] ' : 'left-[100%]'
                }`}
              >
                {navigation.map((item, index) => (
                  <div key={index}>
                    <a href={item.href}>
                      <li
                        className='inline-block px-3 pb-6 hover:text-indigo-500'
                        onClick={() => setOpen(!open)}
                      >
                        {item.name}
                      </li>
                    </a>
                    <br />
                  </div>
                ))}
                <li>
                  <div>
                    <Link to='/login'>
                      <button
                        type='button'
                        className='ml-2 rounded-lg bg-gradient-to-tr from-[#5c67f5] to-[#cb67ac] px-4  py-1.5 text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-purple-200  dark:focus:ring-purple-800   '
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
}
