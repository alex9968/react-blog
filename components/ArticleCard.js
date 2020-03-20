import { useContext } from 'react'
import { Col, Row, Card } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MyContext from '~/components/MyContext'
const { Meta } = Card

const ArticleCard =({id, img, title, date, content}) => {
  const { isMobile } = useContext(MyContext)
  const router = useRouter()
  return (
    <Row>
      <Col xs={24} md={{ span: 20, push: 2  }} xl={{ span: 12, push: 6 }}>
        <Link href="/article/[id]" as={`/article/${id}`}>
          <Row style={{ margin: '10px', borderTop: 'solid 2px lightgrey' }}>
            <Col span={8}>
              <img  style={{ objectFit:'cover', margin: '20px 0px' }} height={isMobile ? '100px' : '200px'} width={isMobile ? '150px' : '400px'} alt="example" src={img} />
            </Col>
            <Col  span={12} push={4} style={{ margin: '20px 0 0 0' }}>
              <Row><h2 className="info">{title}</h2></Row>
              <Row><span>{date}</span></Row>
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
        </Link>
      </Col>
    </Row>
  )
}
export default ArticleCard



