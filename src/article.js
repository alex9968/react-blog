import React, { useState, useEffect } from 'react'
import { Row, List, Card } from 'antd'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { articlesSet } from '../redux/modules/articles'
import { getDay } from '../utils/time'
import request from '../utils/request'
import ArticleCard from '../components/ArticleCard';
import { Skeleton  } from 'antd';

const Article = () =>{
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)

  const articlesIndex = async () => {
    const res = await request.get('articles')
    if (res.ok) {
      dispatch(articlesSet(res.data))
      setLoading(false)
    }
  }

  useEffect(() => {
    articlesIndex()
  }, [])

  const articleList = articles
    .map(user => user.set('key', user.get('id')))
    .toList()
    .toJS()
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  console.info(articleList)

  return(
    <div style={{background: '#ECECEC'}}>
      <Row className='bg' style={{ color: '#fff', textAlign: 'center' }}>
        <h1>活动发布</h1>
        <p>记录美好瞬间</p>
      </Row>
      { loading ? (<Row style={{ padding: '5% 8% 0 12%' }}><Skeleton  avatar active paragraph={{ rows: 6}} /></Row>) : (
        <div style={{ textAlign: 'left', margin: '5% 0%' }}>
          {articleList.map(
            v => <ArticleCard key={v.id} id={v.id} img={v.img} title={v.title} content={v.content} date={getDay(v.created_at)} />
          )}
        </div>
      )}

      <style global jsx>
        {`
        @media screen and (max-width: 2000px) {
         .bg{
            background-attachment: fixed;
            background-image: url('http://www.ypaphoto.com/images/banner-join.jpg');
            width: 100%;
            height: 60vh;
            text-align:'center';
          }
          .bg h1{
            color: #ffffff;
            font-size: 100px;
            padding-top: 18vh;
          }
          .bg p{
            font-size: 50px;
            letter-spacing:10;
          }
        }

        @media screen and (max-width: 400px) {
         .bg{
            background-attachment: fixed;
            background-image: url('http://www.ypaphoto.com/images/banner-join.jpg');
            width: 100%;
            height: 25vh;
            text-align:'center';
          }
          .bg h1{
            font-size: 30px;
            padding-top: 8vh;
          }
          .bg p{
            font-size: 20px;
            letter-spacing:5;
          }
  
        }
         .card-row{
            font-size: 60px;
            margin-bottom: 30px;
            color:#000;
          }
        `}
      </style>
    </div>
  )
}
export default Article
