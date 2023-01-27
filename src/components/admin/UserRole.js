import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API_ADMIN_ROLE_ADD, API_ADMIN_ROLE_LIST } from "../../constants/URLConstants";
import { genericMethodRequest, getRequest, postRequest } from "../../util/APIUtils";
import AddRoleForm from "../forms/AddRoleForm";



const UserRole=()=>{
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'roleDescription',
            key: 'roleDescription',
            render: (text) => <a>{text}</a>,
          },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => <Button  onClick={()=>editRole(record)}>Edit</Button>,
          },
      ];
      const history = useHistory();
      const [recordUpdate, setRecordUpdate] = useState(false);

      const [editForm,setEditForm]=useState(false);

      const [load,setLoad]=useState(false);
      const [data,setData] =useState([]);
      const [form] = Form.useForm();
      const [visible, setVisible] = useState(false);
      const [values, setValues] = useState({
          id: "",
          name: "",
          roleDescription:"",
      });

      const editRole=(record)=>{
        console.log('Roles  '+JSON.stringify(record));
        const updRole={
          id: record.id,
          name: record.name,
          roleDescription:record.roleDescription,
      };
        form.setFieldsValue({
          ...updRole
        })
        setValues(updRole);
        setVisible(true);
        setEditForm(true);

      }

      const resetState = () => {
       resetFormFields();
        setRecordUpdate(!recordUpdate);
    }

    const resetFormFields=()=>{
      setValues({
        id: "",
        name: "",
        roleDescription:"",
    });

    form.resetFields();
    }
      const handleRole=()=>{

        if(editForm){
          genericMethodRequest(API_ADMIN_ROLE_ADD,values,'PUT').then((res)=>{
            message.success(res.message);
            setValues({ ...values, loading: false })
            setVisible(false)
            setEditForm(false);
            resetState();
        }).catch((err)=>{
            message.error(err.message);
            console.log("ROLE_ADD: error."+err)
            setVisible(true)
            setValues({ ...values, loading: false })
        })
        }
        else{
        postRequest(API_ADMIN_ROLE_ADD,values).then((res)=>{
            message.success(res.message);
            setValues({ ...values, loading: false })
            setVisible(false)
            resetState();
        }).catch((err)=>{
            message.error(err.message);
            console.log("ROLE_ADD: error."+err)
            setVisible(true)
            setValues({ ...values, loading: false })
        })
      }
      }

      useEffect(()=>{
          setLoad(true);
          getRequest(API_ADMIN_ROLE_LIST).then((res)=>{
              setData(res.data);
              setLoad(false);
          }).catch((err)=>{
              console.log(err);
              setLoad(false);
  
          })
      },[recordUpdate])
    return(
        <React.Fragment>
        <div>
        <h6>Roles</h6><br></br>
        <Button
        onClick={() => {setVisible(true),setEditForm(false)}}
          type="primary"
          style={{
            marginBottom: 16,
          }}
          icon={<PlusOutlined/>}
        >
          Add a Role
        </Button>
        <Table columns={columns} dataSource={data} loading={load} pagination={{ pageSize: 5}}/>
        </div>

        <Modal
                            title="+ Add Role"
                            centered
                            visible={visible}
                            onCancel={() => {setVisible(false),setEditForm(false),resetFormFields()}}
                            footer={null}
                        >
                            <AddRoleForm
                                values={values}
                                setValues={setValues}
                                handleRole={handleRole}
                                handleCancel={() =>  {setVisible(false),setEditForm(false),resetFormFields()}}
                                form={form}
                                editForm={editForm}
                            />
                        </Modal>
        </React.Fragment>
    )
}

export default UserRole;
