import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {List, Card, InfiniteScroll, Toast} from "antd-mobile";
import {Badge} from "antd";
import {sleep} from 'antd-mobile/es/utils/sleep';
import {useSelector} from "react-redux";
import axios from "axios";

TestShow.propTypes = {};

const textMap = ["阴性", "混管阳性", "阳性", "报告未出"]
const colorMap = ["#52c41a", "#ff411c", "#ff411c", "#888888"]

const test_data = [
  {id: 1, result: "阴性", color: "#52c41a", date_time: 0},
  {id: 2, result: "阳性", color: "#ff411c", date_time: 1},
  {id: 3, result: "报告未出", color: "#888888", date_time: 2}
]


function TestShow(props) {
  const userToken = useSelector(state => state.user.token)

  const [testResults, setTestResults] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const GetTests = async () => {
    try {
      const response = await axios.post('/api/GetTests', {
        token: userToken,
        num: 10,
        offset: testResults.length
      })
      console.log(response);
      const data = response.data
      if (data.error !== 0) {
        Toast.show({icon: 'fail', content: `获取失败，错误码${data.error}，错误信息：${data.message}`})
        await new Promise(r => setTimeout(r, 3000));
      } else if (data.content) {
        if(data.content.length > 0) {
          setTestResults([...testResults, ...data.content])
          Toast.show({icon: 'success', content: `获取成功`})
        } else {
          setHasMore(false)
        }
      } else {
        setHasMore(true)
      }
    } catch (error) {
      console.error(error);
      Toast.show({icon: 'fail', content: `获取失败，网络错误`})
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  const addTestData = async () => {
    await sleep(1000)
    let num = testResults.length
    setTestResults([...testResults, ...testResults.map(
      (item) => {
        return {...item, id: ++num}
      })
    ])
  }

  useEffect(() => {
    GetTests()
  }, [])

  return (
    <>
      <List header='以下是xxx的核酸检测结果'>
        {testResults.map((item) => <List.Item key={item.test_id}><TestShowCard {...item}/></List.Item>)}
      </List>
      <InfiniteScroll loadMore={GetTests} hasMore={hasMore} threshold={0}/>
    </>
  );
}

function TestShowCard(props) {
  return (
    <Card title={
      <div style={{fontWeight: "bold", fontSize: 20}}>
        检测结果：
      </div>
    } extra={<Badge count={textMap[props.result]} style={{backgroundColor: colorMap[props.result]}}/>}
          style={{borderRadius: 16, backgroundColor: "#e5e5e5"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>报告时间：</span>
        <span style={{textAlign: "right"}}>{new Date(props.date_time).toLocaleString()}</span>
      </div>
    </Card>
  )
}

export default TestShow;