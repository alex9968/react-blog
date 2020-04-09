import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom';
import { viewSetIn } from '../redux/modules/view'
import request from '../utils/request'
import { Row, Col } from 'antd'

export default () => {
  const dispatch = useDispatch()
  const tagList = useSelector(state => state.view).get('tagList').toJS()
  console.info(tagList)
 

  useEffect( () => {
    request.get('articles/tags')
      .then(body => {
        const { data, ok } = body
        console.info(body)
        if (ok) {
          let namelist = []
          let taglist = []
          console.log(data)
          data.map(v => {
            v.tags.split(",").map(tag => {
              console.log(Object.keys(taglist))
              if(namelist.indexOf(tag) === -1){
                namelist.push(tag)
                taglist.push({name: tag, count: 1})
              } else {
                taglist.map( v => {
                  if(tag === v.name)
                    v.count++
                })
              }
            })
          })
          dispatch(viewSetIn(['tagList'], taglist))
        }
      })
  }, [dispatch])

  return (
    <div>
      <Row  style={{ margin: '0 30px' }}>
        {tagList.map(v => (
          <Col span={12} key={v.name}>
            <Link to={`/sort/${v.name}`}>
              <div style={{ width: 'auto'}} className="tags-link">
                <span>{v.name} ({v.count})</span>
              </div>
            </Link>
          </Col>
        )
        )}
      </Row>
      <style jsx>
        {`
          .tags-link{
            color: grey;
            font-size: 15px;
            padding: 5px 0px;
            marginRight: -20px;
            display:block;
          }
          .tags-link:hover{
            color: #0f90d3;
          }


        `}
      </style>
    </div>
  )
}

