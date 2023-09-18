import { CloseOutlined, PlusOutlined, RestOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Form,
  Input, InputNumber, Modal, Select, Space, Upload
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';



const CourseCreateForm = ({ handleSubmit,
    handleChange,
    values,
    setValues,setImageField,location}) => {

      const [form] = Form.useForm();

      const[edit,setEdit]=useState(false);


      // eslint-disable-next-line
      const validateMessages = {
        // eslint-disable-next-line
        required: '${label} is required!',
        types: {
          // eslint-disable-next-line
          email: '${label} is not a valid email!',
          // eslint-disable-next-line
          number: '${label} is not a valid number!',
        },
        number: {
          // eslint-disable-next-line
          range: '${label} must be between ${min} and ${max}',
        },
      };

      useEffect(()=>{
        if(location&&location.state&&location.state.type==='EditCourse'){
          console.log('setting field values.....')
          setEdit(true);
          form.setFieldsValue({
            ...values
          })
        }
      },[values])
  
      const tailLayout = {
        wrapperCol: {
          offset: 4,
          span: 30,
        },
      };

      const [image, setImage]=useState({
        previewVisible: false,
        previewImage: "",

      })

      const[fileList,setFileList]=useState([]);


      const { previewVisible, previewImage } = image;

  

     const handlePreview = file => {
        setImage(...image,{
          previewImage: file.thumbUrl,
          previewVisible: true
        })
      };

    
    
      const handleUpload = ({ fileList }) => {
        const uploadList=fileList;
        //---------------^^^^^----------------
        // this is equivalent to your "const img = event.target.files[0]"
        // here, antd is giving you an array of files, just like event.target.files
        // but the structure is a bit different that the original file
        // the original file is located at the `originFileObj` key of each of this files
        // so `event.target.files[0]` is actually fileList[0].originFileObj
        console.log('fileList', uploadList);
        // you store them in state, so that you can make a http req with them later
        setFileList(uploadList)
       // setValues(...values,{fileList:fileList})
       setImageField({fileList:uploadList});
      }
   

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
        <Form.Item label="Name" name="name" rules={[
          {
            required: true,
          },
        ]} value={values.name} onChange={handleChange}  >
          <Input name='name' placeholder='Name' label="Name" value={values.name}/>
        </Form.Item>
        <Form.Item label="Category" name='category' rules={[{ required: true }]} value={values.category} onChange={handleChange}>
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

       {values.paid&& <Form.Item name='price' label="Price" value={values.price} 
         rules={[
          {
            type: 'number',
            min: 500,
            max: 2500,
          },
        ]}>
          <InputNumber  name="price" onChange={(v)=>setValues({...values,price:v})} />
        </Form.Item>}
     
       { !edit && <Form.Item label= {values.loading ? "Uploading" : "Image Upload"} valuePropName="fileList">
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
          open={previewVisible}
          footer={null}
          onCancel={()=>setImage(...image,{previewImage:false})}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        </Form.Item>}

        {edit && 
        <Form.Item label="Image Preview">
         <Avatar size={64} icon={<UserOutlined />} src={values.courseImage.url} />
        </Form.Item>
        }
        <Form.Item {...tailLayout}>
        <Space>

          <Button
           loading={values.loading} className='bg-purple-300' size="middle" type="primary" htmlType='submit' icon={<SaveOutlined />}>       
             {!edit ?values.loading ? "Saving..." : "Save" :(values.loading ? "Updating..." : "Update" )}
          </Button>
          <Button htmlType="button" disabled={edit} onClick={onReset} icon={<RestOutlined />} size="middle">
          Reset
        </Button>
        <Button htmlType="button" className='' onClick={onCancel} icon={<CloseOutlined />} size="middle">
          Cancel
        </Button>
        </Space>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
export default CourseCreateForm;