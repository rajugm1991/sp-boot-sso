

import React from 'react'

const CourseCardView = ({course}) => {
    console.log(course);

    const {name,price}=course;
    const {url}=course.courseImage;

  return (
    <div id="cardview" className="m-4 py-9 fixed top-14 right-36 xl:right-36 2xl:right-[20rem]">
           <div class='w-80 grid-cols-1 divide-y bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div class=" ">
              <div className="m-4">
                <img
                  class="rounded-t-lg w-full h-56"
                  src={url}
                  alt=""
                />
              </div>
              <div className="m-2"> 
              <p className="text-3xl font-medium">&#8377; {price}</p> 
              </div>
              <div className="m-2  flex flex-row space-x-1">
              <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">BUY NOW</button>
              <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
     START A FREE TRAIL
  </span>
</button>
              </div>
            </div>
            <div>
                <div className="m-3">
                       <h3>What's included</h3>
                       <ul className="space-y-4 ">
                        <li className="space-x-2 flex flex-row"> 
                         <span>+</span>
                         <span><span className="font-medium">{course.courseLeasons.length}</span> Lessons</span>
                        </li>       
                        <li className="space-x-2 flex flex-row"> 
                         <span>📃</span>
                         <span><span className="font-medium">1</span> Test</span>
                        </li>
                        <li className="space-x-2 flex flex-row"> 
                         <span>🎁</span>
                         <span><span className="font-medium">101</span>Trail Lessons</span>
                        </li>
                       </ul>
                </div>
            </div>
            </div>
          </div>    
  )
}

export default CourseCardView