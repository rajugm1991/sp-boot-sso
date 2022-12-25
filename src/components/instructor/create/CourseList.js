import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from 'antd';
import { useHistory } from "react-router-dom";
import { getRequest } from "../../../util/APIUtils";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";






const CourseList=()=>{
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render:((_,val)=>val.paid?val.price:'-')
          },
    
          {
            title: 'Is Paid Course ?',
            dataIndex: 'paid',
            key: 'paid',
            render:((val)=> val?'Yes':'No')
    
          },

          {
            title: 'Photo',
            dataIndex: 'courseImage',
            key: 'courseImage',
            render:((_,val)=> <img width={30} maxWidth={30} src={val.courseImage.url} />)
    
          },
        
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <Button  onClick={()=>history.push( {
           pathname: 'course/create',
           state: {id:record.id,type:'update',data:record}
       } )} id={record.id}>Edit</Button>
              <a href="#">Delete</a>
            </Space>
          ),
        },
      ];
    const history = useHistory();
    const [load,setLoad]=useState(false);




    const [data,setData] =useState([]);

    useEffect(()=>{
        setLoad(true);
        getRequest("/user/admin/api/course").then((res)=>{
            setData(res);
            setLoad(false);
        }).catch((err)=>{
            console.log(err);
            setLoad(false);

        })
    },[])

    const handleAdd=()=>{
        history.push("course/create")
    }

    return(
        <React.Fragment>
        <div>
        <h6>Courses</h6><br></br>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
          icon={<PlusOutlined/>}
        >
          Add a Course
        </Button>
        <Table columns={columns} dataSource={data} loading={load} pagination={{ pageSize: 6}}/>
        </div>
        </React.Fragment>
    )
}

export default CourseList;