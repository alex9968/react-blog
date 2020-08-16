import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useDispatch, useSelector } from 'react-redux'
import { articlesSet, articlesMerge } from '../redux/modules/articles'
import request from '../utils/request'
import ArticleCard from '../components/ArticleCard';
import { Row, message, Skeleton, Pagination} from 'antd'

const Article = () =>{
  const [loading, setLoading] = useState(true)
  const [pagenum, setPagenum] = useState(1)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)
  const query = useSelector(state => state.view).get('searchQuery')
  const [userIp] = useState(localStorage.getItem('userIp'))


  useEffect(() => {
    request.get('articles', { pagenum, pagesize: 5, query })
      .then(body => {
        const { data, ok, total } = body
        //console.info(body)
        if (ok) {
          //dispatch(articlesSet(I.fromJS(_.keyBy(data || [], 'id'))))
          dispatch(articlesSet(data))
          setLoading(false)
          setTotal(total)
        }
      })
      .catch(e => console.log(e))
  }, [dispatch, pagenum, query])

  useEffect(() => {
    console.log("res,ff", window.returnCitySN, JSON.stringify( window.returnUserBrowser ) )
    request.post('users',{}, {
      ...window.returnCitySN,
      browser: JSON.stringify( window.returnUserBrowser)
    })
      .then(res => {
        console.log("msg", res.msg)
      })
  }, [userIp])


  const articleList = articles
    .toList()
    .toJS()
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  //.map(user => user.set('key', user.get('id')))

  //console.info(articleList )

  const pageChange = (pagenum) => {
    //console.log("page", pagenum)
    setPagenum(pagenum)
  }

  return(
    <div style={{background: '#ECECEC'}}>
      { loading ? (
        <Row style={{ padding: '0% 8% 0 12%' }}>
          <Skeleton  avatar active paragraph={{ rows: 6}} />
          <Skeleton  avatar active paragraph={{ rows: 6}} />
          <Skeleton  avatar active paragraph={{ rows: 6}} />
        </Row>) : (
        <div style={{ textAlign: 'left'}}>
          {articleList.map(
            v => <ArticleCard key={v.id}  data={v} />
          )}
        </div>
      )}

      <div style={{ textAlign: 'center'}}>
        <Pagination
          style={{ display: 'inline-block' }}
          total={total}
          showQuickJumper
          pageSize={5}
          defaultCurrent={1}
          onChange={pageChange}
        />
      </div>

      <style jsx>
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
