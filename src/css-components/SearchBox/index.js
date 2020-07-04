import React from 'react'
import { SearchOutlined  } from '@ant-design/icons'
import './index.scss'


const Index =({data}) => {
  return (
    <div className="search-box">
      <input className="search-box-text" type="text" placeholder="Type to search" />
      <a className="search-box-btn" href="http://baidu.com">
        <SearchOutlined />
      </a>
    </div>
  )
}
export default Index


		

  
