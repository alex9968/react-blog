import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewSetIn } from '../redux/modules/view'
import request from '../utils/request'

const Article = (props) =>{
  const dispatch = useDispatch()
  const article = useSelector(state => state.view).get('articleDetails').toJS()
  const { id } = props.match.params;
  console.info(article)
  const {title, text } = article;

  useEffect( () => {
    request.get(`articles/${id}`)
      .then(body => {
        const { data, ok } = body
        console.info(body)
        if (ok) {
          dispatch(viewSetIn(['articleDetails'], data))
        }
      })
  }, [dispatch, id])


  return(
    <div style={{background: '#ECECEC'}}>
      <div>{title}</div>
      <div>{text}</div>
      <style jsx>
        {`
        @media screen and (max-width: 2000px) {
        }

        @media screen and (max-width: 400px) {

        }
         .card-row{
            font-size: 60px;
            margin-bottom: 30px;
            color:#000;
          }
        `}
      </style>
    </div>
  )
}
export default Article
