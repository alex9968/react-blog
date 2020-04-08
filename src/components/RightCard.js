import React from 'react'
import { Row } from 'antd'

export default ({children, title}) => {
  return (
    <div>
      <Row style={{ marginTop:'20px', background: '#fff'}}>
        { title ? (
          <div style={{ textAlign: 'left',margin: '10px 20px',  paddingBottom: '10px', borderBottom: '1px solid lightgrey', width:'-webkit-fill-available' }}>
            <b>{title}</b>
          </div>
        ) : ( <div /> )}
        <div style={{ margin: '0px 20px 20px 20px', overflow: 'hidden', width: '-webkit-fill-available' }}>
          {children}
        </div>
      </Row>
    </div>
  )
}
