import React, { Component, useEffect, useState } from "react";
import { connect, sendMsg } from "../http/websocket";
import ChatHistory from '../components/ChatHistory';
import ChatInput from '../components/ChatInput/ChatInput';
import { Input, Button, Row, Col } from 'antd'
import { useDispatch, useSelector  } from 'react-redux'
import { viewMergeIn,viewSetIn   } from '../redux/modules/view'

const Chat = () => {
  const dispatch = useDispatch()
  const view = useSelector(state => state.view)
  const message = view.get('message')
  console.log(message)

  const [chatHistory, setChatHistory] = useState([]);
  //const [message, setMessage] = useState('');
  useEffect(() =>{
    connect((msg) => {
      console.info("msg long:", msg)
      setChatHistory([...chatHistory, msg])
    });
  })

  const send = () => {
    sendMsg(message);
    dispatch(viewSetIn(['message'],''))
  }

  return (
    <div className="App">
      <ChatHistory chatHistory={chatHistory} />
      <Row style={{  }}>
        <Input style={{ width: '120px', marginTop: '65px'  }} 
          value={message} 
          onChange={e => dispatch(viewSetIn(['message'],e.target.value)) }  
          onKeyPress={e => e.key === 'Enter' ? send() : console.info('s') }
        />
        <Button type="primary"  style={{ marginTop: '30px'  }} onClick={() => send() }>发送</Button>
      </Row>
    </div>
  );
}
export default Chat


