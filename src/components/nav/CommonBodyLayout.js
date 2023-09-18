

import React from 'react'
import CreateCourse from '../instructor/create/CreateCourse'
import CourseLessonForm from '../course_lesson/CourseLessonAdd'
import InstructorIndex from '../instructor/create'
import PrivateRoute from '../../common/PrivateRoute'
import { useSelector } from 'react-redux'
import CourseList from '../instructor/create/CourseList'
import CourseView from '../instructor/create/CourseView'

const CommonBodyLayout = () => {

  const user = useSelector((state) => state.auth);

  return (

    <>
     <PrivateRoute
                exact
                path="/user/instructor/course/edit"
                authenticated={user.authenticated}
                component={CreateCourse}
              />
              <PrivateRoute
                exact
                path="/user/instructor/course/view"
                authenticated={user.authenticated}
                component={CourseView}
              />
              <PrivateRoute
                exact
                path="/user/instructor/course/create"
                authenticated={user.authenticated}
                component={CreateCourse}
              />
              <PrivateRoute
                exact
                path="/user/instructor/lesson/:id"
                authenticated={user.authenticated}
                component={CourseLessonForm}
              />
              <PrivateRoute
                exact
                path="/user/instructor/course"
                authenticated={user.authenticated}
                component={CourseList}
              />
              <PrivateRoute
                path="/user/instructor/dashboard"
                authenticated={user.authenticated}
                component={InstructorIndex}
              />
    </>

    )
}

export default CommonBodyLayout