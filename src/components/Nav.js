import React from 'react'
import { Row, Col, Menu, Dropdown } from 'antd'
//import { Link,  BrowserRouter as Router,Route} from 'react-router-dom';

const Nav = () => {
  const defaultMenus = [
    { href: '/index', label: 'HOME' },
    { href: '/project', label: 'PROJECTS' },
    { href: '/chat', label: 'CHAT-ROOM' },
    { href: '/about', label:'ABOUT'}
  ]

  const menuList = () => {
    return (
      <ul className="nav navbar-nav">
          {defaultMenus.map(({ href, label }) => (
            <li className="mega-menu" key={href}>
                <a href={href}  className="underline">{label}</a>
            </li>
          ))}
          <style jsx>
            {`
          .navbar-nav > li {
            float: left;
          }
          .nav > li {
            position: relative;
            display: block;
          }
          .nav {
            padding-left: 0;
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
          .underline:hover::after {
            transform: scale(1);
            transform-origin: left;
          }
        `}
          </style>
      </ul>
    )
  }

  return (
    <div>
      <nav >
        <Row style={{ lineHeight: '8vh', backgroundColor: '#fff' }}>
          <Col xs={{ span: 10, push: 2 }} xl={{ span: 6, push: 4 }}>
            <span className="title FS-16 ML-8"  onClick={() => console.info("shi") }>AlenZhang's Blog</span>
          </Col>
          <Col xs={{ span: 8, push: 8 }} xl={{ span: 6, push: 10 }} >
            {menuList()}
          </Col>
        </Row>
      </nav>
      <style jsx>
        {`
          .title:hover{
            color: grey;
          }
          .title{
            text-decoration: none;
            cursor:pointer;
            font-family: "Avenir Next","Avenir","Helvetica Neue",sans-serif;
          }
          `}
      </style>
    </div>
  )
}
export default Nav
