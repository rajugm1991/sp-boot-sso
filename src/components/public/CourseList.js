import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom';
import { PUBLIC_GET_COURSE } from '../../constants';

const CourseList = () => {

    const [courseList,setCourseList]=useState([]);
    
    //sds

    const getCourseList=async()=>{
        const data=await fetch(PUBLIC_GET_COURSE);
        const jsonData=await data.json();
        setCourseList(jsonData);
    }

    useEffect(()=>{
         getCourseList();
    },[])

  return (
    <div className='m-11 flex flex-wrap overflow-scroll'>
       {courseList.length>0&& courseList.map((courseData)=> <Link to={'/learn/'+courseData.id} key={courseData.id}> <CourseCard key={courseData.id} course={courseData} /></Link>)}
    </div>
  )
}

export default CourseList