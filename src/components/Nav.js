import React from 'react'
import { Row, Col, Menu, Dropdown } from 'antd'
import {  BrowserRouter as Router, Link } from 'react-router-dom';

const Nav = () => {
  const defaultMenus = [
    { href: '/', label: 'HOME' },
    { href: '/project', label: 'PROJECTS' },
    { href: '/chat', label: 'CHAT-ROOM' },
    { href: '/about', label:'ABOUT'}
  ]

  return (
    <div>
      <nav >
        <Row type="flex" justfiy="center" style={{ lineHeight: '8vh', backgroundColor: '#fff' }}>
          <Col xs={{span: 16,push:4}} md={{ span:10, push:3 }}  xl={{ span: 7,push:6 }}>
            <Link to="/" style={{ color: 'black', fontSize: '30px' }} >
              <span className="title FS-16 ML-8"  onClick={() => console.info("shi") }>AlenZhang's Blog</span>
            </Link>
          </Col>
          <Col xs={{span: 23,push:1}} md={{span: 10, push:3}} xl={{ span: 5, push:6 }} >
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
    </div>
  )
}
export default Nav
