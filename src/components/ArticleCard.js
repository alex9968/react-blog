import React,{ useContext } from 'react'
import { Col, Row, Card } from 'antd'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
const { Meta } = Card

const ArticleCard =({id, img, title, date, content}) => {
  return (
    <Row>
      <Col xs={24} md={{ span: 20, push: 2  }} xl={{ span: 12, push: 6 }}>
        <Link to="/article/[id]" as={`/article/${id}`}>
          <Row style={{ margin: '10px', borderTop: 'solid 2px lightgrey' }}>
            <Col span={8}>
              <img  style={{ objectFit:'cover', margin: '20px 0px' }} height='100px' width='400px' alt="example" src={img} />
            </Col>
            <Col  span={12} push={4} style={{ margin: '20px 0 0 0' }}>
              <Row><h2 className="info">{title}</h2></Row>
              <Row><span>{date}</span></Row>
            </Col>
          </Row>
        </Link>
      </Col>
      <style jsx>
        {`
        @media screen and (max-width: 2000px) {
          .info{
            font-size: 18px;
          }
        }

        @media screen and (max-width: 400px) {
          .info{
            font-size: 10px;
          }
        }
        `}
      </style>

    </Row>
  )
}
export default ArticleCard



