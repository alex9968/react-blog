import React, { useState } from 'react'
import{ Row, Col,  Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { createArticle } from '../http/article'
import UserContext from '../components/UserContext'
import dynamic from 'next/dynamic'
import { getLoginState, viewSetIn } from '%view'
import 'react-quill/dist/quill.snow.css';
const ReactQuill  = dynamic(() => import('react-quill'),{ ssr: false  })
import QiniuSingle from '~/components/QiniuSingle'

const Publish = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const settings = useSelector(state => state.settings)
  const token = settings.get('qiniuToken')
  const view = useSelector(state => state.view)
  const _loginState = getLoginState(view)
  const [submitting, setSubmitting] = useState(false)


  const submit = () => {
    let img = view.getIn(['articleImg'])
    dispatch(createArticle(title, content, img))
    dispatch(viewSetIn(['articleImg'], '~/static/upload.png' ))
    router.push('/article')

  }


  return (
    <div style={{ minHeight: '84vh', paddingTop: '5vh' }}>
      <Col  xs={{ span:20, push: 2 }} md={{ span: 16, push: 4 }} lg={{ span: 16 , push: 4 }}>
        <Row className="FS-12 MB-20 TA-L">
          <span style={{ color: '#8c0000' }}>发布文章</span>
        </Row>
        <Row>
          <Col span={14}>
            <Input
              size="large"
              type="title"
              placeholder="输入标题"
              value={title}
              //onChange={e => dispatch(viewSetIn(['publish', 'title'], e.target.value))}
              onChange={e => setTitle(e.target.value)}
            />
          </Col>
          <Col span={6} push={4}>
            <Button className="H-21" type="primary" size="large"  onClick={() => submit()} style={{ width: '80%' }}>
              立即发布
            </Button>
          </Col>
        </Row>
        <Row>
          <div className="MTB-10" >
            {view.getIn(['articleImg']) != '' ? 
            <img width='400px' height='200px' style={{ objectFit: 'cover' }}  src={view.getIn(['articleImg'])}  />
            : ''}
          </div>
          <QiniuSingle
            token={token}
            keyPrefix="avatar"
            onSuccess={key => dispatch(viewSetIn(['articleImg'], `http://qiniu.dreamma.vip/${key}` )) }
          />
        </Row>
        <Row style={{ marginTop: '5vh',  }} >
          <ReactQuill value={content} style={{ height: '550px' }} onChange={(value) => setContent(value)} />
        </Row>
      </Col>

      <style jsx>{`
      .manContent {
        border: 3px solid #ccc;
        border-radius: 16px;
        margin: 0 20%;
      }
      .inputArea {
        margin: 6% 30%;
      }
      `}
    </style>
  </div>
  )
}

export default Publish


