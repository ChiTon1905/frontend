import React, { Profiler, useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { useStateContext } from '../contexts/ContextProvider'
import { useUser } from '../../Contexts/UserContext';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { user, setUser, handleLogout } = useUser()
  const [isOpen, setIsOpen] = useState(false);

  const
    {
      activeMenu,
      setActiveMenu,
      isClicked,
      setIsClicked,
      handleClick,
      screenSize,
      setScreenSize
    } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
      <NavButton
        title='Menu'
        customFunc={() =>
          setActiveMenu((prevActiveMenu) => !prevActiveMenu)
        }
        color='blue'
        icon={<AiOutlineMenu />}
      />
      <div className='flex'>
        {
          user ? (
            <div className="relative inline-block text-left text-blue-700 items-center py-2 px-3 text-xl">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-center w-full px-4 py-2 "
                >
                  {user.name}
                </button>
              </div>
              {isOpen && (
                <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                      role="menuitem"
                    >
                      Thông tin người dùng
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login' className="inline-flex items-center py-2 px-3 text-xl hover:text-blue-500">
              Sign in
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Navbar