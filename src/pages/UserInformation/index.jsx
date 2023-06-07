import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {useLocation} from "react-router-dom";
import {List, Popup, Toast} from "antd-mobile";
import {UserOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {useSelector} from "react-redux";

UserInformation.propTypes = {};

function UserInformation(props) {
  // const location = useLocation()
  // const state = location.state
  const userToken = useSelector(state => state.user.token)

  const [phone, setPhone] = useState("XXX")
  const [address, setAddress] = useState("XXX")
  const [email, setEmail] = useState("XXX")
  const [popup, setPopup] = useState(false)
  const [popupValue, setPopupValue] = useState("")
  const [popupSetFunction, setPopupSetFunction] = useState(null)
  const [popupLoading, setPopupLoading] = useState(false)

  return (
    <div style={{margin: "20px 16px 0"}}>
      <List header={
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>我的信息</div>
          <Button type="primary" size="small" loading={true}>保存(已弃用)</Button>
        </div>
      }>
        <List.Item prefix={<UserOutlined />} extra="XXX">
          姓名
        </List.Item>
        <List.Item extra="武装直升机">
          性别
        </List.Item>
        <List.Item extra="XXXXXXXXXXXXXXXXXX">
          身份证号
        </List.Item>
        <List.Item extra={phone} onClick={()=>{setPopupValue(phone);setPopupSetFunction(()=>setPhone);setPopup(true);}}>
          手机
        </List.Item>
        <List.Item extra={address} onClick={()=>{setPopupValue(address);setPopupSetFunction(()=>setAddress);setPopup(true)}}>
          家庭住址
        </List.Item>
        <List.Item extra={email} onClick={()=>{setPopupValue(email);setPopupSetFunction(()=>setEmail);setPopup(true)}}>
          邮箱
        </List.Item>
      </List>
      <List header="调试">
        <List.Item extra={userToken}>
          UserToken
        </List.Item>
      </List>
      <Popup
        visible={popup}
        onMaskClick={() => {
          setPopup(false)
        }}
        onClose={() => {
          setPopup(false)
        }}
      >
        <div style={{display:"flex",margin: "20px 16px"}}>
          <Input
            placeholder='请输入内容'
            value={popupValue}
            onChange={event => {
              setPopupValue(event.target.value)
            }}
          />
          <Button type="primary" style={{marginLeft:5}} loading={popupLoading} onClick={async ()=>{
            if(popupSetFunction) {
              setPopupLoading(true)
              await new Promise(r => setTimeout(r, 1000));
              popupSetFunction(popupValue);
              setPopupLoading(false)
              Toast.show({icon: 'success', content: '修改成功'})
            }
            setPopupSetFunction(null);
            setPopup(false)
          }}>保存</Button>
        </div>
      </Popup>
    </div>
  );
}

export default UserInformation;