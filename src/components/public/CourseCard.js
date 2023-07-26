import { Badge } from "antd";
import React from "react";

const CourseCard = ({course}) => {

    const {name,courseImage,paid,price,category}=course;
    const {url}=courseImage;

  return (
    <div className="m-4 h-80 w-64 rounded-lg shadow-lg hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:cursor-pointer">
     <div className="rounded-full px-2 ">
      <img
        className="h-40 border-black"
        alt="videoCard"
        src={url}
      />
      </div>
      <div className="p-1 m-2">
        <h3 className="text-sm break-normal ">{name}</h3>
      </div>
      <div className="m-2 flex flex-col space-y-2">
        <span>{course.courseLeasons.length} Lessons</span>
        <span className="text-sm font-bold">{paid===true? <p>&#8377; {price}</p> : 'FREE'}</span>
        <Badge
              count={category}
              className="m-1 w-24   text-xs"
            />
      </div>
      
    </div>
  );
};

export default CourseCard;
