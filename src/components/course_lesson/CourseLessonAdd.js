import { Form, message } from "antd";
import axios from "axios";
import React, { Fragment, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { ACCESS_TOKEN, API_BASE_URL } from "../../constants";
import AddLessonForm from "../instructor/create/AddLessonForm";


const CourseLessonForm=()=>{
    const param = useParams();
    const [recordUpdate, setRecordUpdate] = useState(false);

    const history=useHistory();

    const[visible,setVisible]=useState(false);
    const [values, setValues] = useState({
        title: "",
        content: "",
        videoFreePreview: false,
        video: "",
        sectionId:"",
        courseId: param.id
    });

    const [form] = Form.useForm();
    const [videoList, setVideoList] = useState({ FileList: [] })
    const [progress, setProgress] = useState(0);

    const resetState = () => {
        setValues({
            title: "",
            content: "",
            sectionId:"",
            video: "",
            videoFreePreview: false,
            courseId: param.id
        });

        setVideoList({
            fileList: []
        })

        form.resetFields();
        setRecordUpdate(!recordUpdate);
    }

    const handleCancle=()=>{
        history.push( {
            pathname: '/user/instructor/course/view',
            state: {id:param.id,type:'update',data:''}
        } )

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
            setProgress(0);
            resetState();
        }).catch((err) => {
            message.error('Something went wrong! Please try again.')
            setValues({ ...values, loading: false })
            setProgress(0);


        });
    };

    return(
        <React.Fragment>
            <h6>Create Lesson</h6>
            <AddLessonForm
                                values={values}
                                setValues={setValues}
                                handleAddLesson={handleAddLesson}
                                handleCancel={() => handleCancle()}
                                setVideoList={setVideoList}
                                form={form}
                                videoList={videoList}
                                progress={progress}
                            />
        </React.Fragment>
    )
}

export default CourseLessonForm;