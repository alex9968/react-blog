import React, { useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import request from '../utils/request'
import marked from 'marked';
import hljs from 'highlight.js';
import {Button} from 'antd'
// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE);
// 初始化Markdown解析器
// 导入编辑器的样式
//import 'highlight.js/styles/atelier-plateau-light.css';
import 'react-markdown-editor-lite/lib/index.css';
import 'highlight.js/styles/github.css';
//import 'highlight.js/styles/monokai-sublime.css';
//import 'highlight.js/styles/a11y-light.css';
//import 'highlight.js/styles/agate.css';
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


const Publish = (props) => {
const [content, setContent] = useState('') 
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

  const RenderHTML = ({text}) =>(
    <div dangerouslySetInnerHTML = {{__html: marked(text )}}></div>
  )

  const handleEditorChange =({html, text}) => {
    console.log('handleEditorChange', html, text)
    setContent(text)
  }

  const publish = () =>{
    let title='test1'
    request
      .post('articles', { title: title, text: content})
      .then(body => {
        console.info(body)
        const { ok } = body
        if(ok) {
          return ok
        }
      })
  }



  return (
    <div>
      <Button onClick={publish}>发布</Button>
    <MdEditor
      value=""
      renderHTML={(text) => <RenderHTML text={text} />}
      onChange={handleEditorChange}
    />
    </div>
  )
}
export default Publish
