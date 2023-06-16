import Home from "../Home";
import {Navigate} from "react-router-dom";
import React from "react";
import {HomeOutlined, MessageOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import Information from "../Information";
import UserPage from "../UserPage";
import UserInformation from "../UserInformation";
import HealthCodeComplain from "../HealthCodeComplain";
import VaccineAppointment from "../VaccineAppointment";
import About from "../About";
import TestPoint from "../TestPoint";
import Login from "../Login";

export const routes = [{
  path: '/home', element: <Home/>
}, {
//   path: '/location/:location_id', element: <Home/>
// }, {
  path: '/information', element: <Information/>
}, {
  path: '/message', element: <Message/>
}, {
  path: '/user', element: <UserPage/>
}, {
  path: '/testpoint', element: <TestPoint/>
}, {
  path: '/user/information', element: <UserInformation/>
}, {
  path: '/user/complain', element: <HealthCodeComplain/>
}, {
  path: '/user/vaccine', element: <VaccineAppointment/>
}, {
  path: '/user/about', element: <About/>
}, {
  path: '/user/information', element: <UserInformation/>
}, {
  path: '/login', element: <Login/>
}, {
  path: '*', element: <Navigate to="/home"/>, replace: true
},]

export const tabs = [{
  key: '/home', title: '首页', icon: <HomeOutlined/>,
}, {
  key: '/information', title: '信息', icon: <UnorderedListOutlined/>,
}, {
  key: '/message', title: '提醒', icon: <MessageOutlined/>,
}, {
  key: '/user', title: '我的', icon: <UserOutlined/>,
},]

function Todo() {
  return <div>待办</div>
}

function Message() {
  return <div>消息</div>
}

function PersonalCenter() {
  return <div>我的</div>
}

