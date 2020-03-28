import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewSetIn } from '../redux/modules/view'
import request from '../utils/request'
import marked from 'marked';
import hljs from 'highlight.js';
// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE);
// 初始化Markdown解析器
// 导入编辑器的样式
import 'highlight.js/styles/atelier-plateau-light.css';
//import 'react-markdown-editor-lite/lib/index.css';
//import 'highlight.js/styles/github.css';
//import 'highlight.js/styles/monokai-sublime.css';
//import 'highlight.js/styles/a11y-light.css'; //import 'highlight.js/styles/agate.css';
//import 'highlight.js/styles/an-old-hope.css';
//import 'highlight.js/styles/arduino-light.css'
//import 'highlight.js/styles/arta.css'
//import 'highlight.js/styles/ascetic.css'
//import 'highlight.js/styles/atelier-cave-light.css'
//import 'highlight.js/styles/atelier-dune-light.css'
//import 'highlight.js/styles/atelier-estuary-light.css'
//import 'highlight.js/styles/telier-heath-light.css'
//import 'highlight.js/styles/telier-lakeside-light.css'
//import 'highlight.js/styles/atelier-plateau-light.css'
//import 'highlight.js/styles/atelier-seaside-light.css'
//import 'highlight.js/styles/atelier-sulphurpool-light.css'



const Article = (props) =>{
  const { id } = props.match.params;
  console.info(props)
  const [title, setTitle]= useState('')
  const [text, setText]= useState('')

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    },
  });

  useEffect( () => {
    request.get(`articles/find_by_id/${id}`)
      .then(body => {
        const { data, ok } = body
        console.info(body)
        if (ok) {
          setTitle(data.title)
          setText(data.text)
        }
      })
  }, [id])

  return(
    <div style={{background: '#ECECEC'}}>
      <div>{title}</div>
      <div dangerouslySetInnerHTML = {{__html: marked(text)}}></div>

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


