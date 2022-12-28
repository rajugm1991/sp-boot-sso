import React, { useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined, PoweroffOutlined, RestOutlined, SaveOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  Modal,
  Space,
} from 'antd';
import { useHistory } from 'react-router-dom';
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const CourseCreateForm = ({ handleSubmit,
    handleChange,
    values,
    setValues,setImageField}) => {

      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };

  
      const tailLayout = {
        wrapperCol: {
          offset: 4,
          span: 30,
        },
      };

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
   
        const [form] = Form.useForm();

      const onReset = () => {
        form.resetFields();
        restState();
        
      };
      

      const restState=()=>{
        setValues({
          name: "",
          category:"",
          desc: "",
          price: "9",
          uploading: false,
          paid: true,
          loading: false,
          imagePreview: "",
        });
        setImage({
          fileList:[]
        })
      }
      const history=useHistory();

      const onCancel=()=>{
        history.goBack()

      }
  return (
    <React.Fragment>
   <Form form={form}  labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal" name="nest-messages" validateMessages={validateMessages} onFinish={handleSubmit}>
        <Form.Item label="Name" name={['user', 'name']} rules={[
          {
            required: true,
          },
        ]} value={values.name} onChange={handleChange}  >
          <Input name='name' placeholder='Name' label="Name" value={values.name}/>
        </Form.Item>
        <Form.Item label="Category" name={['user', 'category']} rules={[{ required: true }]} value={values.category} onChange={handleChange}>
          <Input name='category' placeholder='Category' />
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

       {values.paid&& <Form.Item name={['user','price']} label="Price" value={values.price} 
         rules={[
          {
            type: 'number',
            min: 500,
            max: 2500,
          },
        ]}>
          <InputNumber  name="price" onChange={(v)=>setValues({...values,price:v})} />
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
        <Form.Item {...tailLayout}>
        <Space>

          <Button
           loading={values.loading} size="middle" type="primary" htmlType='submit' icon={<SaveOutlined />}>       
             {values.loading ? "Saving..." : "Save"}
          </Button>
          <Button htmlType="button" onClick={onReset} icon={<RestOutlined />} size="middle">
          Reset
        </Button>
        <Button htmlType="button" onClick={onCancel} icon={<CloseOutlined />} size="middle">
          Cancel
        </Button>
        </Space>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
export default CourseCreateForm;