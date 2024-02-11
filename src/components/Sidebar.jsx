import React from 'react'
import Menus from '../admin-panel/Menu'
import Company from '../../src/assets/Companylogo.png'

const Sidebar = () => {
  return (
    <div className="w-1/3">
    <div id="docs-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-6 flex justify-center items-center">
        <img src={Company} alt="" />
      </div>
      <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
        <ul className="space-y-1.5">
          {Menus.map((menu, index) => (
            <li key={index}>
              <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href={`${menu.link}`}>
                {/* You can render menu title and link here */}
                {menu.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="">
      <button className='px-6 py-2 rounded-full text-white bg-blue-900'>Logout</button>
      </div>
    </div>
  </div>
  )
}

export default Sidebar