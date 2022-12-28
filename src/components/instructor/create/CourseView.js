import { CheckOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, message, Modal, Space, Tooltip,Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getRequest, postFormDataRequest } from "../../../util/APIUtils";
import AddLessonForm from "./AddLessonForm";



const CourseView=()=>{

    const location=useLocation();

    const history=useHistory();
    const [course,setCourseData]=useState({});

    const [videoList,setVideoList]=useState({FileList:[]})

    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState({
      title: "",
      content: "",
      video: "",
      courseId:location.state.id
    });

    const [recordUpdate,setRecordUpdate] =useState(false);

    const [uploading, setUploading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Video");

    useEffect(()=>{
        getRequest("/user/admin/api/course/"+location.state.id).then((res)=>{
            console.log(res)
            setCourseData(res.data)
        }).catch((error)=>{
            message.error(error.message);
            history.goBack();
        })
    },[location.state.id,recordUpdate])

    const [form]=Form.useForm();


    const resetState=()=>{
        setValues( {
            title: "",
            content: "",
            video: "",
            courseId:location.state.id
          });

        setVideoList({
            fileList:[]
        })

        form.resetFields();
        setRecordUpdate(!recordUpdate);
    }
     // FUNCTIONS FOR ADD LESSON
  const handleAddLesson = () => {
    console.log(values);
     //submit starts here
     let formData = new FormData();
     if(videoList.fileList.length>0){
     formData.append("file", videoList.fileList[0].originFileObj);
     }
     formData.append("courseLesson",new Blob([JSON.stringify(values)], {
         type: "application/json"
     }));
     console.log('formadata'+formData);
     postFormDataRequest('/user/admin/api/course/courseLesson',formData).then((res)=>{
         message.success('Course Lesson added successfully')
         setValues({...values,loading:false})
         setVisible(false)
         resetState();
     }).catch((err)=>{
         message.error('Something went wrong! Please try again.')
         setVisible(true)
         setValues({...values,loading:false})

     });
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    setUploadButtonText(file.name);
    console.log("handle video upload");
  };

    return(
       <Fragment>
<div className="contianer-fluid pt-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.courseImage? course.courseImage.url:"/course.png"}
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
                      <PlusOutlined onClick={() => setVisible(true)}   className="h3 pointer text-success mr-4" />
                    </Tooltip>
                    <Tooltip title="Edit">
                      <EditOutlined  className="h5 pointer text-warning mr-4" />
                    </Tooltip>
                    <Tooltip title="Publish">
                      <CheckOutlined className="h5 pointer text-danger" />
                    </Tooltip>
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
                handleCancel={()=>setVisible(false)}
                setVideoList={setVideoList}
                form={form}
                videoList={videoList}
              />
            </Modal>
          </div>
          
        )}
      </div>

       </Fragment>
    )
}



export default CourseView;