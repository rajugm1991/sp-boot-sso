import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  Modal,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const CourseCreateForm = ({ handleSubmit,
    handleChange,
    values,
    setValues,setImageField}) => {

      const [image, setImage]=useState({
        previewVisible: false,
        previewImage: "",
        fileList: []
      })

      const { previewVisible, previewImage, fileList } = image;

  

     const handlePreview = file => {
        setImage(...image,{
          previewImage: file.thumbUrl,
          previewVisible: true
        })
      };
    
      const handleUpload = ({ fileList }) => {
        //---------------^^^^^----------------
        // this is equivalent to your "const img = event.target.files[0]"
        // here, antd is giving you an array of files, just like event.target.files
        // but the structure is a bit different that the original file
        // the original file is located at the `originFileObj` key of each of this files
        // so `event.target.files[0]` is actually fileList[0].originFileObj
        console.log('fileList', fileList);
        // you store them in state, so that you can make a http req with them later
        setImage(...image,{fileList:fileList})
       // setValues(...values,{fileList:fileList})
       setImageField({fileList:fileList});
      }



  return (
    <React.Fragment>
   <Form  labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal">
        <Form.Item label="Name" rules={[{ required: true }]} value={values.name} onChange={handleChange} >
          <Input name='name' placeholder='Name' label="Name" />
        </Form.Item>
        <Form.Item label="Category" rules={[{ required: true }]}>
          <Input name='category' placeholder='Category' value={values.category} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} placeholder="Description" name='desc' value={values.desc} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Select">
          <Select value={values.paid}  onChange={(v) => setValues({ ...values, paid: !values.paid })}>
            <Select.Option value={true}>Paid</Select.Option>
            <Select.Option value={false}>Free</Select.Option>
          </Select>
        </Form.Item>

       {values.paid&& <Form.Item label="Price">
          <InputNumber min="0" value={values.price} name="price" onChange={(v)=>setValues({...values,price:v})}/>
        </Form.Item>}
     
        <Form.Item label= {values.loading ? "Uploading" : "Image Upload"} valuePropName="fileList">
          <Upload       
           listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleUpload}
          beforeUpload={() => false} >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={()=>setImage(...image,{previewImage:false})}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        </Form.Item>
        <Form.Item label="">
          <Button onClick={handleSubmit}
          disabled={values.loading || values.uploading} loading={values.loading} type="primary">       
             {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
export default CourseCreateForm;