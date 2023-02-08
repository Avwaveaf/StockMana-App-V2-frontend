import React from 'react'

const SearchBar = ({searchTerm,onSearchChange }) => {
  return (
    <div className='flex items-center pl-5 p-2 space-x-3 rounded-md  bg-slate-200 lg:w-1/2 w-full leading-relaxed text-gray-500'>

    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      className='w-5 h-5 fill-current dark:text-gray-400'
    >
      <path d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z'></path>
    </svg>
          <input type="search" name="search" placeholder='Search product...' className='border-none border-transparent focus:outline-none focus:border-transparent bg-slate-200 w-full' value={searchTerm } onChange={onSearchChange}/>

  </div>
  )
}

export default SearchBar