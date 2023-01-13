
import { CheckCircleFilled, MinusCircleFilled, PlayCircleOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, message } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AppHeader from "../../../common/AppHeader";
import { API_USER_COURSE_COMPLETE_LESSON, API_USER_COURSE_VIEW } from "../../../constants/URLConstants";
import { authActions } from "../../../store/auth-slice";
import { getRequest, postRequest } from "../../../util/APIUtils";

const { Item } = Menu;

const UserCourseView = () => {

    const param = useParams();

    const user = useSelector(state => state.auth);

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [validUser, setValidUser] = useState(false);

    const [course, setCourse] = useState({});
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        getCourses();
    }, [param.id])


    const markCompleted = async () => {
       const data={ courseId: course.id,
        lessonId: course.courseLeasons[clicked].id
       }
       const resData=await postRequest(API_USER_COURSE_COMPLETE_LESSON,data);
        console.log(data);
        setCompletedLessons(resData.data.lessonIds);
      };

       const markIncompleted=async()=>{
        const data={ courseId: course.id,
            lessonId: course.courseLeasons[clicked].id,
            remove:-1
           }
           const resData=await postRequest(API_USER_COURSE_COMPLETE_LESSON,data);
            console.log(data);
            setCompletedLessons(resData.data.lessonIds);
       }
       
       useEffect(() => {
        if (course) loadCompletedLessons();
      }, [course]);
    

  
      const loadCompletedLessons = async () => {

        if(validUser){
        const data={ courseId: param.id
           }
           const resData=await postRequest(API_USER_COURSE_COMPLETE_LESSON,data);
           if(resData.data){
        setCompletedLessons(resData.data.lessonIds);
           }
        }
      };

   
    const getCourses = () => {
        setLoading(true);
        getRequest(API_USER_COURSE_VIEW + "/" + param.id).then((res) => {
            setCourse(res.data);
            setLoading(false);
            setValidUser(true);
        }).catch((err) => {
            console.log('COURSE_VEIW ' + err)
            setLoading(false);
            message.error('You have not enrolled the course. Kindly enroll the coures to access the course!!')
            history.push('/');
        })


    }
    const [clicked, setClicked] = useState(-1);
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    console.log("view page id " + param.id)


    return (
        <Fragment>
            {user.authenticated && <AppHeader authenticated={user.authenticated} onLogout={() => { dispatch(authActions.handleLogout()) }} />}

            {course && Object.keys(course).length > 0 &&

<Layout>
    <Sider     style={{
         
         width:'100%'
        }}>
   
                
                    <div style={{ maxWidth: 320 }}>
                        <Menu
                            defaultSelectedKeys={[clicked]}
                            inlineCollapsed={collapsed}
                            style={{ height: "120vh", overflow: "scroll" }}
                        >
                            {course.courseLeasons.map((lesson, index) => (
                                <Item
                                    onClick={() => setClicked(index)}
                                    key={index}
                                    icon={<Avatar>{index + 1}</Avatar>}
                                >
                                    {lesson.title.substring(0, 30)} {" "}
                                    {completedLessons.includes(lesson.id) ? (
                  <CheckCircleFilled
                    className="float-right text-success ml-2"
                    style={{ marginTop: "13px" }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="float-right text-danger ml-2"
                    style={{ marginTop: "13px" }}
                  />
                )}
                                </Item>
                            ))}
                        </Menu>
                    </div>
                    
    </Sider>
    <Content  style={{
                margin: '0 20px'
              }}>
    <div className="col">
          {clicked !== -1 ? (
            
            <Fragment>
                   <div className="col alert alert-primary square">
                <b>{course.courseLeasons[clicked].title.substring(0, 30)}</b>
                {completedLessons.includes(course.courseLeasons[clicked].id) ? (
                  <span
                    className="float-right pointer" style={{float:'right'}}
                    onClick={markIncompleted}
                  >
                    Mark as incomplete
                  </span>
                ) : (
                  <span className="float-right pointer" style={{float:'right'}} onClick={markCompleted}>
                    Mark as completed
                  </span>
                )}
              </div>
              {course.courseLeasons[clicked].courseVideo &&
                course.courseLeasons[clicked].courseVideo.awsUrl && (
                  <Fragment>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        url={course.courseLeasons[clicked].courseVideo.awsUrl }
                        width="90%"
                        height="60%"
                        controls
                      />
                    </div>
                  </Fragment>
                )}

              <p>
              {course.courseLeasons[clicked].content}
                </p>
            </Fragment>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <p className="lead">Clcik on the lessons to start learning</p>
              </div>
            </div>
          )}
        </div>
                    </Content>
              
                </Layout>
                }

        </Fragment>
    )

}

export default UserCourseView;