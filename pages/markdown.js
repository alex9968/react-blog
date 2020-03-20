import React from 'react'
import { Row, Col } from 'antd'
import JoinMd from '../static/md/join.md'

export default () => (
  <div>
    <Row className="PB-20 pf-l">
      <Col md={{ span: 16, push: 4 }} xs={24} sm={{ span: 16, push: 4 }}>
        <div>
          <div style={{ margin: '0 30%' }}className="MT-10" dangerouslySetInnerHTML={{ __html: JoinMd.html }} />
        </div>
      </Col>
    </Row>
  </div>
)
