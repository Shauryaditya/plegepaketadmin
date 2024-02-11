import React from 'react'

const Searchbar = () => {
  return (
    <div className='w-[27rem]'>
     <div class="pt-2 relative mx-auto text-gray-600">
        <input class="w-full border-2 border-gray-200 bg-gray-300 h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
          type="search" name="search" placeholder="Search" />
        <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
        </button>
      </div>
    </div>
  )
}

export default Searchbar