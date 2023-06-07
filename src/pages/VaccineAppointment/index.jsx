import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Card, InfiniteScroll, List, Picker, Popup, Toast} from "antd-mobile";
import {Badge, Button, Divider, Input} from "antd";
import {sleep} from "antd-mobile/es/utils/sleep";
import {nanoid} from "nanoid";
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

VaccineAppointment.propTypes = {};

const dateColumns = [
  [
    {label: '一月', value: '1'},
    {label: '二月', value: '2'},
    {label: '三月', value: '3'},
    {label: '四月', value: '4'},
    {label: '五月', value: '5'},
    {label: '六月', value: '6'},
    {label: '七月', value: '7'},
    {label: '八月', value: '8'},
    {label: '九月', value: '9'},
    {label: '十月', value: '10'},
    {label: '十一月', value: '11'},
    {label: '十二月', value: '12'}
  ],
  [
    {label: '1日', value: '1'},
    {label: '2日', value: '2'},
    {label: '3日', value: '3'},
    {label: '4日', value: '4'},
    {label: '5日', value: '5'},
    {label: '6日', value: '6'},
    {label: '7日', value: '7'},
    {label: '8日', value: '8'},
    {label: '9日', value: '9'},
    {label: '10日', value: '10'},
    {label: '11日', value: '11'},
    {label: '12日', value: '12'},
    {label: '13日', value: '13'},
    {label: '14日', value: '14'},
    {label: '15日', value: '15'},
    {label: '16日', value: '16'},
    {label: '17日', value: '17'},
    {label: '18日', value: '18'},
    {label: '19日', value: '19'},
    {label: '20日', value: '20'},
    {label: '21日', value: '21'},
    {label: '22日', value: '22'},
    {label: '23日', value: '23'},
    {label: '24日', value: '24'},
    {label: '25日', value: '25'},
    {label: '26日', value: '26'},
    {label: '27日', value: '27'},
    {label: '28日', value: '28'},
    {label: '29日', value: '29'},
    {label: '30日', value: '30'},
    {label: '31日', value: '31'}
  ]
]

const timeColumns = [
  [
    {label: '0时', value: '0'},
    {label: '1时', value: '1'},
    {label: '2时', value: '2'},
    {label: '3时', value: '3'},
    {label: '4时', value: '4'},
    {label: '5时', value: '5'},
    {label: '6时', value: '6'},
    {label: '7时', value: '7'},
    {label: '8时', value: '8'},
    {label: '9时', value: '9'},
    {label: '10时', value: '10'},
    {label: '11时', value: '11'},
    {label: '12时', value: '12'},
    {label: '13时', value: '13'},
    {label: '14时', value: '14'},
    {label: '15时', value: '15'},
    {label: '16时', value: '16'},
    {label: '17时', value: '17'},
    {label: '18时', value: '18'},
    {label: '19时', value: '19'},
    {label: '20时', value: '20'},
    {label: '21时', value: '21'},
    {label: '22时', value: '22'},
    {label: '23时', value: '23'},
    {label: '24时', value: '24'}
  ],
  [
    {label: '0分', value: '0'},
    {label: '1分', value: '1'},
    {label: '2分', value: '2'},
    {label: '3分', value: '3'},
    {label: '4分', value: '4'},
    {label: '5分', value: '5'},
    {label: '6分', value: '6'},
    {label: '7分', value: '7'},
    {label: '8分', value: '8'},
    {label: '9分', value: '9'},
    {label: '10分', value: '10'},
    {label: '11分', value: '11'},
    {label: '12分', value: '12'},
    {label: '13分', value: '13'},
    {label: '14分', value: '14'},
    {label: '15分', value: '15'},
    {label: '16分', value: '16'},
    {label: '17分', value: '17'},
    {label: '18分', value: '18'},
    {label: '19分', value: '19'},
    {label: '20分', value: '20'},
    {label: '21分', value: '21'},
    {label: '22分', value: '22'},
    {label: '23分', value: '23'},
    {label: '24分', value: '24'},
    {label: '25分', value: '25'},
    {label: '26分', value: '26'},
    {label: '27分', value: '27'},
    {label: '28分', value: '28'},
    {label: '29分', value: '29'},
    {label: '30分', value: '30'},
    {label: '31分', value: '31'},
    {label: '32分', value: '32'},
    {label: '33分', value: '33'},
    {label: '34分', value: '34'},
    {label: '35分', value: '35'},
    {label: '36分', value: '36'},
    {label: '37分', value: '37'},
    {label: '38分', value: '38'},
    {label: '39分', value: '39'},
    {label: '40分', value: '40'},
    {label: '41分', value: '41'},
    {label: '42分', value: '42'},
    {label: '43分', value: '43'},
    {label: '44分', value: '44'},
    {label: '45分', value: '45'},
    {label: '46分', value: '46'},
    {label: '47分', value: '47'},
    {label: '48分', value: '48'},
    {label: '49分', value: '49'},
    {label: '50分', value: '50'},
    {label: '51分', value: '51'},
    {label: '52分', value: '52'},
    {label: '53分', value: '53'},
    {label: '54分', value: '54'},
    {label: '55分', value: '55'},
    {label: '56分', value: '56'},
    {label: '57分', value: '57'},
    {label: '58分', value: '58'},
    {label: '59分', value: '59'}
  ]
]

