import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
import { Badge, Button, message } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AppHeader from "../../../common/AppHeader";
import LessonList from "../../../components/instructor/create/LessonList";
import { API_COURSE_GET_URL, API_COURSE_PAID_SUBSCRIBE, API_COURSE_SUBSCRIBE, STRIPE_PUBLIC_KEY } from "../../../constants/URLConstants";
import { authActions } from "../../../store/auth-slice";
import { getRequest, postRequest } from "../../../util/APIUtils";
import { currencyFormatter } from "../../../util/Helper";
import {loadStripe} from '@stripe/stripe-js';



const SingleCourse = () => {

    const [showModal,setShowModal]=useState(false);
    const [preview,setPreview]=useState("");
    const location = useLocation();
    const user = useSelector(state => state.auth);
    const[adminUser, setAdminUser]=useState(false);

    const [loading,setLoading]=useState(false);


    const handlePaidEnrollment= async (course_id)=>{
        console.log('Paid course');
        setLoading(true);
         const session= await postRequest(API_COURSE_PAID_SUBSCRIBE,{courseId:course_id})
         const stripe=await loadStripe(STRIPE_PUBLIC_KEY);
         stripe.redirectToCheckout({sessionId:session.data});

    }

    const [recState,setRecState]=useState(false);

    const [subData,setSubData]=useState({});

    const history=useHistory();

    //need to work again, this has to come backend 
    const [temp,setTemp]=useState(false);

    useEffect(()=>{
        setLoading(true);
        if(Object.keys(courseData).length>0){
        getRequest(API_COURSE_SUBSCRIBE+"/"+courseData.id).then((res)=>{
            setSubData(res.data);
            setLoading(false);
            setTemp(true);

        }).catch((err)=>{
            setLoading(false);

        })
    }

    },[courseData,recState])

    const handleFreeEnrollment=(courseId)=>{
        console.log('Free course');
        const data={courseId:courseId,type:'FREE'};
        console.log('da--'+data)

        postRequest(API_COURSE_SUBSCRIBE,data).then((res)=>{
            message.success(res.message);
            setRecState(!recState);
        }).catch((err)=>{
            console.log('COURSE_SUBSCRIBE: error while subscribing,'+err)
        })
    }


    const dispatch = useDispatch();
    const [courseData, setCourseData] = useState({});

    const rediretCoursePage=(courseId)=>{
        history.push('/user/user-course/'+courseId)
    }

    useEffect(() => {
        setLoading(true);
        getRequest(API_COURSE_GET_URL + '/' + location.state.id)
            .then((res) => {
                setCourseData(res.data);
                setRecState(!recState);
                setLoading(false);


            }).catch((err) => {
                console.log('SINGLE_COURSE_VIEW: error while getting course details ' + err)
                setLoading(false);

            })

    }, [location.state.id])
    console.log(courseData)
    return (
        <Fragment>
            {user.authenticated && <AppHeader authenticated={user.authenticated} onLogout={() => { dispatch(authActions.handleLogout()) }} />}

          {(Object.keys(courseData).length>0)&& <div className="container-fluid">
            <div className="row">
            <div className="jumbotron bg-primary square">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="text-light font-weight-bold">{courseData.name}</h1>
                        <p className="lead">{courseData.description && courseData.description.substring(0, 160)}...</p>
                        <Badge count={courseData.category} style={{ backgroundColor: '#03a9f4' }}
                            className="pb-4 mr-2" />
                   
                    <p>Created by Raju</p>

                    <h4 className="text-light">
                        {courseData.paid
                            ? currencyFormatter({
                                amount: courseData.price,
                                currency: "inr",
                            })
                            : "Free"}
                    </h4>
                    </div>
                    <div className="col-md-4" style={{float:'right'}}>
                        {courseData.courseLeasons && courseData.courseLeasons[0]&& courseData.courseLeasons[0].courseVideo ?
                         <div >
                            { <ReactPlayer className="react-player-div" 
                             url={courseData.courseLeasons[0].courseVideo.awsUrl}
                           //  light={courseData.courseImage.url}
                             width="100%"
                             height="225px"
                             controls
                            />  }
                        </div>: (
                             <img src={courseData.courseImage.url} alt={courseData.name}  className="img img-fluid"/>
                        )
                        }

          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              type="primary" danger
              block
              shape="round"
              icon={<SafetyOutlined />}
              size={20}
              disabled={loading}
              onClick={!temp?courseData.paid ? ()=> handlePaidEnrollment(courseData.id) : ()=>handleFreeEnrollment(courseData.id):()=>{rediretCoursePage(courseData.id)}}
            >
              {user ?  Object.keys(subData).length>0? "Go to course": "Enroll" : "Login to enroll"}
            </Button>
          )}
                    </div>
               
                    </div>
                </div>
            </div>
            </div>
}
<div className="row pb-5">
                            <LessonList course={courseData} onDeleteLesson={()=>{Promise.reject("You doesn't have rights")}} isAdminUser={adminUser}/>
                        </div>

        </Fragment>
    )
}

export default SingleCourse;