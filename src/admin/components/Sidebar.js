import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { links, linksEmployee } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import { useUser } from '../../Contexts/UserContext'

const Sidebar = () => {

  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { user, setUser } = useUser()
  const [linksAdmin, setLinksAdmin] = useState([])

  const handleCloseSideBar = () => {
    if (activeMenu === true && screenSize <= 900) {
      setActiveMenu(false)
    }
  }

  useEffect(() => {
    const determineUserRole = () => {
      if (user && user.roles && user.roles.length > 0) {
        const isAdmin = user.roles.some(role => role.name === 'admin');
        const isEmployee = user.roles.some(role => role.name === 'employee');

        if (isAdmin) {
          return 'admin';
        } else if (isEmployee) {
          return 'employee';
        }
      }

      // Return 'default' or handle other cases
      return 'default';
    };

    // Determine the user role
    const userRole = determineUserRole();

    // Update linksAdmin based on user role
    switch (userRole) {
      case 'admin':
        setLinksAdmin(links);
        break;
      case 'employee':
        setLinksAdmin(linksEmployee);
        break;
      // Handle other cases if needed
      default:
        // Perform actions for default or handle other cases
        break;
    }
  }, [user])


  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';

  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {
        activeMenu && (
          <>
            <div className='flex justify-between items-center'>
              <Link to='/' onClick={handleCloseSideBar}
                className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
                <SiShopware /> <span>Shoppy</span>
              </Link>
              <TooltipComponent content="Menu" position='BottomCenter'>
                <button type='button'
                  onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
                  className='text-xl rounded-full hover:bg-light-gray p-3 mt-4 block'>{/*md:hidden*/}
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className='mt-10'>
              {
                linksAdmin.length <= 0 ? (
                  <p>Loading...</p>
                ) : (
                  linksAdmin.map((item) => (
                    <div key={item.title}>
                      <p className='text-gray-400 m-3 mt-4 uppercase'>
                        {item.title}
                      </p>
                      {item.links.map((link) => (
                        <NavLink
                          to={`/admin/${link.name}`}
                          key={link.name}
                          onClick={handleCloseSideBar}
                          className={({ isActive }) => isActive ? activeLink : normalLink}
                        >
                          {link.icon}
                          <span className='capitalize'>
                            {link.name}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  ))
                )
              }
            </div>
          </>
        )
      }

    </div>
  )
}

export default Sidebar