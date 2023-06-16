import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {useLocation} from "react-router-dom";
import {List, Popup, Toast} from "antd-mobile";
import {UserOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUserInfo} from "../../redux/userInfo/userInfoSlice";

UserInformation.propTypes = {};

function UserInformation(props) {
  // const location = useLocation()
  // const state = location.state
  const userToken = useSelector(state => state.user.token)
  const userInfo = useSelector(state => state.userInfo)
  const dispatch = useDispatch()

  const [phone, setPhone] = useState("XXX")
  const [address, setAddress] = useState("XXX")
  const [email, setEmail] = useState("XXX")
  const [sex, setSex] = useState('')
  const [popup, setPopup] = useState(false)
  const [popupValue, setPopupValue] = useState("")
  const [popupSetFunction, setPopupSetFunction] = useState(null)
  const [popupLoading, setPopupLoading] = useState(false)

  const getUserInfo = async () => {
    try {
      const response = await axios.post('/api/GetUserInfo', {
        token: userToken
      })
      console.log(response);
      const data = response.data
      if (data.error !== 0) {
        setPhone('')
        setAddress('')
        setEmail('')
        setSex('')
        Toast.show({icon: 'fail', content: `数据获取失败，错误码${data.error}，错误信息：${data.message}`})
      } else if (data.name) {
        setPhone(data.phone)
        setAddress(data.address)
        setEmail(data.email)
        setSex(data.sex)
        dispatch(setUserInfo({name: data.name, card_id: data.card_id}))
        Toast.show({icon: 'success', content: `数据获取成功`})
      }
    } catch (error) {
      console.error(error);
      setPhone('')
      setAddress('')
      setEmail('')
      setSex('')
      Toast.show({icon: 'fail', content: `数据获取失败，网络错误`})
    }
  }

  useEffect(() => {
    const func = async () => {
      await getUserInfo()
    }
    func()
  }, [])

  return (
    <div style={{margin: "20px 16px 0"}}>
      <List header={
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>我的信息</div>
          <Button type="primary" size="small" loading={true}>保存(已弃用)</Button>
        </div>
      }>
        <List.Item prefix={<UserOutlined />} extra={userInfo?.info?.name}>
          姓名
        </List.Item>
        <List.Item extra={sex === 0 ? '男' : '女'}>
          性别
        </List.Item>
        <List.Item extra={userInfo?.info?.card_id}>
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
              try {
                const response = await axios.post('/api/SetUserInfo', {
                  token: userToken,
                  phone: phone,
                  address: address,
                  email: email
                })
                console.log(response);
                const data = response.data
                if (data.error !== 0) {
                  Toast.show({icon: 'fail', content: `更新失败，错误码${data.error}，错误信息：${data.message}`})
                  await getUserInfo()
                } else {
                  popupSetFunction(popupValue);
                  Toast.show({icon: 'success', content: `更新成功`})
                  setPopupSetFunction(null);
                  setPopup(false)
                }
              } catch (error) {
                console.error(error);
                Toast.show({icon: 'fail', content: `更新失败，网络错误`})
                await getUserInfo()
              }
              setPopupLoading(false)
            }
          }}>保存</Button>
        </div>
      </Popup>
    </div>
  );
}

export default UserInformation;