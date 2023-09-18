import React, { useEffect, useState } from "react";
import AppHeader from "../../common/AppHeader";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CourseSectionCardion from "../public/cardion/CourseSectionCardion";
import ReactPlayer from "react-player";
import TabDetails from "./TabDetails";
import { PUBLIC_GET_COURSE } from "../../constants";

const CourseRenderBody = () => {
  const params = useParams();
  const [course, setCourse] = useState({});
  console.log('params?.id '+params.id)

  useEffect(() => {
    getCourseData();
  }, []);
  const getCourseData = async () => {
    const courseData = await fetch(
      PUBLIC_GET_COURSE+params.id
    );
    const dataJson = await courseData.json();
    setCourse(dataJson.data);
  };
  return (
    <>
      <AppHeader />
      <div id="viewContainer" className="pt-[5rem]">
        <div className="flex flex-row">
          <div class="relative md:flex h-screen overflow-hidden">
            <div className="fixed rounded-3xl shadow-lg  w-[20rem] h-screen overflow-y-auto">
              {Object.keys(course).length > 0 && (
                <CourseSectionCardion key={course.id} course={course} isCoursePurchased={true} />
              )}
            </div>
          </div>
          <div className="px-80 m-2 fixed">
           <h2>Click on each lesson to watch video</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseRenderBody;
