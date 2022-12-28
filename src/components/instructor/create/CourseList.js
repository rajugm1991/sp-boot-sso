import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import { useHistory } from "react-router-dom";
import { deleteRequest, getRequest } from "../../../util/APIUtils";
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
           pathname: 'course/view',
           state: {id:record.id,type:'update',data:record}
       } )} id={record.id}>View Course</Button>
       
       <Popconfirm
    title="Delete Course"
    description="Are you sure to delete this course ?"
    onConfirm={()=>{external(record.id)}}
    onCancel={()=>{console.log('cancel')}}
    okText="Yes"
    cancelText="No"
  >
    <a href="#">Delete</a>
  </Popconfirm>
             {/* <Button className="primary" id={record.id} onClick={()=>{console.log(record.id)}}>Delete</Button> */}
            </Space>
          ),
        },
      ];
    const history = useHistory();
    const [load,setLoad]=useState(false);



    const external=(id)=>{

        deleteRequest("/user/admin/api/course/"+id).then((res)=>{
          message.success("Course deleted successfully")
          setData(data=>data.filter(rec=>rec.id!==id))
        }).catch((err)=>{
            message.error(" Error occured while deleting course!!")
        })
    }

     


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