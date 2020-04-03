import React, { useEffect, useState } from "react";
import I from 'immutable'
import { connect, sendMsg } from "../http/websocket";
import ChatHistory from '../components/ChatHistory';
import ChatUsers from '../components/ChatUsers';
import { Input, Button, Row, Col } from 'antd'
import { useDispatch, useSelector  } from 'react-redux'
import { chatSetIn, addUser, delUser, addMsg } from '../redux/modules/chat'

const Chat = () => {
  const dispatch = useDispatch()
  const chat = useSelector(state => state.chat)
  const messageInput = chat.get('message')
  const self = chat.get('self')
  const history = chat.get('history').toJS()
  const users = chat.get('users').toJS()
  console.info('history',history)
  console.info('userList',users)

  //const [chatHistory, setChatHistory] = useState([]);

  useEffect(() =>{
    connect((msg) => {
      let data  = JSON.parse(msg.data)
      let userText = {}
      userText[data.cid] = {cid: data.cid, name:data.name, avatar: data.avatar}
      userText = I.fromJS(userText)
      //userText.set('key', userText.get('id'))
      console.info( "New status:",userText.toJS())

      
      if(data.message === "Login..."){
        if (chat.getIn(['self','cid']) === '') { //自己登录
          dispatch(chatSetIn(['self', 'cid'], data.cid))
          dispatch(chatSetIn(['self','name'], data.name))
          dispatch(chatSetIn(['self','avatar'], data.avatar))
          console.info("Add new user::", userText.toJS())
          dispatch(addUser(userText))

          let msgText = { }
          msgText[data.cid] = { mid: data.cid, body: data }
          msgText = I.fromJS(msgText)
          console.info("Add new hello:", msgText.toJS())
          dispatch(addMsg(msgText))
        } else{ //别人登录
          console.log("有人登录了")
          dispatch(addUser(userText))

          let msgText = { }
          msgText[data.cid] = { mid: data.cid, body: data }
          msgText = I.fromJS(msgText)
          console.info("Add new hello:", msgText.toJS())
          dispatch(addMsg(msgText))
        }
      }

      //用户退出
      if(data.message === "Logout..." ) {
        if(chat.getIn(['self','cid']) === data.cid)//自己退出
        dispatch(chatSetIn(['self', 'cid'], ''))
        dispatch(chatSetIn(['self','name'], ''))
        dispatch(chatSetIn(['self','avatar'], ''))
        dispatch(delUser(data.cid))

        let msgText = { }
        msgText[data.cid] = { mid: data.cid, body: data }
        msgText = I.fromJS(msgText)
        console.info("New come out:", msgText.toJS())
        dispatch(addMsg(msgText))
      } else {     //别人退出
        console.log("有人退出了")
        dispatch(delUser(data.cid))

        let msgText = { }
        msgText[data.cid] = { mid: data.cid, body: data }
        msgText = I.fromJS(msgText)
        console.info("New come out:", msgText.toJS())
        dispatch(addMsg(msgText))
      }

      //普通消息
      if(data.type === 1){
        let msgText = { }
        msgText[data.mid] = data
        msgText = I.fromJS(msgText)

        dispatch(addMsg(msgText))
      }
      //setChatHistory([...chatHistory, msg])
    });
  })

  const send = () => {
    let data = self.toJS()
    data.message = messageInput
    data.created_at = null
    sendMsg(JSON.stringify(data));
    dispatch(chatSetIn(['message'],''))
  }

  return (
    <div className="App">
      <Row style={{ height: '60vh', border: '1px solid lightgrey'  }}>
        <Col span={18}>
          <Row style={{ height: '53vh', margin: '0 10px' }}><ChatHistory /></Row>
          <Row style={{ margin: '25px'  }}>
            <div style={{ margin: '0 auto' }}>
              <Input className="send"
                value={messageInput} 
                onChange={e => dispatch(chatSetIn(['message'],e.target.value)) }
                onKeyPress={e => e.key === 'Enter' ? send() : console.info('s') }
              />
              <Button type="primary"  className="send-btn" onClick={() => send() }>发送</Button>
            </div>
          </Row>
        </Col>
        <Col span={6} style={{ height: '60vh', borderLeft: '1px solid lightgrey' }}>
          <ChatUsers />
        </Col>
      </Row>
      <style jsx>
        {`
        .send{
            width: 300px;
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


