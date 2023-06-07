import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Card, InfiniteScroll, List} from "antd-mobile";
import {sleep} from "antd-mobile/es/utils/sleep";
import {Badge} from "antd";

VaccineShow.propTypes = {};

const test_data = [
  {id: 1, counter: 1, kind: "A", time: "2023-11-11 11:11:11"},
  {id: 2, counter: 2, kind: "B", time: "2023-11-11 11:11:12"},
  {id: 3, counter: 3, kind: "C", time: "2023-11-11 11:11:13"}
]

function VaccineShow(props) {
  return (
    <>
      <List header='以下是xxx的疫苗接种结果'>
        {test_data.map((item) => <List.Item key={item.id}><VaccineShowCard {...item}/></List.Item>)}
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
        <span style={{textAlign: "right"}}>{props.time}</span>
      </div>
    </Card>
  )
}


export default VaccineShow;