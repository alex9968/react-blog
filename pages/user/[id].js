import React, { useState, useEffect  } from 'react'
import { message, Row, Col, Button, Divider, Input, List  } from 'antd'
import { Map  } from 'immutable'
import { useRouter  } from 'next/router'
import { useSelector, useDispatch  } from 'react-redux'
import PhotoCard from '~/components/PhotoCard'
import { viewSetIn  } from '%view'
import request from '~/utils/request'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar  } from 'antd';
import { UserOutlined  } from '@ant-design/icons';
import dynamic from 'next/dynamic'
const MyViewer = dynamic(import('~/components/MyViewer'),{ssr: false })


const Photo = () => {
  const router = useRouter()
  const { id  } = router.query
  const dispatch = useDispatch()
  const view = useSelector(state => state.view)
  const photos = view.get('showImgList')
  const user = view.get('showUserInfo')

    const [bindStatus, setBindStatus] = useState(false)
  const [count, setCount] = useState(0)

  const indexById = async Id => {
    const res = await request.get(`users/${Id}`)
    if (res.ok) {
      dispatch(viewSetIn(['showImgList'],  res.data))
      dispatch(viewSetIn(['showUserInfo'],  res.user))
    } else {
      message.error('Current user is not found!')
    }
    return res.data
  }

  useEffect(() => {
    indexById(id)
  }, [])

  const allList = photos
    .toList()
    .toJS()
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  const showList = () => {
    const res = []
    allList.map( v =>{
      let img = { key: v.id, src: v.url, alt: v.label, downloadUrl: v.url }
      res.push(img)
    })
    return res

  }
  console.info(showList())

  return (
    <Row style={{ minHeight: '84vh', backgroundColor: '#f7f8fa' ,margin: '0px' }}>
      <Col  xs={{ span: 24 }} md={{ span:18, push:3  }} style={{ }}>
        <Row className="bg" style={{ border: '1px solid lightgrey'}}>
          <div className="bg" style={{ backgroundImage: `url(${user.get('bg')})` }}>
            <Col  span={4} push={10} className="FS-8 TA-C" style={{ paddingTop: '120px' }} >
              <Row><Avatar size={120} icon={<UserOutlined />} src={user.get('head')} /></Row>
              <Row span={6}><span className="name">{user.get('nickname')}</span></Row>
            </Col>
          </div>
        </Row> <Row>
          <div style={{ fontSize:  '30px', color: '#lightgrey', fontFamily: 'Yuanti SC' }}>Ta的作品</div>
        </Row>

        <Row>
          <Col style={{  margin: '10px 0px' }}>
            {allList.map(
              (v,index) => <PhotoCard style={{ lineHeight: '100%'  }} key={v.id} index={index} data={v} />
            )}
          </Col>
          <MyViewer imgs={showList()} activeImg={view.get('imgShowIndex')} />
        </Row>
        <style jsx>
          {`
            .pre:hover .pre{
              backgroundColor: '#f0f8fa'
            }
            img{
              height: auto;
              width: auto;
              max-width: 100%;
              max-height: 100%;
            }

            @media screen and (max-width: 2000px) {
              .bg{
                height: 500px;
                width: 100%;
                background-position: center center;    // 居中
                background-size: cover;                // 填满div
                background-repeat: no-repeat;
                overfloat: hidden;
              }
              .name{
                font-size: 30px;
              }
            }

            @media screen and (max-width: 400px) {
              .bg{
                height: 300px;
                width: 100%;
                background-position: center center;    // 居中
                background-size: cover;                // 填满div
                background-repeat: no-repeat;
                overfloat: hidden;
              }
              .name{
                font-size: 20px;
              }
            }
        `}
        </style>
      </Col>
    </Row>
  )
}
export default Photo

