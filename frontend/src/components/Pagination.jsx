import React from 'react'

const Pagination = ({currentPage,setCurrentPage,totalPages}) => {
  return (
    <div className='flex justify-center items-center mt-5 space-x-2'>
    <button
    disabled={currentPage===1}
    onClick={()=>setCurrentPage((prev)=>prev-1)}
    className='px-3 py-1 border rounded disabled:opacity-50 cursor-pointer'
    >Prev</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
    disabled={currentPage===totalPages}
    onClick={()=>setCurrentPage((prev)=>prev+1)}
    className='px-3 py-1 border rounded disabled:opacity-50 cursor-pointer'
    >Next</button>
    </div>
  )
}

export default Pagination