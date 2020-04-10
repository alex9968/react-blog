import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom';
import { viewSetIn } from '../redux/modules/view'
import request from '../utils/request'
import { Row } from 'antd'

export default ({children, title}) => {
  const dispatch = useDispatch()
  const latest = useSelector(state => state.view).get('articlesLatest').toJS()
  console.log(latest)


  useEffect( () => {
    request.get('articles/latest')
      .then(body => {
        const { data, ok } = body
        console.info(body)
        if (ok) {
          dispatch(viewSetIn(['articlesLatest'], data))
        }
      })
  }, [dispatch])


  return (
    <div>
      <Row style={{ background: '#fff'}}>
        <div style={{ textAlign: 'left'}}>
          {latest.map(v =>
          <Link to={`/article/${v.id}`}>
            <div style={{ width: '80%'}} className="title-link">
              {v.title}
            </div>
          </Link>
          )}
        </div>

      </Row>
      <style jsx>
        {`
          .title-link{
            color: grey;
            font-size: 15px;
            padding: 5px 0px;
            marginRight: -20px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display:block;
          }
          .title-link:hover{
            color: #0f90d3;
          }


        `}
      </style>
    </div>
  )
}

