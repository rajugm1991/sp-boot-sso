import React, { useEffect, useState } from "react";
import CourseSectionCardion from "./cardion/CourseSectionCardion";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import AppHeader from "../../common/AppHeader";
import CourseCardView from "./cardion/CourseCardView";
import { PUBLIC_GET_COURSE } from "../../constants";


const CourseView = () => {
  const params = useParams();
  const [course, setCourse] = useState({});


 

  useEffect(() => {
    getCourseData();
  }, []);
  const getCourseData = async () => {
    const courseData = await fetch(
      PUBLIC_GET_COURSE+ params.id
    );
    const dataJson = await courseData.json();
    setCourse(dataJson.data);
  };
  return (
    <>
      <AppHeader />
      <div id="viewContainer" className="pt-[6rem]">
        <div className="2xl:pl-[22rem] xl:pl-[8rem] pt-[2rem]">
          <h1 className="text-4xl ">
            Java full stack with spring boot application
          </h1>
          <span className="font-normal">
            Learn java basics and spring boot functions
          </span>
        </div>
        <div className="flex flex-row">
          <div
            id="section"
            className="  m-1 2xl:pl-[22rem] pt-[2rem]  xl:pl-[8rem] "
          >
            <h5 className="font-semibold text-lg">Syllabus</h5>
            <div className="rounded-3xl shadow-lg  w-[50rem] h-auto ">
              {Object.keys(course).length > 0 && (
                <CourseSectionCardion key={course.id} course={course} />
              )}
            </div>
          </div>
          {Object.keys(course).length > 0 && <CourseCardView course={course} />}
        </div>
        <div id="author" className="2xl:pl-[22rem] xl:pl-[8rem] pt-[2rem]">
          <div id="details" className="flex flex-col">
            <h2 className="font-normal text-2xl">Author</h2>
            <div className="flex flex-row">
              <img
                class="w-16 h-16 rounded-full "
                src="https://media.licdn.com/dms/image/C4D03AQFaGYL__kT5mA/profile-displayphoto-shrink_800_800/0/1617119828687?e=1693440000&v=beta&t=z0CrI4-Q4EBcRkAJdrk65Pk5AKwPriaYMWxBNyzizac"
                alt="John Doe"
              ></img>
              <span className="font-bold text-base m-3">Raju</span>
            </div>
            <span className="m-1 p-2 w-[51rem] leading-6">
              I will be your lead trainer in this course. Within no time, I will
              help you to understand the subject in an easy manner. I have a
              huge experience in online training and recording videos. Let's get
              started!
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseView;
