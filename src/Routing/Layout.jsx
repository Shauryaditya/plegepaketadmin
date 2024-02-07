import React from 'react'

const Layout = ({ sidebar, content }) => {
  return (
    <div className="flex space-x-5 max-w-screen-2xl  min-h-screen relative">
      <div className="sidebar bg-[#00388c] h-fit w-fit sticky top-0 z-10">{sidebar}</div>
      <div className="content flex-1 overflow-x-hidden ml-1/4">{content}</div>
    </div>
  )
}

export default Layout