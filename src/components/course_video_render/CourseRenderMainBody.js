import React, { useEffect, useState } from "react";
import AppHeader from "../../common/AppHeader";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CourseSectionCardion from "../public/cardion/CourseSectionCardion";
import ReactPlayer from "react-player";
import TabDetails from "./TabDetails";
import { getRequest } from "../../util/APIUtils";
import { PUBLIC_GET_COURSE } from "../../constants";

const CourseRenderMainBody = () => {
  const params = useParams();
  const [course, setCourse] = useState({});

  const[lesson,setLesson]=useState({});
  const [tabType,setTabType]=useState('about');
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

  const getLessonData=async (id)=>{
    setLoad(false);
    getRequest('/user/admin/api/course/    '+params.id+'/lesson/'+id).then((res)=>{
        setLesson(res);
    }).catch((err)=>{
        console.log('Course lesson view:'+err)
    })
  }

  const[load,setLoad]=useState(false);

  useEffect(()=>{

    getLessonData(params.lessonId);

  },[params.lessonId])

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
          <div className="px-80 m-2">
            <div id="video">
            <div className="w-full rounded-full">
                          {load? <div
  class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>:<ReactPlayer
                            className="player"
                            url={
                                lesson?.courseVideo?.awsUrl
                            }
                            width="130%"
                            height="10%"
                            controls
                            onError={()=>setLoad(true)}
                          />}
                        </div>

            </div>
            <div id="tabs">
                
<div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
            <span onClick={()=>setTabType('about')}  class={
                tabType==='about'?'inline-block  cursor-pointer p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':'inline-block cursor-pointer p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }>About</span>
        </li>
        <li class="mr-2">
            <span onClick={()=>setTabType('discustion')}  class={
                tabType==='discustion'?'inline-block  cursor-pointer p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':'inline-block cursor-pointer p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }>Discustions</span>
        </li>
        <li class="mr-2">
            <span onClick={()=>setTabType('notes')}  class={
                tabType==='notes'?'inline-block  cursor-pointer p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':'inline-block cursor-pointer p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }>Notes</span>
        </li>
        <li class="mr-2">
            <span onClick={()=>setTabType('resource')}  class={
                tabType==='resource'?'inline-block  cursor-pointer p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':'inline-block cursor-pointer p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }>Resources</span>
        </li>
        {/* <li>
            <a class="inline-block  p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
        </li> */}
    </ul>
</div>
     <TabDetails type={tabType}/>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseRenderMainBody;
