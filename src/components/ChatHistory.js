import React from "react";
import {  useSelector  } from 'react-redux'
import { Row, Col, Avatar, Popover } from 'antd'

const ChatHistory = () => {
  const chat = useSelector(state => state.chat)
  const history = chat.get('history').toJS()

  return (
    <div className=''>
      <h2>Chat History</h2>
      {history.map(v => (
        <div style={{  margin: '20px 0px' }}>
          <Row>
            <Col>
              <Popover
                content={<div style={{  }}>{v.body}</div>}
                style={{ background:'grey' }}
                placement="right"
                visible={true}
              >
                <Row><Avatar size="large" src={v.avatar} /></Row>
                <Row><span style={{ fontSize: '10px' }}>{v.name}</span></Row>
              </Popover>
            </Col>
          </Row>
        </div>
      ))}
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
