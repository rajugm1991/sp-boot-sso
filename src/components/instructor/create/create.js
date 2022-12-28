import { message } from "antd";
import React,{useEffect, useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import CourseCreateForm from "../../../forms/CourseCreateForm";
import { postFormDataRequest, postRequest } from "../../../util/APIUtils";
import InstructorRoute from "../../route/InstructorRoute";

const CreateCourse=()=>{

   
    const [values, setValues] = useState({
        name: "",
        category:"",
        desc: "",
        price: "9",
        uploading: false,
        paid: true,
        loading: false,
        imagePreview: "",
        isPublished:"false"
      });

    
    const [imageField,setImageField]=useState({
        fileList:[]
    })

      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      const history=useHistory();
    
      const handleSubmit = () => {
        setValues({...values,loading:true})
        console.log(values);

        //submit starts here
        let formData = new FormData();
        if(imageField.fileList.length>0){
        formData.append("file", imageField.fileList[0].originFileObj);
        }
        formData.append("course",new Blob([JSON.stringify(values)], {
            type: "application/json"
        }));
        console.log('formadata'+formData);
        postFormDataRequest('/user/admin/api/course',formData).then((res)=>{
            message.success('Course added successfully')
            history.push("/user/instructor/course")
        }).catch((err)=>{
            message.error('Something went wrong! Please try again.')
            setValues({...values,loading:false})

        });
      

      };

      

    return(
        <React.Fragment>
        <InstructorRoute>
            <h6>Create Course</h6>
        <CourseCreateForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        setImageField={setImageField}
        />
        </InstructorRoute>
        </React.Fragment>
    )
}

export default CreateCourse;