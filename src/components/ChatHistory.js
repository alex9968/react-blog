import React from "react";
import {  useSelector  } from 'react-redux'
import { Row, Col, Avatar, Popover } from 'antd'

const ChatHistory = () => {
  const chat = useSelector(state => state.chat)
  const cid = chat.getIn(['self', 'cid'])
  const history = chat.get('history').toList().toJS()



  return (
    <div className=''>
      <Row style={{ textAlign: 'center', margin: '5px 200px ', fontSize: '15px' }}><span>欢迎加入聊天室</span></Row>
      <div>
        {history.map(v =>{
          let message = v.body.message
          if(message === "Login..."){
            message = `Hello, 大家好，我是${v.body.name}`
          } else if (message === "Logout..."){
            message = `${v.body.name} 已离开聊天!`
          }
          if( v.body.cid ===  cid ){
            return (
              <Row style={{  margin: '20px 0px' }} key={v.mid}>
                <Col span={4} push={20} style={{ padding: "0 10px" }}>
                  <Popover
                    content={<div style={{  }}>{message}</div>}
                    style={{ background:'grey' }}
                    placement="left"
                    visible={true}
                  >
                    <Row><Avatar size="large" src={v.body.avatar} /></Row>
                    <Row><span style={{ fontSize: '10px' }}>{v.body.name}</span></Row>
                  </Popover>
                </Col>
              </Row>
            )
          } else {
            return (
              <Row style={{  margin: '20px 0px' }} key={v.mid}>
                <Col span={4}  style={{ padding: "0 10px" }}>
                    <Popover
                      content={<div style={{  }}>{message}</div>}
                      style={{ background:'grey' }}
                      placement="right"
                      visible={true}
                    >
                      <Row><Avatar size="large" src={v.body.avatar} /></Row>
                      <Row><span style={{ fontSize: '10px' }}>{v.body.name}</span></Row>
                    </Popover>
                  </Col>
              </Row>
            )


          }
        } )}
      </div>
      <style>
        {`
        .text{
            background:grey;
            padding:5px 20px;
            width:auto;
            border-radius:25px;
          }
          .send-btn:hover{
            background:#FDBF2B;
            border: 1px solid #FEAE1B;
          }



        }


        `}
      </style>
    </div>
  )
}
export default ChatHistory;
