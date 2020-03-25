import React, { Component, useEffect, useState } from "react";
import { Input, Button, Row, Col } from 'antd'
import { useDispatch, useSelector  } from 'react-redux'
import { viewMergeIn,viewSetIn   } from '../redux/modules/view'
import request from '../utils/request'
import ArticleCard from '../components/ArticleCard';
import { articlesSet } from '../redux/modules/articles'

const Project = () => {
  // const dispatch = useDispatch()
  // const view = useSelector(state => state.view)
  // const message = view.get('message')
  // console.log(message)

  //const [chatHistory, setChatHistory] = useState([]);
  //const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)

  const articlesIndex =  () => {
    const res =  request.get('articles')
    // if (res.ok) {
    //   dispatch(articlesSet(res.data))
    // }
  }

  useEffect(() => {
    articlesIndex()
  }, [articlesIndex])

  return (
    <div className="App">
      <Row style={{  }}>
        Home
      </Row>
    </div>
  );
}
export default Project


