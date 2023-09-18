

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getRequest, postRequest } from '../../../util/APIUtils';
import { API_COURSE_PAID_SUBSCRIBE, API_COURSE_SUBSCRIBE ,STRIPE_PUBLIC_KEY} from '../../../constants/URLConstants';
import { message } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const CourseCardView = ({course}) => {

    const user = useSelector((state) => state.auth);
    const [subData, setSubData] = useState({});
    const [recState, setRecState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [temp, setTemp] = useState(false);

console.log('subData--'+subData);
  const rediretCoursePage = (courseId) => {
    history.push("/learnCourse/" + courseId);
  };

  const history = useHistory();


  const handlePaidEnrollment = async (course_id) => {
    console.log("Paid course");
    setLoading(true);
    const session = await postRequest(API_COURSE_PAID_SUBSCRIBE, {
      courseId: course_id,
    });
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
    stripe.redirectToCheckout({ sessionId: session.data });
  };

  const handleFreeEnrollment = (courseId) => {
    console.log("Free course");
    const data = { courseId: courseId, type: "FREE" };
    console.log("da--" + data);

    postRequest(API_COURSE_SUBSCRIBE, data)
      .then((res) => {
        message.success(res.message);
        setRecState(!recState);
      })
      .catch((err) => {
        console.log("COURSE_SUBSCRIBE: error while subscribing," + err);
      });
  };

    useEffect(() => {
      setLoading(true);
      if (Object.keys(course).length > 0) {
        getRequest(API_COURSE_SUBSCRIBE + "/" + course.id)
          .then((res) => {
            setSubData(res.data);
            setLoading(false);
            setTemp(true);
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    }, [course, recState]);
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
              <div className="m-4  flex flex-row space-x-1">
              {/* <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">BUY NOW</button> */}
              <button 
              onClick={
                Object.keys(user.currentUser).length === 0?()=>{
                  history.push('/login');
                }
                :
                !temp
                ? course.paid
                  ? () => handlePaidEnrollment(course.id)
                  : () => handleFreeEnrollment(course.id)
                : () => {
                    rediretCoursePage(course.id);
                  }
              }
              class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span class="relative px-16 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  {Object.keys(user.currentUser).length > 0
                        ? Object.keys(subData).length > 0
                          ? "Go to course dashboard"
                          : loading? <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                          </path>
                      </svg>
                         : "Buy now"
                        : "Login to buy course"}
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