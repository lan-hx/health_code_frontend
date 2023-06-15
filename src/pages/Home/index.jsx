import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, Card, Col, QRCode, Row, Space} from "antd";
import {Footer, Toast} from "antd-mobile";
import {
  EyeInvisibleTwoTone,
  EyeTwoTone,
  FormOutlined,
  UpCircleTwoTone,
  MailTwoTone,
  CalendarTwoTone,
  BankTwoTone,
  HomeTwoTone
} from "@ant-design/icons";
import styles from "./index.module.css";
import {useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import axios from "axios";
import {setUserToken} from "../../redux/user/userSlice";
import {setUserInfo} from "../../redux/userInfo/userInfoSlice";

Home.propTypes = {};

const colorMap = ['#52c41a', '#ff411c', 'orange', '#888888']
const testColorMap = ['#52c41a', '#ff411c', '#ff411c', '#888888']

function Home(props) {
  const userToken = useSelector(state => state.user.token)
  const userInfo = useSelector(state => state.userInfo)
  const navigate = useNavigate()

  const [qrCodeState, setQrCodeState] = useState(3)
  const [qrCode, setQrCode] = useState('该二维码无效，请刷新重试');
  const [latestTest, setLatestTest] = useState({datetime: '', result: ''})
  const [name, setName] = useState('XXX')
  const [nameHidden, setNameHidden] = useState(true)
  const [time, setTime] = useState(new Date().toLocaleString())

  const getHealthCodeStatus = async () => {
    try {
      const response = await axios.post('/api/GetHealthCodeStatus', {
        token: userToken
      })
      console.log(response);
      const data = response.data
      if (data.error !== 0) {
        setQrCodeState(3)
        setQrCode('该二维码无效，请刷新重试')
        Toast.show({icon: 'fail', content: `更新失败，错误码${data.error}，错误信息：${data.message}`})
      } else if(data.status != null) {
        setQrCodeState(data.status)
        setQrCode(data.health_code_string)
        setLatestTest(data.latest_test)
        Toast.show({icon: 'success', content: `更新成功`})
      }
    } catch (error) {
      console.error(error);
      setQrCodeState(3)
      setQrCode('该二维码无效，请刷新重试')
      Toast.show({icon: 'fail', content: `更新失败，网络错误`})
    }
  }

  useEffect(() => {
    getHealthCodeStatus()
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{margin: "20px 16px 0"}}>
      <Alert message="该项目为浙江大学软件工程课程小组项目，不构成任何法律效力！" type="warning" showIcon
             style={{marginBottom: 10}}/>
      <Card className={styles.cardCodeBody} bodyStyle={{padding: 10}}>
        <div className={styles.qrCodeWrapper}>
          <Row gutter={16} justify="space-around" style={{width: "100%"}}>
            <Col span={12}>
              {nameHidden ? (userInfo?.name) : (userInfo?.name.split('').map((item, index) => index === 1 ? '*' : item))}&nbsp;
              {nameHidden ? <EyeTwoTone onClick={() => {
                setNameHidden(!nameHidden)
              }}/> : <EyeInvisibleTwoTone onClick={() => {
                setNameHidden(!nameHidden)
              }}/>}
            </Col>
            <Col span={12}>
              <div style={{textAlign: "right"}}><a>???</a></div>
            </Col>
            <Col span={24}>
              <div style={{textAlign: "center"}}>
                <h1>{time}</h1>
              </div>
            </Col>
            <Col span={24}>
              <div style={{display: 'flex', justifyContent: 'center', padding: 0}}>
                <div onClick={async () => {
                  await getHealthCodeStatus()
                  // setQrCode('绿码哈哈哈哈哈哈哈哈哈哈哈哈哈' + nanoid())
                  // Toast.show({icon: 'success', content: '更新成功！'})
                }}>
                  <QRCode value={qrCode || '-'} style={{backgroundColor: "#e5e5e5"}} bordered={false}
                          color={colorMap[qrCodeState]}/>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      <Card className={styles.cardButtons}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <HomeCardButton content='查看核酸结果' icon={FormOutlined} onClick={() => {
              navigate('/information', {state: {key: 'test'}})
            }}/>
          </Col>
          <Col span={8}>
            <HomeCardButton content='通信行程卡' icon={UpCircleTwoTone} onClick={() => {
              window.location.href = 'https://xc.caict.ac.cn/';
            }}/>
          </Col>
          <Col span={8}>
            <HomeCardButton content='健康码变码申请' icon={MailTwoTone} onClick={() => {
              navigate('/user/complain')
            }}/>
          </Col>
          <Col span={8}>
            <HomeCardButton content='预约疫苗接种' icon={CalendarTwoTone} onClick={() => {
              navigate('/user/vaccine')
            }}/>
          </Col>
          <Col span={8}>
            <HomeCardButton content='场所码' icon={BankTwoTone}/>
          </Col>
          <Col span={8}>
            <HomeCardButton content='查看核酸检测点信息' icon={HomeTwoTone} onClick={() => {
              navigate('/testpoint')
            }}/>
          </Col>
        </Row>
      </Card>

      <div style={{textAlign: "center"}}>
        一些说明<br/>
        [debug] token = {userToken}, qr = {qrCode}
      </div>
      <Alert message="绿码，畅行无阻" type="success" showIcon/>
      <Footer label='没有更多了'></Footer>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长<br/>
      假设我很长1<br/>
    </div>
  );
}

function HomeCardButton(props) {
  return (
    <div onClick={props.onClick}>
      <Card hoverable style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 90}}
            bodyStyle={{padding: 10}}>
        {React.createElement(props.icon, {style: {fontSize: 30, display: 'flex', justifyContent: 'center'}})}
        <div style={{fontSize: 12, textAlign: "center"}}>{props.content}</div>
      </Card>
    </div>
  )
}

export default Home;