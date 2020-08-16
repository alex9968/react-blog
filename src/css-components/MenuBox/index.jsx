import React from 'react'
import './index.scss'


const Index =({data}) => {
  return (
    <div className="menu-box">
      <div className="nav">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <div className="menu">
          <li><a href="/">home</a></li>
          <li><a href="/project">project</a></li>
          <li><a href="/chat">chat</a></li>
        </div>
      </div>
    </div>
  )
}
export default Index


