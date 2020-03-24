import React, { useState, useEffect } from 'react'
import { Row, List, Card } from 'antd'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  }, [articlesIndex])

  const articleList = articles
    .map(user => user.set('key', user.get('id')))
    .toList()
    .toJS()
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  console.info(articleList)

  return(
    <div style={{background: '#ECECEC'}}>
      
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
        }

        @media screen and (max-width: 400px) {
  
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
