import React, { useEffect } from 'react'
// import { message, Row, Col, Button, Divider, Input, List } from 'antd'
import { Col, message } from 'antd'
// import moment from 'moment'
import { Map } from 'immutable'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { articleSet } from '~/redux/modules/articles'
import request from '~/utils/request'
import { getDay } from '~/utils/time'

// const { TextArea } = Input

const ArticleDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)
  const article = articles.find(v => v.get('id') === id) || Map()

  const indexById = async Id => {
    const res = await request.get('articles/index_by_id', { id: Id })
    if (res.ok) {
      dispatch(articleSet(id, res.data))
    } else {
      message.error('文章不存在')
    }
    return res.data
  }

  useEffect(() => {
    indexById(id)
    //commentsIndex(id)
  }, [])

  return (
    <div style={{ minHeight: '80vh'}}>
      <Col style={{ padding: '5% 25%' }}>
        <div className="FS-12 PTB-10 TA-C bold">{article.get('title')}</div>
        <div className="FS-8 PB-10 TA-C">{ getDay(article.get('created_at'))}</div>
        <div className="article-style" dangerouslySetInnerHTML={{ __html: article.get('content', '') }} />
      </Col>
      <style jsx>
        {`
          .article-style {
            font-size: 14px;
            padding: 10;
          }
          .article-style p {
            min-height: 20px;
          }
        `}
      </style>
    </div>
  )
}

export default ArticleDetail
