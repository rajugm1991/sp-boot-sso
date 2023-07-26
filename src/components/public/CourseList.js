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
      //  getCourseList();
    },[])

  return (
    <div className='m-12  flex flex-wrap'>
       {courseList.length>0&& courseList.map((courseData)=> <Link to={'/learn'} key={courseData.id}> <CourseCard key={courseData.id} course={courseData} /></Link>)}
    </div>
  )
}

export default CourseList