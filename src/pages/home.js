import React, { Component, useEffect, useState } from "react";
import { Input, Button, Row, Col } from 'antd'
import { useDispatch, useSelector  } from 'react-redux'
import { viewMergeIn,viewSetIn   } from '../redux/modules/view'
import { articlesSet } from '../redux/modules/articles'
import { getDay } from '../utils/time'
import request from '../utils/request'
import ArticleCard from '../components/ArticleCard';
import { Skeleton  } from 'antd';



const Home = () => {
  // const dispatch = useDispatch()
  // const view = useSelector(state => state.view)
  // const message = view.get('message')
  // console.log(message)

  //const [chatHistory, setChatHistory] = useState([]);
  //const [message, setMessage] = useState('');
  const articlesIndex = async() => {
    const res = await request.get('articles')
    console.log("res:.data", res.data)
    console.log("res:", res)
  }

  useEffect(() => {
    articlesIndex()
  }, [])

  return (
    <div style={{ }}>
        <Row style={{  }}>
        Homomeshhhhhomeshhhhhomeshhhhhomeshhhhhomeshhhhhomeshhhhheshhhhhomeshhhhhh
      </Row>
    </div>
  );
}
export default Home


