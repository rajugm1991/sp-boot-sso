import React from "react";

const CourseLessonCardionView = ({ courseLessonsList, index, showCardion }) => {
  return (
    <div
      id="flush-collapseOne"
      class={
        showCardion === index ? "!visible border-0" : "!visible hidden border-0"
      }
      data-te-collapse-item
      data-te-collapse-show
      aria-labelledby="flush-headingOne"
      data-te-parent="#accordionFlushExample"
    >   
      <div class="px-1  ">
       {courseLessonsList.map((lesson)=>
        <div className="grid grid-cols-1">
          <span className="m-1 py-2 px-5  hover:bg-gray-100 cursor-pointer">
            <div className="flex flex-row space-x-8" >
              <div>📹</div>
              <div className="flex flex-col">
                <span className="text-base">{lesson.title}</span>
                <span className="text-xs">video * 7m 35s</span>
              </div>
            </div>
          </span>
          <div className="w-full h-[0.08px] bg-black"></div>
        </div>
       )}
        

      </div>

    </div>
  );
};

export default CourseLessonCardionView;
