import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Card, InfiniteScroll, List, Toast} from "antd-mobile";
import {sleep} from "antd-mobile/es/utils/sleep";
import {Badge} from "antd";
import {useSelector} from "react-redux";
import axios from "axios";

VaccineShow.propTypes = {};

const test_data = [
  {id: 1, counter: 1, kind: "A", time: "2023-11-11 11:11:11"},
  {id: 2, counter: 2, kind: "B", time: "2023-11-11 11:11:12"},
  {id: 3, counter: 3, kind: "C", time: "2023-11-11 11:11:13"}
]

function VaccineShow(props) {
  const userToken = useSelector(state => state.user.token)

  const [vaccineList, setVaccineList] = useState([])

  const GetVaccinumList = async () => {
    try {
      const response = await axios.post('/api/GetVaccinumList', {
        token: userToken,
      })
      console.log(response);
      const data = response.data
      if (data.error !== 0) {
        Toast.show({icon: 'fail', content: `获取失败，错误码${data.error}，错误信息：${data.message}`})
      } else if (data.content) {
        setVaccineList(data.content)
        Toast.show({icon: 'success', content: `获取成功`})
      }
    } catch (error) {
      console.error(error);
      Toast.show({icon: 'fail', content: `获取失败，网络错误`})
    }
  }

  useEffect(() => {
    GetVaccinumList()
  }, [])

  return (
    <>
      <List header='以下是xxx的疫苗接种结果'>
        {vaccineList.map((item) => <List.Item key={item.vaccinum_id}><VaccineShowCard {...item}/></List.Item>)}
      </List>

    </>
  );
}

function VaccineShowCard(props) {
  return (
    <Card title={
      <div style={{fontWeight: "bold", fontSize: 20}}>
        第{props.counter}针
      </div>
    } style={{borderRadius: 16, backgroundColor: "#e5e5e5"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>接种疫苗：</span>
        <span style={{textAlign: "right"}}>{props.kind}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>接种时间：</span>
        <span style={{textAlign: "right"}}>{props.datetime}</span>
      </div>
    </Card>
  )
}


export default VaccineShow;