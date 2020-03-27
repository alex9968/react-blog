import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articlesSet } from '../redux/modules/articles'
import request from '../utils/request'
import ArticleCard from '../components/ArticleCard';
import { Row, Skeleton  } from 'antd'
// import I from 'immutable'
// import _ from 'lodash'


const Article = () =>{
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)

  useEffect( () => {
    request.get('articles')
      .then(body => {
        const { data, ok } = body
        console.info(body)
        if (ok) {
          //dispatch(articlesSet(I.fromJS(_.keyBy(data || [], 'id'))))
          dispatch(articlesSet(data))
          setLoading(false)
        }
      })
  }, [dispatch])

  const articleList = articles
    //.map(user => user.set('key', user.get('id')))
    .toList()
    .toJS()
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  console.info(articleList )


  return(
    <div style={{background: '#ECECEC'}}>
      { loading ? (<Row style={{ padding: '0% 8% 0 12%' }}><Skeleton  avatar active paragraph={{ rows: 6}} /></Row>) : (
        <div style={{ textAlign: 'left'}}>
          {articleList.map(
            v => <ArticleCard key={v.id}  data={v} />
          )}
        </div>
      )}

      

      <style global jsx>
        {`
        @media screen and (max-width: 2000px) {
        }

        @media screen and (max-width: 400px) {
        }
        `}
      </style>
    </div>
  )
}
export default Article
