import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Card, InfiniteScroll, List} from "antd-mobile";
import {Badge, Button} from "antd";
import {sleep} from "antd-mobile/es/utils/sleep";
import {nanoid} from "nanoid";
import {PlusOutlined} from "@ant-design/icons";

TestPoint.propTypes = {

};

const test_data = [
  {id: '1', name: '111', address: '1111', real_address:[111,222], openDate: '周一到周五', openTime: '9:00-21:00', tel: '12312312'},
  {id: '2', name: '222', address: '1111', real_address:[111,222], openDate: '周一到周五', openTime: '9:00-21:00', tel: '12312312'},
  {id: '3', name: '333', address: '1111', real_address:[111,222], openDate: '周一到周五', openTime: '9:00-21:00', tel: '12312312'},
]

function TestPoint(props) {
  const [points, setPoints] = useState(test_data)

  const addTestData = async () => {
    await sleep(1000)
    let num = points.length
    setPoints([...points, {...points[0], id: ++num}])
  }

  return (
   <>
     <List header={<div>以下是附近的核酸检测点</div>} style={{width: '100%'}}>
       {points.map((item) =>
         <List.Item key={item.id}>
           <TestPointCard data={item}/>
         </List.Item>
       )}
     </List>
     <InfiniteScroll loadMore={addTestData} hasMore={true}/>
   </>
  );
}

function TestPointCard(props) {
  const data = props.data
  return (
    <Card title={
      <div style={{fontWeight: "bold", fontSize: 20}}>
        {data.name}
      </div>
    } style={{borderRadius: 16, backgroundColor: "#e5e5e5"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>地址：</span>
        <span style={{textAlign: "right"}}>{data.address}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>[DEBUG]经纬度：</span>
        <span style={{textAlign: "right"}}>{data.real_address[0]},&nbsp;{data.real_address[1]}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>开放时间：</span>
        <span style={{textAlign: "right"}}>{data.openDate}&nbsp;{data.openTime}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>联系方式：</span>
        <span style={{textAlign: "right"}}>{data.tel}</span>
      </div>
      {/*<div style={{display: "flex", justifyContent: "flex-end"}}>*/}
      {/*  <Button type='link' style={{textAlign: "right", paddingRight: 0}}*/}
      {/*          onClick={() => props.buttonMore(data)}>>>>查看详情</Button>*/}
      {/*</div>*/}
      [debug]id: {data.id}<br/>
    </Card>
  )
}


export default TestPoint;