const kindColumns = [
  [
    {label: '科兴', value: '科兴'},
    {label: '北京生物', value: '北京生物'}
  ]
]

const addressColumns = [
  [
    {label: '校医院', value: '校医院'},
    {label: '火星', value: '火星'}
  ]
]

const test_data = [
  {id: '1', datetime: '2023-11-11 11:11:11', kind: '科兴', address: '校医院'},
  {
    id: '2',
    datetime: '2023-11-11 11:11:11',
    kind: '北京生物',
    address: '火星'
  },
]

function VaccineAppointment(props) {
  const [vapps, setVapps] = useState(test_data)
  const [popup, setPopup] = useState(false)
  const [editingData, setEditingData] = useState({})
  const [editingNew, setEditingNew] = useState(false)
  const [popupLoading, setPopupLoading] = useState(false)
  const [newComplainContent, setNewComplainContent] = useState('')
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [timePickerVisible, setTimePickerVisible] = useState(false)
  const [datePickerValue, setDatePickerValue] = useState([])
  const [timePickerValue, setTimePickerValue] = useState([])
  const [kindPickerVisible, setKindPickerVisible] = useState(false)
  const [kindPickerValue, setKindPickerValue] = useState([])
  const [addressPickerVisible, setAddressPickerVisible] = useState(false)
  const [addressPickerValue, setAddressPickerValue] = useState([])

  const buttonMore = (item) => {
    setEditingData(item)
    setEditingNew(false)
    setPopup(true)
    setNewComplainContent('')
  }

  const addTestData = async () => {
    await sleep(1000)
    let num = vapps.length
    setVapps([...vapps, {...vapps[0], id: ++num}])
  }

  return (
    <>
      <List header={
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>以下是您的疫苗接种预约记录</div>
          <Button type="text" style={{padding: '0 15px'}} onClick={() => {
            setEditingData({id: nanoid(), datetime: '', content: '', state: 2, comment: ''})
            setEditingNew(true)
            setPopup(true)
          }}><PlusOutlined/></Button>
        </div>
      } style={{width: '100%'}}>
        {vapps.map((item) =>
          <List.Item key={item.id}>
            <VaccineAppointmentCard buttonMore={buttonMore} data={item}/>
          </List.Item>
        )}
      </List>
      <InfiniteScroll loadMore={addTestData} hasMore={true}/>
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
                            // check
                            if(datePickerValue[0] && datePickerValue[1] && timePickerValue[0] && timePickerValue[1] && kindPickerValue[0] && addressPickerValue[0]) {
                              await new Promise(r => setTimeout(r, 1000));
                              setVapps([{
                                id: nanoid(),
                                datetime: `2023-${dateColumns[0][datePickerValue[0]-1].value.toString().padStart(2, '0')}-${dateColumns[1][datePickerValue[1]-1].value.toString().padStart(2, '0')} ${timeColumns[0][timePickerValue[0]].value.toString().padStart(2, '0')}:${timeColumns[1][timePickerValue[1]].value.toString().padStart(2, '0')}`,
                                kind: kindPickerValue,
                                address: addressPickerValue,
                              }, ...vapps])
                              setPopupLoading(false)
                              Toast.show({icon: 'success', content: '添加成功'})
                              setPopup(false)
                            } else {
                              setPopupLoading(false)
                              Toast.show({icon: 'fail', content: '您的表单未完成'})
                            }
                          }
                        }}>保存</Button>
              </div>
              <Divider/>
              <div style={{display: "flex", alignItems:"center"}}>
                <span style={{fontWeight: "bold"}}>请选择日期：&nbsp;</span>
                <Button onClick={() => setDatePickerVisible(true)}>
                  {datePickerValue[0] && datePickerValue[1] ? dateColumns[0][datePickerValue[0] - 1].label + dateColumns[1][datePickerValue[1] - 1].label : '选择日期'}
                </Button>
                <Picker columns={dateColumns} visible={datePickerVisible} onClose={() => setDatePickerVisible(false)}
                        value={datePickerValue} onConfirm={v => setDatePickerValue(v)}/>
                <Button onClick={() => setTimePickerVisible(true)}>
                  {timePickerValue[0] && timePickerValue[1] ? timeColumns[0][timePickerValue[0]].label + timeColumns[1][timePickerValue[1]].label : '选择时间'}
                </Button>
                <Picker columns={timeColumns} visible={timePickerVisible} onClose={() => setTimePickerVisible(false)}
                        value={timePickerValue} onConfirm={v => setTimePickerValue(v)}/>
              </div>
              <div style={{display: "flex", alignItems:"center"}}>
                <span style={{fontWeight: "bold"}}>请选择种类：&nbsp;</span>
                <Button onClick={() => setKindPickerVisible(true)}>
                  {kindPickerValue[0] ?? '选择疫苗种类'}
                </Button>
                <Picker columns={kindColumns} visible={kindPickerVisible} onClose={() => setKindPickerVisible(false)}
                        value={kindPickerValue} onConfirm={v => setKindPickerValue(v)}/>
              </div>
              <div style={{display: "flex", alignItems:"center"}}>
                <span style={{fontWeight: "bold"}}>请选择接种地点：&nbsp;</span>
                <Button onClick={() => setAddressPickerVisible(true)}>
                  {addressPickerValue[0] ?? '选择接种地点'}
                </Button>
                <Picker columns={addressColumns} visible={addressPickerVisible} onClose={() => setAddressPickerVisible(false)}
                        value={addressPickerValue} onConfirm={v => setAddressPickerValue(v)}/>
              </div>
              {/*<span style={{fontWeight: "bold", marginBottom: 10}}>申诉理由：</span>*/}
              {/*<TextArea placeholder='请输入内容' autoSize={{minRows: 1, maxRows: 6}} showCount maxLength={100}*/}
              {/*          onChange={e => setNewComplainContent(e.target.value)}/>*/}
              [debug]id: {editingData.id}<br/>
            </> :
            <>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold", fontSize: 18}}>预约结果：</span>
                <Badge count={'预约成功'} style={{backgroundColor: '#52c41a'}}/>
              </div>
              <Divider/>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>预约接种时间：</span>
                <span style={{textAlign: "right"}}>{editingData.datetime}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>接种地点：</span>
                <span style={{textAlign: "right"}}>{editingData.address}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>疫苗种类：</span>
                <span style={{textAlign: "right"}}>{editingData.kind}</span>
              </div>
              <Divider/>
              <span style={{fontWeight: "bold", fontSize: 18}}>疫苗接种点信息：</span>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>地址：</span>
                <span style={{textAlign: "right"}}>111</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>经纬度：</span>
                <span style={{textAlign: "right"}}>111</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>开放时间：</span>
                <span style={{textAlign: "right"}}>周一到周五 9:00-21:00</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{fontWeight: "bold"}}>联系方式：</span>
                <span style={{textAlign: "right"}}>213212213</span>
              </div>
              [debug]id: {editingData.id}<br/>
            </>
          }

        </div>
      </Popup>
    </>
  );
}

function VaccineAppointmentCard(props) {
  const data = props.data
  return (
    <Card title={
      <div style={{fontWeight: "bold", fontSize: 20}}>
        预约结果：
      </div>
    } extra={<Badge count={'预约成功'} style={{backgroundColor: '#52c41a'}}/>}
          style={{borderRadius: 16, backgroundColor: "#e5e5e5"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>预约接种时间：</span>
        <span style={{textAlign: "right"}}>{data.datetime}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>接种地点：</span>
        <span style={{textAlign: "right"}}>{data.address}</span>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>疫苗种类：</span>
        <span style={{textAlign: "right"}}>{data.kind}</span>
      </div>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Button type='link' style={{textAlign: "right", paddingRight: 0}}
                onClick={() => props.buttonMore(data)}>>>>查看详情</Button>
      </div>
      [debug]id: {data.id}<br/>
    </Card>
  )
}


export default VaccineAppointment;