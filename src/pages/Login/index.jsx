import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Form, Input, Button, Toast} from "antd-mobile";
import {useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";
import {useDispatch} from "react-redux";
import {setUserToken} from "../../redux/user/userSlice";
import axios from "axios";

Login.propTypes = {};

function Login(props) {
  const disaptch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  return (
    <div style={{margin: "20px 16px 0"}}>
      <div style={{textAlign: "center", fontSize: 24, marginBottom: 10}}>用户登录</div>
      <Form form={form} initialValues={{card_id: '', name: ''}} layout='horizontal'>
        <Form.Item label='身份证号' name='card_id'>
          <Input placeholder='请输入身份证号' clearable/>
        </Form.Item>
        <Form.Item label='姓名' name='name'>
          <Input placeholder='请输入姓名' clearable/>
        </Form.Item>
      </Form>
      <Button block color='primary' size='large' loading={loading} onClick={
        async () => {
          setLoading(true)
          const values = form.getFieldsValue()
          console.log('form', values)
          try {
            const response = await axios.post('/api/LoginUser', {
              name: values.name,
              card_id: values.card_id
            })
            console.log(response);
            const data = response.data
            if(data.error !== 0) {
              Toast.show({icon: 'fail', content: `登录失败，错误码${data.error}，错误信息：${data.message}`})
            } else if(data.token) {
              Toast.show({icon: 'success', content: `登录成功`})
              disaptch(setUserToken(data.token))
              navigate('/user')
            }
          } catch (error) {
            console.error(error);
            Toast.show({icon: 'fail', content: `登录失败，网络错误`})
          }
          setLoading(false)
          // await new Promise(r => setTimeout(r, 1000))
          // setLoading(false)
          // const token = nanoid()
          // Toast.show(`假设登录成功！返回token为${token}`)
          // disaptch(setUserToken(token))
          // navigate('/user')
        }}>
        登录
      </Button>
    </div>
  );
}

export default Login;