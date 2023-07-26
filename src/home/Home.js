import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import CourseCard from '../components/cards/CourseCard';
import { API_COURSE_LIST_URL } from '../constants/URLConstants';
import { authActions } from '../store/auth-slice';
import { getRequest } from '../util/APIUtils';
import './Home.css';

const Home = () => {
    const [courses, setCourses] = useState([]);

    const user=useSelector(state=>state.auth);

    const history=useHistory();

    const dispatch=useDispatch();

    useEffect(() => {
        getRequest(API_COURSE_LIST_URL).then((res) => {
            setCourses(res.filter(course => course.published));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const onClickCourse=(id)=>{
        history.push({
            pathname:'/user/courseView',
            state:{
                id:id,
                type:'COURSE_VIEW',
            }
        })
    }

    return (
        <Fragment>
                     {!user.authenticated && <AppHeader authenticated={user.authenticated} onLogout={()=>dispatch(authActions.handleLogout())} /> }
     {user.authenticated && <AppHeader authenticated={user.authenticated} onLogout={()=>{setCourses([]);dispatch(authActions.handleLogout())}} /> }
            <div className="home-container">
                <div className="container">
                    <h1 className='font-extralight text-xs text-red-700'>FS</h1>
                    <h1 className='text-blue-600'>Online Education Market Place.</h1>

                    {/* <div className="graf-bg-container">
                        <div className="graf-layout">
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                        </div>
                    </div>
                    <h1 className="home-title">Spring Boot React OAuth2 Social Login Demo</h1> */}
                    <div className="row pt-4">
                        {courses.map((course) => (
                            <div key={course.id} className="col-md-4">
                                <CourseCard key={course.id} course={course} onClickCourse={onClickCourse} />
                                {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </Fragment>
    )
}



export default Home;