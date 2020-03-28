import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewSetIn } from '../redux/modules/view'
import request from '../utils/request'
import ArticleCard from '../components/ArticleCard';
import { Row,Skeleton} from 'antd'

const Sort = (props) =>{
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const articles = useSelector(state => state.view).get('articlesFindByTag').toJS()
  const { tag } = props.match.params;

  useEffect( () => {
    request.get('articles/find_by_tag', { tag })
      .then(body => {
        const { data, ok } = body
        console.info(body)
        if (ok) {
          //dispatch(articlesSet(I.fromJS(_.keyBy(data || [], 'id'))))
          dispatch(viewSetIn(['articlesFindByTag'], data))
          setLoading(false)
        }
      })
  }, [dispatch, tag])

  return(
    <div style={{background: '#ECECEC'}}>
      { loading ? (<Row style={{ padding: '0% 8% 0 12%' }}><Skeleton  avatar active paragraph={{ rows: 6}} /></Row>) : (
        <div style={{ textAlign: 'left'}}>
          {articles.map(
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
export default Sort
