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
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const CourseCreateForm = ({ handleSubmit,
    handleImage,
    handleChange,
    values,
    setValues}) => {

  


  return (
    <React.Fragment>
   <Form  labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal">
        <Form.Item label="Name">
          <Input name='name' placeholder='Name' label="Name" value={values.name} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Category">
          <Input name='category' placeholder='Category' value={values.category} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Description">
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
          <Upload action="/upload.do" listType="picture-card" beforeUpload={()=>false}>
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