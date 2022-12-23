import React,{useState} from "react";
import CourseCreateForm from "../../../forms/CourseCreateForm";
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
      });
    
    const [imageField,setImageField]=useState({
        fileList:[]
    })

      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
    
      const handleSubmit = (e) => {
        setValues({...values,loading:true})
        e.preventDefault();
        console.log(values);
      };

      

    return(
        <InstructorRoute>

        <CourseCreateForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        setImageField={setImageField}
        />
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(imageField, null, 4)}</pre>

        </InstructorRoute>
    )
}

export default CreateCourse;