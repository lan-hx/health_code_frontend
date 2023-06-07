import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Card, InfiniteScroll, List, Popup, Toast} from "antd-mobile";
import {Badge, Button, Divider, Input, Space} from "antd";
import {sleep} from "antd-mobile/es/utils/sleep";
import {PlusOutlined} from "@ant-design/icons";
import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import axios from "axios";

const { TextArea } = Input;

HealthCodeComplain.propTypes = {};

const test_data = [
  {id: '1', datetime: '2023-11-11 11:11:11', content: '我要绿码！！！', state: 0, comment: 'OK'},
  {
    id: '2',
    datetime: '2023-11-11 11:11:11',
    content: '我要绿码！！！',
    state: 1,
    comment: '凭什么给你绿码，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长'
  },
  {id: '3', datetime: '2023-11-11 11:11:11', content: '我要绿码！！！', state: 2, comment: ''},
]

const stateMap = ['通过', '驳回', '待审核']
const colorMap = ['#52c41a', '#ff411c', '#888888']

function HealthCodeComplain(props) {
  const userToken = useSelector(state => state.user.token)

  const [complains, setComplains] = useState(test_data)
  const [popup, setPopup] = useState(false)
  const [editingData, setEditingData] = useState({})
  const [editingNew, setEditingNew] = useState(false)
  const [popupLoading, setPopupLoading] = useState(false)
  const [newComplainContent, setNewComplainContent] = useState('')
  const [hasMore, setHasMore] = useState(true)

  const GetHealthCodeComplainList = async() =>{
    try {
      const response = await axios.post('/api/GetHealthCodeComplainList', {
        // todo
        token: userToken,
        num: 10,
        offset: complains.length
      })
      console.log(response);
      const data = response.data
      if(data.error !== 0) {
        Toast.show({icon: 'fail', content: `获取失败，错误码${data.error}，错误信息：${data.message}`})
        await new Promise(r => setTimeout(r, 3000));
      } else if(data.content) {
        setComplains([...complains, ...data.content])
        Toast.show({icon: 'success', content: `获取成功`})
      }
      else {
        setHasMore(false)
      }
    } catch (error) {
      console.error(error);
      Toast.show({icon: 'fail', content: `获取失败，网络错误`})
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  const HealthCodeComplain = async() =>{
    const newComplain = {id: nanoid(), datetime: '服务器决定', content: newComplainContent, state: 2, comment: ''}
    try {
      const response = await axios.post('/api/HealthCodeComplain', {
        token: userToken,
        content: newComplainContent
      })
      console.log(response);
      const data = response.data
      if(data.error !== 0) {
        Toast.show({icon: 'fail', content: `申诉失败，错误码${data.error}，错误信息：${data.message}`})
        return false
      } else if(data.id) {
        setComplains([{...newComplain, id: data.id, datetime: data.datetime}, ...complains])
        Toast.show({icon: 'success', content: `申诉成功`})
        return true
      }
    } catch (error) {
      console.error(error);
      Toast.show({icon: 'fail', content: `申诉失败，网络错误`})
      return false
    }
  }

  const buttonMore = (item) => {
    setEditingData(item)
    setEditingNew(false)
    setPopup(true)
    setNewComplainContent('')
  }

  const addTestData = async () => {
    await sleep(1000)
    let num = complains.length
    setComplains([...complains, {...complains[0], id: ++num}])
  }

  useEffect(()=>{
    GetHealthCodeComplainList()
  }, [])

  return (
    <>
      <List header={
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>以下是您的健康码申诉记录</div>
          <Button type="text" style={{padding: '0 15px'}} onClick={() => {
            setEditingData({id: nanoid(), datetime: '', content: '', state: 2, comment: ''})
            setEditingNew(true)
            setPopup(true)
          }}><PlusOutlined/></Button>
        </div>
      } style={{width: '100%'}}>
        {complains.map((item) =>
          <List.Item key={item.id}>
            <HealthCodeComplainCard buttonMore={buttonMore} data={item}/>
          </List.Item>
        )}
      </List>
      <InfiniteScroll loadMore={GetHealthCodeComplainList} hasMore={hasMore} threshold={0}/>
      <Popup
        visible={popup}
        onMaskClick={() => {
          setPopup(false)
        }}
        onClose={() => {
          setPopup(false)
        }}
      >
        <div style={{display: "flex", flexDirection: "column", fontSize: 14, lineHeight: 1.5, margin: "20px 16px"}}>
          {editingNew ?
            <>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold", fontSize: 18}}>申诉详情：</span>
                <Button type="primary" style={{marginLeft: 5, textAlign: "right"}} loading={popupLoading}
                        onClick={async () => {
                          if (editingData.id) {
                            setPopupLoading(true)
                            if(await HealthCodeComplain()) {
                              setPopup(false)
                            }
                            // setComplains([{id: nanoid(), datetime: '服务器决定', content: newComplainContent, state: 2, comment: ''}, ...complains])
                            setPopupLoading(false)
                            // Toast.show({icon: 'success', content: '添加成功'})
                          }
                        }}>保存</Button>
              </div>
              <Divider/>
              <span style={{fontWeight: "bold", marginBottom: 10}}>申诉理由：</span>
              <TextArea placeholder='请输入内容' autoSize={{ minRows: 1, maxRows: 6 }} showCount maxLength={100} onChange={e=>setNewComplainContent(e.target.value)}/>
              [debug]id: {editingData.id}<br/>
            </> :
            <>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold", fontSize: 18}}>申诉详情：</span>
                <Badge count={stateMap[editingData.state]} style={{backgroundColor: colorMap[editingData.state]}}/>
              </div>
              <Divider/>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>申诉时间：</span>
                <span style={{textAlign: "right"}}>{editingData.datetime}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>申诉理由：</span>
                <span style={{textAlign: "right"}}>{editingData.content}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>处理意见：</span>
                <span style={{textAlign: "right"}}>{editingData.comment}</span>
              </div>
              [debug]id: {editingData.id}<br/>
            </>
          }
        </div>
      </Popup>
    </>
  );
}

function HealthCodeComplainCard(props) {
  const data = props.data
  return (
    <Card title={
      <div style={{fontWeight: "bold", fontSize: 20}}>
        申诉结果：
      </div>
    } extra={<Badge count={stateMap[data.state]} style={{backgroundColor: colorMap[data.state]}}/>}
          style={{borderRadius: 16, backgroundColor: "#e5e5e5"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>申诉时间：</span>
        <span style={{textAlign: "right"}}>{data.datetime}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>申诉理由：</span>
        <span style={{textAlign: "right"}}>{data.content}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>处理意见：</span>
        <span style={{textAlign: "right"}}>{data.comment}</span>
      </div>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Button type='link' style={{textAlign: "right", paddingRight: 0}}
                onClick={() => props.buttonMore(data)}>>>>查看详情</Button>
      </div>
      [debug]id: {data.id}<br/>
      注：后期添加文本缩减
    </Card>
  )
}


export default HealthCodeComplain;