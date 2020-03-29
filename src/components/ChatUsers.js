import React from "react";
import {  useSelector  } from 'react-redux'
import { Row, Col, Avatar, Popover } from 'antd'

const ChatUsers = () => {
  const chat = useSelector(state => state.chat)
  const users = chat.get('users').toJS()
  const count = users.length

  return (
    <div style={{}}>
      <div style={{ textAlign: 'center', margin: '5px', fontSize: '15px' }}>当前在线({count})</div>
      {users.map(v => (
        <div className="user">
          <Row  style={{ margin: '5px'  }}>
            <Col span={8} push={2}>
              <Avatar size="large" src={v.avatar} />
            </Col>
            <Col span={12} push={2}>
              <div style={{ padding: '10px 0' }}>{v.name}</div>
            </Col>
          </Row>
        </div>
      ))}
      <style>
        {`
        .user{
          padding: 3px 0px;
          border-radius:20px;
        }
        .user:hover{
          background:#00CCFF;
        }

        `}
      </style>
    </div>
  )
}
export default ChatUsers;
