import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, List, Modal, Popconfirm, Tag } from "antd";
import Item from "antd/es/list/Item";
import React, { useState } from "react";
import ReactPlayer from "react-player";



const LessonList = ({course,
  onDeleteLesson,isAdminUser}) => {
    const deleteLesson=(id)=>{
      console.log('--'+id)
      onDeleteLesson(id)
    }
    const [open, setOpen] = useState(false);

    const[data,setData]=useState({})

    const onClickHandle=(val)=>{
      console.log('va-'+val)
      setData(val);
      setOpen(true);
    }

  return (
    <React.Fragment>
      <div className="col lesson-list">
        <h4>
          {course && course.courseLeasons && course.courseLeasons.length} Lessons
        </h4>
        <List
          itemLayout="horizontal"
          dataSource={course && course.courseLeasons}
          renderItem={(item, index) => (
            <Item>
              
              <Item.Meta
                avatar={<Avatar>{index + 1}</Avatar>}
                title={item.title}
                onClick={()=>isAdminUser && onClickHandle(item)}
              >
                </Item.Meta>
               {!isAdminUser && item.courseVideo && item.videoFreePreview && (
                <span
                onClick={()=>onClickHandle(item)}
                >
                 <Tag color="green"> Preview </Tag>
                </span>
               )}

              
             {isAdminUser&& <Popconfirm
                title="Delete the Lesson"
                description="Are you sure to delete this Lesson?"
                onConfirm={() => { deleteLesson(item.id)}}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
              >     <DeleteOutlined onClick={()=>{}}
                  className="text-danger float-right"
                />
              </Popconfirm>}

            </Item>
          )}
        ></List>

<Modal
        title={data && data.title }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={700}
      >
          <div className="pt-2 d-flex justify-content-center">
         { data&& data.courseVideo&& <ReactPlayer   
          url={data.courseVideo.awsUrl}
          width="700px"
          height="320px"
          controls
           />}
          </div>
      </Modal>
      </div>

      
    </React.Fragment>
  )
}


export default LessonList;