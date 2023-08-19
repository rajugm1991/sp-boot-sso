import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import CourseCard from '../components/cards/CourseCard';
import { API_COURSE_LIST_URL } from '../constants/URLConstants';
import { authActions } from '../store/auth-slice';
import { getRequest } from '../util/APIUtils';
import './Home.css';
import Dashboard from '../components/public/Dashboard';
import CourseList from '../components/public/CourseList';
import Footer from '../components/public/header/Footer';

const Home = () => {
    const [courses, setCourses] = useState([]);

    const user=useSelector(state=>state.auth);

    const history=useHistory();

    const dispatch=useDispatch();   


    useEffect(() => {

        if(user?.currentUser?.adminUser===true){
            history.push('/user/dashboard');
        }
        else if(user?.currentUser?.roles?.map(x=>x.name).includes('ROLE_INSTRUCTOR')){
            history.push('/user/instructor');
        }
        getRequest(API_COURSE_LIST_URL).then((res) => {
            setCourses(res.filter(course => course.published));
        }).catch((err) => {
            console.log(err);
        })
    }, [user])

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
            <div className='pt-[4rem]'>
            <Dashboard/>
           <CourseList/>

                    <div className="row pt-4">
                        {courses.map((course) => (
                            <div key={course.id} className="col-md-4">
                                <CourseCard key={course.id} course={course} onClickCourse={onClickCourse} />
                                {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
                            </div>
                        ))}
                    </div>
            </div>
            <Footer/>

           
        </Fragment>
    )
}



export default Home;