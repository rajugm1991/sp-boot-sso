import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Progress, Select, Space, Switch, Upload } from "antd";
import { Option } from "antd/es/mentions";
import React, { Fragment, useEffect, useState } from "react";
import { API_ADMIN_COURSE_ADD_SECTION } from "../../../constants/URLConstants";
import { getRequest, postRequest } from "../../../util/APIUtils";
import AddSectionForm from "../../forms/AddSectionForm";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  handleCancel,
  setVideoList,
  form,
  videoList,
  progress
}) => {

  const[sectionData,setSectionData]=useState([]);

  const[visible,setVisible]=useState(false);


  const [formSec] = Form.useForm();
  const [sectionUpdateFlag,setSectionUpdateFlag]=useState(false);

  useEffect(()=>{
    getRequest(API_ADMIN_COURSE_ADD_SECTION+'/' + values.courseId).then((res) => {
      console.log(res)
      setSectionData(res.data.courseSectionEntities)
  }).catch((error) => {
      message.error('course_section_read '+error.message);
     // history.goBack();
  })
  },[sectionUpdateFlag]);


  const [secvalues, setSecValues] = useState({
    name: "",
    courseId: values.courseId,
    loading:false
});


  const handleAddSection=()=>{
    postRequest(API_ADMIN_COURSE_ADD_SECTION,secvalues).then((res)=>{
      message.success(res.message);
      setSecValues({ ...secvalues, loading: false })
      setSectionUpdateFlag(!sectionUpdateFlag);
      setVisible(false)
  }).catch((err)=>{
      message.error(err.message);
      console.log("COURSE_SECTION: error."+err)
      setVisible(true)
      setSecValues({ ...secvalues, loading: false })
  })
  }



    const onFinish = (val) => {
        setValues({...values,loading:true})
        handleAddLesson();

      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const handleUpload = ({ fileList }) => {
        setVideoList({fileList:fileList});
      }
  return (
<Fragment>
<Form
 form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 14,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

<Form.Item
        name="sectionId"
        label="Section"
        rules={[
          {
            required: true,
            message: 'Please select Section!',
          },
        ]}
        defaultValue="-1"
       
      >
        <Select placeholder="select your Section"  onChange={(e) => setValues({ ...values, sectionId: e })}>
        {sectionData.map((option) => (
                  <Option key={option.id} value={option.id}>{option.name}</Option>
                ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter title!',
          },
        ]}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        values={values.title}
      >
        <Input value={values.title} />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please enter content!',
          },
        ]}
        onChange={(e) => setValues({ ...values, content: e.target.value })}
        values={values.content}
      >
        <Input.TextArea  />
      </Form.Item>

      <Form.Item
        label="Is Video Preview for free"
        name="videoFreePreview"
      >
        <Switch defaultChecked={false}  onChange={(checked)=>setValues({ ...values, videoFreePreview: checked })}/>
      </Form.Item>

      <Form.Item label= "Video upload" valuePropName="fileList">
          <Upload    
          listType= 'picture'   
          fileList={videoList.fileList}
          onChange={handleUpload}
          beforeUpload={() => false} >
               <Button icon={<UploadOutlined />}>Upload</Button>

          </Upload>

          </Form.Item>
      


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space>

        <Button
        htmlType="submit"
          type="primary"
          icon={<PlusOutlined />}
          loading={values.loading}
        >
     {values.loading ?'Saving..' :'Submit'}
 
 </Button>

        {/* <Button type="primary" htmlType="submit">
         {values.loading ?<SyncOutlined spin /> :'Submit'} 
        </Button> */}
        <Button   onClick={handleCancel}>
          Cancel
        </Button>

        <Button   onClick={() => setVisible(true)}>
       Add Section
          </Button> 

        </Space>
      </Form.Item>
      <br/>
      {progress>0 && <Progress className="d-flex justify-content-center pt-2" percent={progress} steps={10}/> }
    </Form>


    <Modal
                            title="+ Add Section"
                            centered
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                            width={700}
                        >
                            <AddSectionForm
                                secvalues={secvalues}
                                setSecValues={setSecValues}
                                handleAddSection={handleAddSection}
                                handleSecCancel={() => setVisible(false)}
                                form={formSec}
                            />
                        </Modal>
</Fragment>
    
  );
};

export default AddLessonForm;