import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = ({ links, setInputValue }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    // console.log(item);
    setInputValue(item.name);
    setSelectedItem(item.name);
  };

  const history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerID');
    localStorage.removeItem('role');
    alert('Succefully logout');
    history('/login');
  };

  return (
    <div className='container w-max '>
      <section className='    border'>
        <div className='flex h-screen flex-col justify-between pr-0.5'>
          <div className='  borderbg-slate-300 border-1 rounded-xl border-indigo-800'>
            <Link to='/' className='flex justify-center '>
              <img
                src={logo}
                alt='ProcureN Logo'
                srcSet=''
                className=' mx-auto h-16 py-2 md:h-20'
              />
            </Link>
            <div>
              <ul>
                {links.map((items, index) => (
                  <div key={index}>
                    <li
                      className={`mt-6 border-t-2 border-gray-400 p-4 lg:text-lg  font-medium `}
                    >
                      {items.Head}
                    </li>
                    <ul>
                        {items.subLinks.map((x, subIndex) => (
                          <Link to={x.link} key={subIndex}>
                            <li
                              className={`mx-2 mb-2 duration-75  flex text-[#5c67f5] items-center rounded-xl py-2 pl-2 pr-2 text-md font-mono lg:mb-4 lg:text-lg ${
                                selectedItem === x.name
                                  ? 'bg-[#5c67f5] text-white pl-5  '
                                  : ' hover:hover:bg-[#5c67f5] hover:text-white'
                              }`}
                              onClick={() => handleClick(x)}
                            >
                              {/* <div className='border-1 m-2 h-3 w-3 rotate-45 border bg-gradient-to-bl from-blue-500 to-pink-300'></div> */}
                              {/* {x.logo && React.createElement(x.logo)} */}
                              <div className={`mx-2 text-2xl `} >
                                {x.logo[0]}
                              </div>
                              <div className=''>{x.name}</div>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button
              className='m-2 mb-10 flex rounded-xl border-2 px-4 py-2 font-medium hover:hover:bg-[#5c67f5] hover:text-white'
              onClick={handleLogout}
            >
              <BiLogOut className='my-auto mr-2 text-xl ' />
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
