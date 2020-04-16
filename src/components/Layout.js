import React from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Input, Popover } from 'antd'
import RightCard from './RightCard'
import Latest from './Latest'
import Category from './Category'
import { viewSetIn } from '../redux/modules/view'
import  { GithubOutlined, WechatOutlined, MoneyCollectOutlined } from '@ant-design/icons'
const { Search  } = Input
const  wechat = 'http://qiniu.dreamma.vip/wechat.png'
const  support= 'http://qiniu.dreamma.vip/support.png'
//{React.cloneElement(props.children, { })}
export const Layout = (props) =>{
  const dispatch = useDispatch()
  const setSearchText = (text) => {
    dispatch(viewSetIn(['searchQuery'], text))
  }

  return(
    <Row  style={{ minHeight: '88vh', background: '#ebebeb' }}>
      <Col xs={{span: 22,push:1}}  md={{span: 15, push:2}} lg={{span:15, push: 2}} xl={{ span: 13, push:4 }} xxl={{ span: 11, push:5 }} style={{ margin: '20px 20px 0 0' }} >
        {props.children}
      </Col>
      <Col xs={{span: 22,push:1}} md={{span: 5, push:2}} lg={{span:5, push: 2}} xl={{ span: 4, push:4 }} xxl={{ span: 4, push:5 }}>
        {/* 搜索框 */}
        <Row style={{ marginTop: '20px' }}>
          <Search placeholder="搜索..." size="large" onSearch={value => setSearchText(value)} />
        </Row>

        {/* 个人资料 */}
        <RightCard>
          <div style={{ width: '-webkit-fill-available' }}>
            <div className="avatar">
              <img src="http://qiniu.dreamma.vip/alen.jpg" alt="avatar" />
            </div>
            <Row  justify="space-around" style={{ margin: '0 30px' }}>
              <Col span={4}>
                <a href="https://github.com/alen9968" style={{ color: '#595959' }}>
                  <GithubOutlined className="icons"/>
                </a>
              </Col>
              <Col span={4}>
                <Popover content={<div><img className="wechat" src={wechat} alt=""/></div>} trigger="hover" placement="bottom">
                  <WechatOutlined className="icons"/>
                </Popover>
              </Col>

              <Col span={4}>
                <Popover content={<div><img className="wechat" src={support} alt=""/></div>} trigger="hover" placement="bottom">
                  <MoneyCollectOutlined className="icons"/>
                </Popover>
              </Col>
            </Row>
          </div>
        </RightCard>

        <RightCard title="最新更新">
          <Latest />
        </RightCard>

        <RightCard title="标签分类">
          <Category />
        </RightCard>



        <RightCard title="友情链接">
          <div><a className="link" href="https://ant.design/index-cn">Antd Design</a></div>
          <div><a className="link" href="https://www.liwenzhou.com/">李文周的博客</a></div>
        </RightCard>

      </Col>
      <style jsx>
        {`
      .support{
        background-repeat: no-repeat;
        background-size: cover;
      }
      .link{
        color: grey;
      }
      .avatar img{
        border-radius: 50%;
        height: 90px;
        width: 90px;
        padding: 5px;
        background-color: #e7f7ff;
        border: 1px solid #1890ff;
      }
      .avatar{
        text-align: center;
        margin-top: 20px;
        margin-bottom: 40px;
      }
      .icons{
        font-size: 25px;
        text-align: center;
      }
      .wechat{
        height: 200px;
        width: 200px;
        margin: -10px;
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
