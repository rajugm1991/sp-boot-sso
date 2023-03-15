import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Image, Input, message, Modal, Space, Table, Tag } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { API_ADMIN_ROLE_LIST, API_ADMIN_USER_LIST } from "../../constants/URLConstants";
import { genericMethodRequest, getRequest, postRequest } from "../../util/APIUtils";
import AddUserForm from "../forms/AddUserForm";



const UserAdminList = () => {
  const[searchValue,setSearchValue]=useState("");

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'key',
      fixed: 'left',
      render: (_, record) => record.imageUrl ?
        <Avatar size={"large"} src={<Image src={record.imageUrl} alt={<UserOutlined />} style={{ width: 32 }} />} /> :
        <Avatar
          style={{
            backgroundColor: '#f56a00',
            verticalAlign: 'middle',
          }}
          size="large"
          gap={1}
        >
          {record.name.substring(0, 1).toUpperCase()}
        </Avatar>
      ,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'key',
      filteredValue:[searchValue],
      fixed: 'left',
      onFilter: (value,record)=>{
        return String(record.name).toLocaleLowerCase().includes(value.toLocaleLowerCase())
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'key',
      fixed: 'left',
      filteredValue:[searchValue],
      onFilter: (value,record)=>{
        return String(record.email).toLocaleLowerCase().includes(value.toLocaleLowerCase())
      }
    },
    {
      title: 'Roles',
      key: 'key',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <Fragment>
          {roles.map((role) => {
            let color = role.length > 1 ? 'geekblue' : 'green';
            if (role.name === 'ROLE_ADMIN') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={role.name}>
                {role.name.toUpperCase()}
              </Tag>
            );
          })}
        </Fragment>
      ),
    },
    {
      title: 'Is Email Verified',
      dataIndex: 'emailVerified',
      key: 'key',
      render: (_, record) => (
        record.emailVerified ? 'Yes' : 'No'
      )
  
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'key'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'key'
    },

    {
      title: 'Status',
      dataIndex: 'userStatus',
      key: 'key'
    }, {
      title: 'Created Date',
      dataIndex: 'createdDt',
      key: 'key'
    }, {
      title: 'Updated Date',
      dataIndex: 'updatedDt',
      key: 'key'
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
       <Button type="primary" onClick={()=>editUser(record)} ghost>
      Edit
    </Button>
    <Button type="primary" danger ghost>
      Delete
    </Button>
          </Space>
      ),
    },
  ];

  const [userData, SetUserData] = useState([]);
  const [load, setLoad] = useState(false);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [rolesData,setRolesData]=useState([]);
  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    roles: [],
    phonePrefix:"",
    phoneNumber:"",
    gender:"",
  });
  const [recordUpdate, setRecordUpdate] = useState(false);

  const [editForm, setEditForm] = useState(false);

  const resetState = () => {
    resetFormFields();
    setRecordUpdate(!recordUpdate);
  }

  const editUser=(record)=>{
    fetchRoles();
    console.log('User  '+JSON.stringify(record));
    const updUser={
      id: record.id,
      name: record.name,
    email: record.email,
    roles: record.roles.map((role)=>role.id),
    phonePrefix:"",
    phoneNumber:record.phoneNumber,
    gender:record.gender,
  };
    form.setFieldsValue({
      ...updUser
    })
    setValues(updUser);
    setVisible(true);
    setEditForm(true);

  }

  const resetFormFields = () => {
    setValues({
      id: "",
      name: "",
      roleDescription: "",
    });

    form.resetFields();
  }

  const handleUser = () => {

    console.log(values)
    if(editForm){
      console.log("Inside user update "+values)
      genericMethodRequest(API_ADMIN_USER_LIST,values,'PUT').then((res)=>{
        message.success(res.message);
        setValues({ ...values, loading: false })
        setVisible(false)
        setEditForm(false);
        resetState();
    }).catch((err)=>{
        message.error(err.message);
        console.log("USER_ADD: error."+err)
        setVisible(true)
        setValues({ ...values, loading: false })
    })
    }
    else{
    postRequest(API_ADMIN_USER_LIST,values).then((res)=>{
        message.success(res.message);
        setValues({ ...values, loading: false })
        setVisible(false)
        resetState();
    }).catch((err)=>{
        message.error(err.message);
        console.log("USER_ADD: error."+err)
        setVisible(true)
        setValues({ ...values, loading: false })
    })
  }
  }



  const fetchRoles=()=>{
    getRequest(API_ADMIN_ROLE_LIST).then((res)=>{
      setRolesData(res.data);
  }).catch((err)=>{
      console.log(err);
      setRolesData([]);
  })
  }

  const addUserData =()=>{

    if(rolesData.length===0){
      fetchRoles();
    }
    setVisible(true);
    setEditForm(false);
  }
  useEffect(() => {
    setLoad(true);
    getRequest(API_ADMIN_USER_LIST).then((res) => {
      SetUserData(res.data);
      setLoad(false);
    }).catch((err) => {
      console.log(err);
      setLoad(false);

    })

  }, [recordUpdate])


  return (
    <React.Fragment>
      <h6>Users</h6><br></br>
      <Button
        type="primary"
        onClick={() => addUserData()}
        style={{
          marginBottom: 16,
        }}
        icon={<PlusOutlined />}
      >
        Add a User
      </Button>
      <Input.Search placeholder="Search here..."
      style={{merginBottom:8}}
       onSearch={(value)=>{
        setSearchValue(value)
       }}
       onChange={(e)=>setSearchValue(e.target.value)}/>
      <Table scroll={{
      x: 1500,
      y: 200,
    }} columns={columns} dataSource={userData} />

      <Modal
        title="+ Add User"
        centered
        visible={visible}
        onCancel={() => { setVisible(false), setEditForm(false), resetFormFields() }}
        footer={null}
      >
        <AddUserForm
          values={values}
          setValues={setValues}
          handleUser={handleUser}
          handleCancel={() => { setVisible(false), setEditForm(false), resetFormFields() }}
          form={form}
          editForm={editForm}
          rolesData={rolesData}
        />
      </Modal>

    </React.Fragment>
  )
}

export default UserAdminList;