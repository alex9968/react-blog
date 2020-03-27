import React from 'react'
import { Col, Row } from 'antd'
import { Link} from 'react-router-dom';
import { getDay } from '../utils/time'
import Tag from './Tag'

const ArticleCard =({data}) => {
  const {id, text, title,created_at} = data;
  return (
    <div className="main">
      <Link to={{ pathname: `/article/${id}` , query : {   } }}>
        <Row><h2 className="font">{title}</h2></Row>
        <Row>
          <Col span={4}>
            <span style={{ color: 'grey' }}>{getDay(created_at)}</span>
          </Col>
          <Col span={20}><Tag tag="Golang"/></Col>
        </Row>
        <Row style={{ marginTop: '10px' }}><p className="info">{text}</p></Row>
        <style jsx>
          {`
        .main {
          border-bottom: 1px solid lightgrey;
          background-color: #fff;
          padding: 20px 20px;
          margin: 1px 0px 0px 0px;
        }
        .font{
          font-family: "Iowan Old Style", "Ovo", "Hoefler Text", Georgia, "Times New Roman", "TIBch", "Source Han Sans", "PingFangSC-Regular", "Hiragino Sans GB", "STHeiti", "Microsoft Yahei", "Droid Sans Fallback", "WenQuanYi Micro Hei", sans-serif;
          font-size: 22px;

        }
        .main:hover{
          border-bottom: 2px solid transparent;
          border-top: 2px solid transparent;
          box-shadow: 0 3px 15px rgba(0,0,0,.2)

        }
        @media screen and (max-width: 2000px) {
          .info{
          }
        }

        @media screen and (max-width: 400px) {
          .info{
            font-size: 10px;
          }
        }
        `}
        </style>
      </Link>
    </div>
  )
}
export default ArticleCard

