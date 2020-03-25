import React, { Component, useEffect, useState } from "react";
import { Input, message, Button, Row, Col } from 'antd'
import { useDispatch, useSelector  } from 'react-redux'
import { viewMergeIn,viewSetIn   } from '../redux/modules/view'
import { articlesSet } from '../redux/modules/articles'
import { getDay } from '../utils/time'
import request from '../utils/request'
import ArticleCard from '../components/ArticleCard';
import { Skeleton  } from 'antd';



const Home = () => {
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)

  //const [message, setMessage] = useState('');

  const getArticles = async() => {
    const res = await request('get', 'articles')
    if (!res.data){
      dispatch(articlesSet(res.data))
    } else{
      //message.warn('数据请求错误！')
    }
  }

  useEffect(() => {
    getArticles()
  }, [getArticles])

  return (
    <div style={{ }}>
      <Row style={{  }}>
        Homomeshhhhhomeshhhhhomeshhhhhomeshhhhhomeshhhhhomeshhhhheshhhhhomeshhhhhh
      </Row>
    </div>
  );
}
export default Home


