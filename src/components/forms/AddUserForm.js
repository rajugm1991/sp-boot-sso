import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";


const AddUserForm = ({ values,
    setValues,
    handleCancel,
    handleUser,
    form,
    editForm, rolesData,}) => {

    const onFinish = (val) => {
        setValues({ ...values, loading: true })
        handleUser();

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
            defaultValue="91"
            onChange={(e) => setValues({ ...values, phonePrefix: e.target.value })}

          >
            <Option  value="91">+91</Option>
            <Option value="01">+01</Option>
          </Select>
        </Form.Item>
      );

        console.log('roles'+rolesData);
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
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please enter user name!',
                    },
                ]}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                values={values.name}
            >
                <Input value={values.name} disabled={editForm} />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                values={values.email}
            >
                <Input value={values.email} disabled={editForm} />
            </Form.Item>

            <Form.Item
        name="phone"
        label="Phone Number"
        onChange={(e) => setValues({ ...values, phone: e.target.value })}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
        defaultValue="male"
       
      >
        <Select placeholder="select your gender"  onChange={(e) => setValues({ ...values, gender: e })}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
      name="roles"
      label="Select role"
      rules={[
        {
          required: true,
          message: 'Please select roles!',
          type: 'array',
        },
      ]}
    >
      <Select mode="multiple" placeholder="Please select roles"  onChange={(e) => setValues({ ...values, roles: e })}>
      {rolesData.map((option) => (
                  <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                ))}
      </Select>
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
                        {values.loading ? 'Saving..' : 'Submit'}

                    </Button>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default AddUserForm;
