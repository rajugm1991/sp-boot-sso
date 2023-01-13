import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Progress, Space, Switch, Upload } from "antd";
import React from "react";

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

<Form
 form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        </Space>
      </Form.Item>
      <br/>
      {progress>0 && <Progress className="d-flex justify-content-center pt-2" percent={progress} steps={10}/> }
    </Form>



    
  );
};

export default AddLessonForm;