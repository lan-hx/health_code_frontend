import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {List, Card, InfiniteScroll} from "antd-mobile";
import {Badge} from "antd";
import { sleep } from 'antd-mobile/es/utils/sleep';

TestShow.propTypes = {};

const test_data = [
  {id:1, result:"阴性", color:"#52c41a", time:"2023-11-11 11:11:11"},
  {id:2, result:"阳性", color:"#ff411c", time:"2023-11-11 11:11:12"},
  {id:3, result:"报告未出", color:"#888888", time:"2023-11-11 11:11:13"}
]



function TestShow(props) {
  const [testResults, setTestResults] = useState(test_data)
  const addTestData = async ()=>{
    await sleep(1000)
    let num = testResults.length
    setTestResults([...testResults, ...testResults.map(
      (item)=>{return {...item, id:++num}})
    ])
  }
  return (
    <>
      <List header='以下是xxx的核酸检测结果'>
        {testResults.map((item)=> <List.Item key={item.id}><TestShowCard {...item}/></List.Item>)}
      </List>
      <InfiniteScroll loadMore={addTestData} hasMore={true} />
    </>
  );
}

function TestShowCard(props) {
  return (
    <Card title={
      <div style={{fontWeight: "bold", fontSize: 20}}>
        检测结果：
      </div>
    } extra={<Badge count={props.result} style={{backgroundColor: props.color}}/>}
          style={{borderRadius: 16, backgroundColor: "#e5e5e5"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>报告时间：</span>
        <span style={{textAlign: "right"}}>{props.time}</span>
      </div>
    </Card>
  )
}

export default TestShow;