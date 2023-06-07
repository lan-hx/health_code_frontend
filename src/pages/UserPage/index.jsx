import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Avatar, Button} from "antd";
import {Card, List, Switch, Toast} from "antd-mobile";
import {UserOutlined} from "@ant-design/icons";
import {RightOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserToken} from "../../redux/user/userSlice";
import {nanoid} from "nanoid";

UserPage.propTypes = {};

function UserPage(props) {
  const navigate = useNavigate()
  const userToken = useSelector(state => state.user.token)
  const disaptch = useDispatch()

  useEffect(() => {
    if (userToken.length === 0) {
      Toast.show('提示：未获取到用户token，可以跳转登录界面')
    }
  })

  return (
    <div style={{margin: "20px 16px 0"}}>
      <ProfileCard/>
      <List header="我的信息">
        <List.Item prefix={<UserOutlined/>} clickable onClick={() => {
          navigate('/user/information')
        }}>
          个人信息
        </List.Item>
        <List.Item clickable onClick={() => {
          navigate('/information', {state: {key: 'test'}})
        }}>
          核酸检测结果
        </List.Item>
        <List.Item clickable onClick={() => {
          navigate('/information', {state: {key: 'vaccine'}})
        }}>
          疫苗接种
        </List.Item>
      </List>
      <List header="我的申请">
        <List.Item clickable onClick={() => {
          navigate('/user/complain')
        }}>
          健康码申诉
        </List.Item>
        <List.Item clickable onClick={() => {
          navigate('/user/vaccine')
        }}>
          疫苗接种预约
        </List.Item>
      </List>
      <List header="信息查询">
        <List.Item clickable
                   onClick={() => window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA4MDYzMDIxMA==&mid=2650062860&idx=1&sn=4e53d988fb1550c68c6cc3c28766a980&chksm=87a138a1b0d6b1b79cbc147238293967e7797fb2697515eb91a06000059b05e8eaab73db1521&scene=27'}>
          获取防疫信息
        </List.Item>
        <List.Item clickable onClick={() => {
          navigate('/testpoint')
        }}>
          查看核酸检测点信息
        </List.Item>
      </List>
      <List header="其他">
        <List.Item clickable>
          扫描场所码
        </List.Item>
        <List.Item extra={<Switch defaultChecked/>}
                   description='开启后，将在您的核酸检测结果过期前一天发送邮件提醒'>开启核酸检测提醒</List.Item>
        <List.Item clickable onClick={() => {
          navigate('/user/about')
        }}>
          关于
        </List.Item>
      </List>
      <Button block danger size='large' style={{margin: "10px 0"}} onClick={() => {
        navigate('/login')
      }}>
        注销
      </Button>
      <List header='调试'>
        <List.Item extra={userToken}>UserToken</List.Item>
        <List.Item clickable onClick={() => {
          navigate('/login')
        }}>去往登录界面</List.Item>
        <List.Item clickable onClick={() => disaptch(setUserToken(nanoid()))}>随机设置token</List.Item>
      </List>
    </div>
  );
}

function ProfileCard(props) {
  const navigate = useNavigate()
  return (
    <Card style={{borderRadius: 16, backgroundColor: "#e5e5e5"}}
          bodyStyle={{display: "flex", alignItems: "center", flexDirection: "row"}}>
      <Avatar size={64} icon={<UserOutlined/>} style={{marginRight: 10}}>User</Avatar>
      <div style={{
        alignSelf: "stretch",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      }}>
        <div>姓名：XXX</div>
        <div>年龄：120</div>
      </div>
      <Button type='text' onClick={() => {
        navigate('/user/information')
      }}>
        详细信息<RightOutline/>
      </Button>
    </Card>
  )
}

export default UserPage;