import { PlayCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Link from "antd/es/typography/Link";
import React, { Fragment, useEffect, useState } from "react";
import { API_USER_COURSE_LIST } from "../../../constants/URLConstants";
import { getRequest } from "../../../util/APIUtils";


const CourseSubscribedList=()=>{


    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCourses();
      }, []);
    
      const loadCourses = async () => {
        try {
          setLoading(true);
          const  res = await getRequest(API_USER_COURSE_LIST);
          setCourses(res.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };

    return(
        <Fragment>

{loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}

      {/* show list of courses */}

      { courses && Object.keys(courses).length>0 &&
        courses.map((course) => (
          <div key={course.courseEntity.id} className="media pt-2 pb-1">
            <Avatar
              size={80}
              shape="square"
              src={course.courseEntity.courseImage ? course.courseEntity.courseImage.url : "/course.png"}
            />

            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <Link
                    href={`/user/user-course/${course.courseEntity.id}`}
                    className="pointer"
                  >
                    <a>
                      <h5 className="mt-2 text-primary">{course.courseEntity.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {course.courseEntity.courseLeasons && course.courseEntity.courseLeasons.length} lessons
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}
                  >
                    By Raju
                  </p>
                </div>
                <div className="col-md-1 mt-1 text-center">
                  <Link href={`/user/user-course/${course.courseEntity.id}`}>
                    <a>
                      <PlayCircleOutlined className="h2 pointer text-primary" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        </Fragment>
    )
}

export default CourseSubscribedList;