import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./index.module.css";
import {Tabs} from "antd-mobile";
import {tabItems, tabMap} from "./config";
import {Affix} from "antd";
import {useLocation} from "react-router-dom";

Information.propTypes = {};

function Information(props) {
  const location = useLocation()
  const state = location.state

  const [activeKey, setActiveKey] = useState(state?.key ?? 'test')

  return (
    <div style={{width: "100%"}}>
      <Affix offsetTop={45} style={{zIndex: 1}}>
        <Tabs activeKey={activeKey} onChange={key => setActiveKey(key)} style={{backgroundColor: 'white'}}>
          {tabItems.map(item => (
            <Tabs.Tab title={item.title} key={item.key}></Tabs.Tab>
          ))}
        </Tabs>
      </Affix>
      {tabMap[activeKey] ? tabMap[activeKey] : null}
    </div>
  );
}

export default Information;