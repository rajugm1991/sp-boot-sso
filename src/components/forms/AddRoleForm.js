import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const AddRoleForm=({
    values,
    setValues,
    handleCancel,
    handleRole,
    form,
    editForm,
  })=>{

    console.log('iis Edit '+editForm)

    const onFinish = (val) => {
        setValues({...values,loading:true})
        handleRole();

      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
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
        label="Role Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter role name!',
          },
        ]}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        values={values.name}
      >
        <Input value={values.name} disabled={editForm}/>
      </Form.Item>

      <Form.Item
        label="Role Description"
        name="roleDescription"
        onChange={(e) => setValues({ ...values, roleDescription: e.target.value })}
        values={values.roleDescription}
      >
        <TextArea  showCount maxLength={750}   value={values.roleDescription} />
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
        <Button   onClick={handleCancel}>
          Cancel
        </Button>
        </Space>
      </Form.Item>
    </Form>
    )
}

export default AddRoleForm;