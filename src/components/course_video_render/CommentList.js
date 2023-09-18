

import React from 'react'

const CommentList = ({image,comment}) => {
  return (
     <>
     
     <div className='h-auto w-full border border-gray-200 rounded-lg shadow-lg '>
      <div className='flex flex-row pt-2'>
      <div class="photo-wrapper m-1 px-2 ">
          <img
            class="w-12 h-12 rounded-full mx-auto"
            src={image}
            alt="John Doe"
          />
        </div>
        <div className='m-1' >
          <div className='flex flex-col'>
        <span className="font-extrabold">
                     Raju
                    </span>
                    <span className="text-xs font-extralight pt-1">
                   Fri Jan 07 2023 at 11:22:21
                    </span>
             </div>
        </div>

      </div>
      <div id='commentinfo' className='m-2'>
      <span className='text-sm/6 text-gray-600 dark:text-white '>{comment}</span>
      </div>
      <div id='icons' className=''>

        <div className='flex flex-row m-1 space-x-2'>
        <svg class="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
</svg>
        <svg class="w-4 h-4  text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v12m0 0 4-4m-4 4L1 9"/>
</svg>

<svg class="w-4 h-4  text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
</svg><span className='font-extralight'>replay</span> 

        </div>

      </div>

    </div>
    </>
  )
}

export default CommentList