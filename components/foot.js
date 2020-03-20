import React from 'react'
import { Row, Col, Layout  } from 'antd'
import { grey  } from '@ant-design/colors'
const Beian = '/static/police-badge.png'

const Foot = () =>{
  return(
    <Layout.Footer  style={{ textAlign: 'center' ,background:'#fff', fontSize: '14px'}}>
      <Row>
        <Col md={24} className="TA-C">
          <a href="http://www.beian.gov.cn/portal" className="">
            <img alt="" src={Beian} height="20" />
            <span style={{color: '#black'}}> 赣ICP备19004617号-1</span>
          </a>
        </Col>
        <Col md={24} className="TA-C">
          <span className="FS-6" style={{color:'#grey'}}>© Copyright 2007 - 2020 by AlenZhang</span>
        </Col>
      </Row>
    </Layout.Footer>
  )
}

export default Foot;


