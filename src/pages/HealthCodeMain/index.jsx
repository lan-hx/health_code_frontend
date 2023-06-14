import React, {useEffect, useState} from 'react';
import {NavBar, PullToRefresh, SafeArea, TabBar} from 'antd-mobile'
import {
  useNavigate, useLocation, BrowserRouter as Router, Navigate, useRoutes,
} from 'react-router-dom'
import {routes, tabs} from "./config";
import styles from "./index.module.css";
import {Affix} from "antd";
import {nanoid} from "nanoid";
import {useCookies} from "react-cookie";
import {setUserToken} from "../../redux/user/userSlice";
import {useDispatch} from "react-redux";

function HealthCodeMain() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch()
  const [height, setHeight] = useState(undefined)
  const updateHeight = () => {
    // 移动端高度自适应
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      const addressBarHeight = window.outerHeight - window.innerHeight;
      setHeight(window.innerHeight - addressBarHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  console.log(styles.app)
  dispatch(setUserToken(cookies.token ?? ''))
  console.log(`get token from cookie: ${cookies.token}`)
  return (<Router initialEntries={['/home']}>
    <div className={styles.app} style={height ? {height: height} : {}}>
      <HealthCodeContent className={styles.content}/>
    </div>
  </Router>)
}

function HealthCodeContent() {
  const navigate = useNavigate()
  const element = useRoutes(routes)

  const [refreshKey, setRefreshKey] = useState('')

  return <>
    <div style={{background: '#ffffff'}}>
      <SafeArea position='top'/>
    </div>
    <Affix offsetTop={0}>
      <div className={styles.top}>
        <NavBar onBack={() => navigate(-1)}>健康码系统</NavBar>
      </div>
    </Affix>
    <PullToRefresh
      style={{overflow: 'auto', touchAction: 'none'}}
      onRefresh={async () => {
        await new Promise(r=>setTimeout(r, 1000))
        setRefreshKey(nanoid())
      }}
    >
      <div key={refreshKey} className={styles.body}>
        {element}
      </div>
    </PullToRefresh>
      <div className={styles.bottom}>
        <Bottom/>
      </div>
    <span className={styles.fakeBottom}></span>
    <div style={{background: '#ffffff'}}>
      <SafeArea position='bottom'/>
    </div>
  </>
}

function Bottom() {
  const navigate = useNavigate()
  const location = useLocation()
  const {pathname} = location

  return (
    <TabBar activeKey={pathname} safeArea={true} onChange={path => navigate(path)}>
      {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon} title={item.title}/>))}
    </TabBar>
  )
}


export default HealthCodeMain;