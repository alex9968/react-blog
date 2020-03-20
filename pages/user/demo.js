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


const Photo = () => {
  // const router = useRouter()
  // const { id  } = router.query
  // const dispatch = useDispatch()
  // const photos = useSelector(state => state.view.get('showImgList'))
  // const photo = photos.find(v => v.get('id') === id) || Map()
  // const [bindStatus, setBindStatus] = useState(false)
  // const [count, setCount] = useState(0)
  //
  // const indexById = async Id => {
  //   const res = await request.get('photos/index_by_id', { id: Id  })
  //   if (res.ok) {
  //     dispatch(viewSetIn(['showImgList'],  res.data))
  //   } else {
  //     message.error('照片不存在')
  //   }
  //   return res.data
  // }
  //
  // useEffect(() => {
  //   indexById(id)
  // }, [])
  //
  // const findNext = () => {
  //   if(count + 1 == photos.size) {
  //     setCount(0)
  //   } else {
  //     setCount(count + 1)
  //   }
  //   setBindStatus(true)
  // }
  //
  // const findLast= () => {
  //   if(count - 1 == -1) {
  //     setCount(photos.size -1)
  //   } else {
  //     setCount(count - 1)
  //   }
  //   setBindStatus(true)
  // }
  //
  // const allList = photos
  //   .toList()
  //   .toJS()
  //   .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  //
  // return (
  //   <Row style={{ minHeight: '84vh', backgroundColor: '#f7f8fa' }}>
  //     <Col  xs={{ span: 20, push:2 }} md={{ span:18, push:3  }}style={{ }}>
  //       <Row justify="center" style={{ textAlign: 'center' }} >
  //         <Col  onClick={() => findLast()}  xs={2} md={3} xl={4} style={{ lineHeight: '600px',cursor:'pointer '}}><LeftOutlined style={{ fontSize:'50px' }}/></Col>
  //         <Col  className="show" xs={20} md={18} xl={16} style={{ height: '600px'}}>
  //           <Zmage src={ bindStatus ?  photos.getIn([count, 'url']) : photo.get('url')} />
  //         </Col>
  //         <Col onClick={() => findNext()} className="next" xs={2} md={3} xl={4} style={{ lineHeight: '600px' }}><RightOutlined style={{ fontSize:'50px' }}/></Col>
  //       </Row>
  //
  //       <Row style={{ border: '1px solid lightgrey', padding: '10px' }}>
  //         <Col span={10} className="FS-12 PTB-10 TA-C bold">{bindStatus ? photos.getIn([count, 'label']) : photo.get('label') }</Col>
  //         <Col span={4} push={10} className="FS-8 TA-C" >
  //           <Row><Avatar size={64} icon={<UserOutlined />} src={photo.get('user_head')} /></Row>
  //           <Row span={6}><span>{photo.get('user_name')}</span></Row>
  //         </Col>
  //       </Row>
  //
  //       <Row>
  //         <Col style={{  margin: '10px 0px' }}>
  //           {allList.map(
  //             v => <PhotoCard  style={{ lineHeight: '100%'  }} key={v.id} id={v.id} url={v.url} label={v.label}  />
  //           )}
  //         </Col>
  //       </Row>
  //       <style jsx>
  //         {`
  //         .pre:hover .pre{
  //           backgroundColor: '#f0f8fa'
  //         }
  //          img{
  //           height: auto;
  //           width: auto;
  //           max-width: 100%;
  //           max-height: 100%;
  //           }
  //         @media screen and (max-width: 2000px) {
  //         }
  //       `}
  //       </style>
  //     </Col>
  //   </Row>
  // )
}
export default Photo

