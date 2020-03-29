import React, { useEffect, useState } from "react";
import I from 'immutable'
import { connect, sendMsg } from "../http/websocket";
import ChatHistory from '../components/ChatHistory';
import ChatUsers from '../components/ChatUsers';
import { Input, Button, Row, Col } from 'antd'
import { useDispatch, useSelector  } from 'react-redux'
import { chatSetIn, addUser, delUser, updateMsg } from '../redux/modules/chat'

const Chat = () => {
  const dispatch = useDispatch()
  const chat = useSelector(state => state.chat)
  const message = chat.get('message')
  const history = chat.get('history').toJS()
  const users = chat.get('users').toJS()
  console.info('history',history)
  console.info('userList',users)

  //const [chatHistory, setChatHistory] = useState([]);

  useEffect(() =>{
    connect((msg) => {
      let data  = JSON.parse(msg.data)
      let userText = I.fromJS({id: data.cid, name:data.name, avatar: data.avatar})
      let msgText = I.fromJS(data)
      if(data.type === 2) {
          dispatch(addUser(userText))
      } else if(data.type === 3) {
          dispatch(delUser(userText))
      } else {
        dispatch(updateMsg(msgText))
      }
      //setChatHistory([...chatHistory, msg])
    });
  })

  const send = () => {
    sendMsg(message);
    dispatch(chatSetIn(['message'],''))
  }

  return (
    <div className="App">
      <div>聊天室</div>
      <Row>
        <Col span={18}><ChatHistory /></Col>
        <Col span={6}><ChatUsers /></Col>
      </Row>
      <Row style={{  }}>
        <Input className="send"
          value={message} 
          onChange={e => dispatch(chatSetIn(['message'],e.target.value)) }
          onKeyPress={e => e.key === 'Enter' ? send() : console.info('s') }
        />
        <Button type="primary"  className="send-btn" onClick={() => send() }>发送</Button>
      </Row>
      <style jsx>
        {`
        .send{
          width: 80%;
            border-radius:25px;
            border: 1px solid #FEAE1B;
          }
          .send-btn{
            margin: 0 15px;
            background:#FEAE1B;
            color: #fff;
            padding:5px 20px;
            width:auto;
            border-radius:25px;
            border: 1px solid #FEAE1B;
          }
          .send-btn:hover{
            background:#FDBF2B;
            border: 1px solid #FEAE1B;
          }

        `}
      </style>
    </div>
  );
}
export default Chat


