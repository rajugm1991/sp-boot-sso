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
    
      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      const handleImage = () => {
        //
      };
    
      const handleSubmit = (e) => {
        setValues({...values,loading:true})
        e.preventDefault();
        console.log(values);
      };


    return(
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Create Course</h1>
        <div className="pt-3 pb-3">
        <CourseCreateForm 
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
        </InstructorRoute>
    )
}

export default CreateCourse;