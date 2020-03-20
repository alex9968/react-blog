import React, { useEffect, useState, useContext } from 'react'
import { Col, Row, Carousel} from 'antd'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles  } from '../http/article'

const Index = () => {
  useEffect(() => {
    console.info('REMOTE_HOST:', REMOTE_HOST)
  })

  
  return (
    <div style={{ minHeight:'81vh'  }}>
      
    </div>
  )
}
export default Index

