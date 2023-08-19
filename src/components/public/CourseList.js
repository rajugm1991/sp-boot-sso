import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom';

const CourseList = () => {

    const [courseList,setCourseList]=useState([]);
    

    const getCourseList=async()=>{
        const data=await fetch('http://localhost:8080/public/api/course');
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