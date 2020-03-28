import React, { useState } from 'react'
import { Row, Col } from 'antd'
//const  support = '../static/imgs/support.png'
const  support= 'http://qiniu.dreamma.vip/support.png'
//{React.cloneElement(props.children, { })}
export const Layout = (props) =>{
  return(
    <Row style={{ minHeight: '88vh', marginTop: '2%' }}>
      <Col xs={{span: 22,push:1}}  md={{span: 15, push:2}} lg={{span:14, push: 3}} xl={{ span: 12, push:4 }} style={{ borderTop:'1px solid lightgrey' }} >
        {props.children}
      </Col>
      <Col xs={{span: 22,push:1}} md={{span: 5, push:2}} lg={{span:4, push: 3}} xl={{ span: 4, push:4 }} 
        style={{ borderTop:'1px solid lightgrey', borderLeft:'1px solid lightgrey' }}>
        <Row style={{ margin:'20px 0px 20px 20px'}}>
          <div style={{ textAlign: 'left',padding: '10px',marginBottom: '10px', borderBottom: '1px solid lightgrey', width:'-webkit-fill-available' }}>微信扫码支持一下</div>
          <img style={{ width:'-webkit-fill-available' }} src={support} alt="support" />
        </Row>
        <Row style={{ margin:'20px 0px 20px 20px'}}>
          <div style={{ textAlign: 'left',padding: '10px',marginBottom: '10px', borderBottom: '1px solid lightgrey', width:'-webkit-fill-available' }}>最新文章</div>
          <div>shi</div>

        </Row>
        <Row style={{ margin:'20px 0px 20px 20px'}}>
          <div style={{ textAlign: 'left',padding: '10px',marginBottom: '10px', borderBottom: '1px solid lightgrey', width:'-webkit-fill-available' }}>标签分类</div>
          <div>shi</div>
        </Row>

      </Col>
      <style jsx>
        {`
      .support{
        background-repeat: no-repeat;
        background-size: cover;
      }

      `}
      </style>
    </Row>
  )

}

export const Layout2 = (props) =>(
  <Row style={{ minHeight: '88vh', marginTop: '2%' }}>
    <Col xs={{span: 22,push:1}}  md={{span: 18, push:3}} lg={{span:14, push: 5}} xl={{ span: 12, push:6 }} style={{ borderTop:'1px solid lightgrey' }} >
      {props.children}
    </Col>
  </Row>
)
