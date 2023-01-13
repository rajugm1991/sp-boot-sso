import { CheckOutlined, CloseOutlined, EditOutlined, PlusOutlined, QuestionOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Avatar, Form, message, Modal, Space, Tooltip } from "antd";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ACCESS_TOKEN, API_BASE_URL } from "../../../constants";
import { API_COURSES_STUDENT_COUNT_GET_URL, API_COURSE_LESSON_UPDATE_PUBLISH_STATUS } from "../../../constants/URLConstants";
import { deleteRequest, genericMethodRequest, getRequest, postRequest } from "../../../util/APIUtils";
import AddLessonForm from "./AddLessonForm";
import LessonList from "./LessonList";



const CourseView = () => {

    const location = useLocation();

    const history = useHistory();
    const [course, setCourseData] = useState({});

    const [videoList, setVideoList] = useState({ FileList: [] })
    const [progress, setProgress] = useState(0);
    const [students, setStudents] = useState(0);


    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState({
        title: "",
        content: "",
        videoFreePreview: false,
        video: "",
        courseId: location.state.id
    });

    useEffect(() => {
        course && studentCount();
    }, [course]);


    const studentCount = async () => {
        try {
            const resData = await getRequest(API_COURSES_STUDENT_COUNT_GET_URL+'/'+location.state.id);
            console.log("STUDENT COUNT => ", resData.data);
            setStudents(resData.data);
        } catch (err) {
             
        }
    };

    const [recordUpdate, setRecordUpdate] = useState(false);


    useEffect(() => {
        getRequest("/user/admin/api/course/" + location.state.id).then((res) => {
            console.log(res)
            setCourseData(res.data)
        }).catch((error) => {
            message.error(error.message);
            history.goBack();
        })
    }, [location.state.id, recordUpdate])

    const [form] = Form.useForm();

    const [adminUser, setAdminUser] = useState(true);

    const resetState = () => {
        setValues({
            title: "",
            content: "",
            video: "",
            videoFreePreview: false,
            courseId: location.state.id
        });

        setVideoList({
            fileList: []
        })

        form.resetFields();
        setRecordUpdate(!recordUpdate);
    }
    // FUNCTIONS FOR ADD LESSON
    const handleAddLesson = async () => {
        console.log('lessons' + values);
        //submit starts here
        let formData = new FormData();
        if (videoList.fileList.length > 0) {
            formData.append("file", videoList.fileList[0].originFileObj);
        }
        formData.append("courseLesson", new Blob([JSON.stringify(values)], {
            type: "application/json"
        }));

        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }
        await axios({
            method: 'post',
            url: API_BASE_URL + '/user/admin/api/course/courseLesson',
            data: formData,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            },
            onUploadProgress: (e) => {
                console.log(`${e.loaded} kb of ${e.total} KB | ${Math.round((100 * e.loaded) / e.total)}`)
                setProgress(Math.round((100 * e.loaded) / e.total));
            }
        }).then((res) => {
            message.success('Course Lesson added successfully')
            setValues({ ...values, loading: false })
            setVisible(false)
            setProgress(0);
            resetState();
        }).catch((err) => {
            message.error('Something went wrong! Please try again.')
            setVisible(true)
            setValues({ ...values, loading: false })
            setProgress(0);


        });


        //  axiosPostFormDataRequest('/user/admin/api/course/courseLesson',formData).then((res)=>{
        //      message.success('Course Lesson added successfully')
        //      setValues({...values,loading:false})
        //      setVisible(false)
        //      resetState();
        //  }).catch((err)=>{
        //      message.error('Something went wrong! Please try again.')
        //      setVisible(true)
        //      setValues({...values,loading:false})

        //  });
    };

    const onDeleteLesson = (id) => {
        console.log("handle  delete lesson " + id);
        deleteRequest("/user/admin/api/course/courseLesson/" + id).then((res) => {
            message.success(res.message)
            setRecordUpdate(!recordUpdate);
        }).catch((err) => {
            message.error(" Error occured while deleting course!!")
        })
    };

    const updateCourseStatus = (id, status) => {
        genericMethodRequest(API_COURSE_LESSON_UPDATE_PUBLISH_STATUS, { id: id, status: status }, 'PUT')
            .then((res) => {
                message.success(res.message);
                setRecordUpdate(!recordUpdate);
            }).catch((err) => {
                message.error("Error occured while publishing/unpublishing course!!")
            })
    }

    return (
        <Fragment>
            <div className="contianer-fluid pt-3">
                {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
                {course && (
                    <div className="container-fluid pt-1">
                        <div className="media pt-2">
                            <Avatar
                                size={80}
                                src={course.courseImage ? course.courseImage.url : "/course.png"}
                            />

                            <div className="media-body pl-2">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="mt-2 text-primary">{course.name}</h5>
                                        <p style={{ marginTop: "-10px" }}>
                                            {course.courseLeasons && course.courseLeasons.length} Lessons
                                        </p>
                                        <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                                            {course.category}
                                        </p>
                                    </div>

                                    <div className="d-flex pt-4">
                                        <Space>
                                            <Tooltip title="Add lesson">
                                                <PlusOutlined onClick={() => setVisible(true)} className="h3 pointer text-success mr-4" />
                                            </Tooltip>
                                            <Tooltip title="Edit Course">
                                                <EditOutlined onClick={() => {
                                                    history.push({
                                                        pathname: 'edit',
                                                        state: { id: location.state.id, type: 'EditCourse' }
                                                    })
                                                }} className="h5 pointer text-warning mr-4" />
                                            </Tooltip>
                                            <Tooltip title={`${students} Enrolled`}>
                                                <UserSwitchOutlined className="h5 pointer text-info mr-4" />
                                            </Tooltip>

                                            {course.courseLeasons && course.courseLeasons.length < 3 ? (<Tooltip title="Minimum
                                            3 lessons required to publish">
                                                <QuestionOutlined className="h5 pointer text-danger" />
                                            </Tooltip>)
                                                :
                                                course.published ?
                                                    <Tooltip title="Unpublish">
                                                        <CloseOutlined className="h5 pointer text-danger" onClick={() => { updateCourseStatus(course.id, 'Unpublish') }} />
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title="Publish">
                                                        <CheckOutlined className="h5 pointer text-success" onClick={() => { updateCourseStatus(course.id, 'Publish') }} />
                                                    </Tooltip>
                                            }

                                        </Space>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col">
                                {course.description}
                            </div>
                        </div>

                        <br />

                        <Modal
                            title="+ Add Lesson"
                            centered
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <AddLessonForm
                                values={values}
                                setValues={setValues}
                                handleAddLesson={handleAddLesson}
                                handleCancel={() => setVisible(false)}
                                setVideoList={setVideoList}
                                form={form}
                                videoList={videoList}
                                progress={progress}
                            />
                        </Modal>
                        <div className="row pb-5">
                            <LessonList course={course} onDeleteLesson={onDeleteLesson} isAdminUser={adminUser} />
                        </div>
                    </div>

                )}
            </div>

        </Fragment>
    )
}



export default CourseView;