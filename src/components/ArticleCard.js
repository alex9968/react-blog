import React from 'react'
import { Col, Row } from 'antd'
import { Link} from 'react-router-dom';
import { getDay } from '../utils/time'
import Tag from './Tag'

const ArticleCard =({data}) => {
  const {id, notice, title,created_at, tags} = data;
  return (
    <div className="main">
      <Row justify="space-between" align="middle">
        <Col span={20}>
          <Link to={{ pathname: `/article/${id}` , query : {   } }}>
            <Row><h2 className="font">{title}</h2></Row>
          </Link>
        </Col>
        <Col span={4}>
          <span style={{ color: 'grey', textAlign:"right" }}>{getDay(created_at)}</span>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}><p className="info">{notice}</p></Row>

      <Row>
        {tags.split(",").map( v => <Tag key={v} data={v} /> )}
      </Row>

      <style jsx>
        {`
        .main {
          border-bottom: 1px solid lightgrey;
          background-color: #fff;
          padding: 20px;
          margin-bottom: 20px;
        }
        .font{
          font-family: "Iowan Old Style", "Ovo", "Hoefler Text", Georgia, "Times New Roman", "TIBch", "Source Han Sans", "PingFangSC-Regular", "Hiragino Sans GB", "STHeiti", "Microsoft Yahei", "Droid Sans Fallback", "WenQuanYi Micro Hei", sans-serif;
          font-size: 22px;
        }

        .font:hover{
            color: #0f90d3;
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
    </div>
  )
}
export default ArticleCard

