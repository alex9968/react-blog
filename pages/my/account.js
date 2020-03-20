import React, { useState, useEffect } from 'react'
import { Input,message, Icon,  Avatar,Result, Col, Button,  Row, List, Card } from 'antd'
import I from 'immutable'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import QiniuSingle from '~/components/QiniuSingle'
import QiniuDragger from '~/components/QiniuDragger'
import request from '~/utils/request'
import { selfSetIn } from '~/redux/modules/self'
import {viewMergeIn,viewSetIn  } from '~/redux/modules/view'
import { getLoginState } from '~/redux/modules/view'
import { uploadPhotos } from '~/http/self'
import ImgCard from '~/components/ImgCard';
import { selfMerge, selfSet } from '%self'
const { Meta } = Card

const Account= () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const self = useSelector(state => state.self)
  const view = useSelector(state => state.view)
  const settings = useSelector(state => state.settings)
  const token = settings.get('qiniuToken')
  const loginState = view.getIn(['loginState', 'result', 'ok'])
  const nickname = self.get('nickname')

  const myNotification = async () => {
    const res = await request.get('private')
    if (res.ok) {
      dispatch(selfMerge(I.fromJS(res.self)))
    }
  }

  useEffect(() => {
    myNotification()
  }, [])


  const updateHead = async (key) => {
    const id = self.get('id')
    console.info(id)
    let head = `http://qiniu.dreamma.vip/${key}`
    const res = await request.post('users/update_head', { id, head })
    if (res.ok) {
      dispatch(selfSetIn(['head'], head ))
      message.success('昵称修改成功!')
    }
  }

  const updateNickname = async () => {
    const id = self.get('id')
    console.info(id)
    const res = await request.post('users/update_nickname', { id, nickname })
    if (res.ok) {
      dispatch(selfSetIn(['nickname'], nickname))
      message.success('昵称修改成功!')
    }
  }

  const imgList = view.get('imgList').toList().toJS()
  //const imgMap = view.get('imgList').toList().toJS()
        //.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  //    .toMap()
    // .map((key,val) => console.info(key,val))
    // .mapKey(v => v.set('key', v.get('key')))
  console.info(imgList)

  const addImage = (key) => {
    let src = `http://qiniu.dreamma.vip/${key}`
    const img =   { key: key, src: src, label: '', sort: '' }
    let imgObj = {}
    imgObj[key] = img
    console.info(imgObj)

    dispatch(viewMergeIn(['imgList'], imgObj))
    return
  }


  const submit = async () => {
    const res = await dispatch(uploadPhotos())
  }

  return (
    <div style={{ minHeight: '81vh', margin: '5% 10%' }}>
      <Row style={{ textAlign: 'center' }} type='flex' justify='center'>
        <Col span={4} >
          <div className="MB-2">
            <Avatar className="align-center D-B" src={self.getIn(['head'])} shape="circle" size={128} />
          </div>
          <QiniuSingle
            token={token}
            keyPrefix="avatar"
            onSuccess={key => updateHead(key) }
          />
          <Button type="primary"  style={{ marginTop: '30px' }} onClick={() => router.push('/publish') }>发布文章</Button>
        </Col>
        <Col span={4}>
          <Row style={{  }}>
            <span>昵称：</span><Input style={{ width: '120px', marginTop: '65px' }} value={nickname} onChange={e => dispatch(selfSetIn(['nickname'],e.target.value))}  />
          </Row>
          <Button type="primary"  style={{ marginTop: '30px' }} onClick={() => updateNickname() }>保存</Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '5vh' }}>
        <Col span={20}>
          <QiniuDragger
            token={token}
            onSuccess={key => addImage(key) }
          /></Col>
        <Col span={3} push={1} >
          <Button style={{ margin: '15px' }} type="danger" shape="round" icon="upload" size="large" onClick={() => dispatch(viewSetIn(['imgList'], []))} >取消上传</Button>
          <Button style={{ margin: '15px' }} type="primary" shape="round" icon="upload" size="large" onClick={() => submit()} >立即上传</Button>
        </Col>
      </Row>
      <Row  style={{  marginTop: '5vh', minHeight: '50vh', border: 'solid 2px lightgrey' }} >
        {imgList.map( v => <ImgCard src={v.src} id={v.key} key={v.key} />) }
      </Row>
      <style jsx>
        {`
          .head {
            min-width: 100vw;
            box-shadow:0 0 9px 3px #999;
            font-size: 20px;
            line-height: 23vh;
          }
          .text {
            letter-spacing: 2px;
            line-height: 2;
          }
        `}
      </style>
    </div>
  )
}
export default Account

