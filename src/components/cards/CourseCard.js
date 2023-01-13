import React from "react";
import { Card, Badge } from "antd";
import { currencyFormatter } from "../../util/Helper";
import { Link } from "react-router-dom";


const CourseCard = ({ course ,onClickCourse}) => {
  // destructure
  const { name, price, courseImage, paid, category } = course;
  return (
    <Link href="#" >
      <a>
        <Card
          className="mb-4"
          onClick={()=>onClickCourse(course.id)}
          cover={
            <img
              src={courseImage.url}
              alt={name}
              style={{ height: "300px", objectFit: "cover" }}
              className="p-1"
            />
          }
        >
          <h2 className="h4 font-weight-bold">{name}</h2>
          <p>by {'Raju'}</p>

            <Badge
              count={category}
              style={{ backgroundColor: "#03a9f4" }}
              className="pb-2 mr-2"
            />
        
          <h4 className="pt-2">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "inr",
                })
              : "Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;

