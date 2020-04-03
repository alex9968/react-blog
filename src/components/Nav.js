import React from 'react'
import { Row, Col } from 'antd'
import {  BrowserRouter as Router, Link } from 'react-router-dom';

const Nav = () => {
  const defaultMenus = [
    { href: '/', label: '首页' },
    { href: '/project', label: '归档' },
    { href: '/chat', label: '聊天室' },
    //{ href: '/about', label:'关于'}
  ]

  return (
    <div>
      <nav >
        <Row type="flex" justfiy="center" style={{ lineHeight: '5vh', backgroundColor: '#fff', marginTop: '10px' }}>
          <Col xs={{span: 16,push:4}} md={{ span:10, push:2 }} lg={{ span: 8, push:5 }}  xl={{ span: 7,push:6 }}>
            <Row>
              <Link to="/" style={{ color: 'black', fontSize: '30px', lineHeight: '100px'  }} >
                <div style={{ lineHeight: '60px' }} className="title FS-16 ML-8"  onClick={() => console.info("shi") }>AlenZhang的博客</div>
                <div style={{ lineHeight: '30px', fontSize: '12px',color: 'grey' }}>Web工程师/全栈开发 -- 专注互联网技术，相信代码改变世界</div>
              </Link>
            </Row>
          </Col>
          <Col xs={{span: 23,push:1}} md={{span: 12, push:2}}  lg={{ span: 10, push:5 }} xl={{ span: 7, push:6 }} >
            <ul className="nav navbar-nav">
              {defaultMenus.map(({ href, label }) => (
                <li className="mega-menu" key={href}>
                  <Link to={href}  className="underline">{label}</Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </nav>
      <style jsx>
        {`
          .title:hover{
            color: grey;
            text-shadow:6px 6px 18px #333333;
          }

          .title{
            text-decoration: none;
            cursor:pointer;
            font-family: "Avenir Next","Avenir","Helvetica Neue",sans-serif;
          }

          .navbar-nav > li {
            float: left;
          }
          .nav > li {
            position: relative;
            display: block;
          }
          .nav {
            padding-left: 0;
            font-size: 16px;
            font-family: "Helvetica Neue",sans-serif;
            margin-bottom: 0;
            list-style: none;
          }


          .navbar {
            margin-bottom: 0px;
            border: 0px;
            font-weight: 300;
          }

          .nav .open a,
          .nav li a:hover,
          .nav li a:focus {
            color: grey;
            text-shadow:6px 6px 18px #333333;
            text-decoration: none;
            background-color: transparent;
          }
          .nav .mega-menu {
            position: relative;
          }

          .nav > li > a {
            position: relative;
            display: block;
            padding: 10px 15px;
          }
          .underline {
            position: relative;
            text-decoration: none;
            color: currentColor;
          }
          .underline::after {
            content: '';
            position: absolute;
            top: 70%;
            background-color: currentColor;
            transform: scale(0);
            transition: all 0.35s;
          }
          .underline::after {
            width: 100%;
            height: 1px;
            left: 0;
          }
          `}
      </style>
    </div>
  )
}
export default Nav
