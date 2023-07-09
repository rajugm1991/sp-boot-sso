import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React, { Fragment } from "react"

const AddSectionForm = ({
    secvalues,
    setSecValues,
    handleAddSection,
    handleSecCancel,
    form
  }) => {

    const onFinishSec = (val) => {
        setSecValues({...secvalues,loading:true})
        handleAddSection();

      };
      const onFinishFailedSec = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
    
    <Fragment>

<Form
 form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishSec}
      onFinishFailed={onFinishFailedSec}
      autoComplete="off"
    >
      
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter section name!',
          },
        ]}
        onChange={(e) => setSecValues({ ...secvalues, name: e.target.value })}
        values={secvalues.title}
      >
        <Input value={secvalues.name} />
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
          loading={secvalues.loading}
        >
     {secvalues.loading ?'Saving..' :'Submit'}
 
 </Button>
        <Button   onClick={handleSecCancel}>
          Cancel
        </Button>
        </Space>
      </Form.Item>
      <br/>
    </Form>


    </Fragment>)
  }


  export default AddSectionForm;
  