import React, { useState } from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import request from '../utils/request'
import hljs from 'highlight.js';
import {Button} from 'antd'
// 注册插件（如果有的话）
// import 'highlight.js/scss/default.scss'
// // 引入个性化的vs2015样式
// import 'highlight.js/styles/vs2015.css'
// MdEditor.use(YOUR_PLUGINS_HERE);
import 'react-markdown-editor-lite/lib/index.css';

const Publish = (props) => {
  const [content, setContent] = useState('') 
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 得到经过highlight.js之后的html代码
          const preCode = hljs.highlight(lang, str, true).value
          // 以换行进行分割
          const lines = preCode.split(/\n/).slice(0, -1)
          // 添加自定义行号
          let html = lines.map((item, index) => {
            return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
          }).join('')
          html = '<ol>' + html + '</ol>'
          // 添加代码语言
          if (lines.length) {
            html += '<b class="name">' + lang + '</b>'
          }
          return '<pre class="hljs"><code>' +
            html +
            '</code></pre>'
        } catch (__) {}
      }
      // 未添加代码语言，此处与上面同理
      const preCode = md.utils.escapeHtml(str)
      const lines = preCode.split(/\n/).slice(0, -1)
      let html = lines.map((item, index) => {
        return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
      }).join('')
      html = '<ol>' + html + '</ol>'
      return '<pre class="hljs"><code>' +
        html +
        '</code></pre>'
    }
  })

  // req.body.content 代表md代码
  //let articleContentHtml = md.render(`@[toc]${'http://qiniu.dreamma.vip/test.md'}`)
  const RenderHTML = ({text}) =>(
    <div dangerouslySetInnerHTML = {{__html: md.render(text)}}></div>
  )


  // const RenderHTML = ({text}) =>(
  //   <div dangerouslySetInnerHTML = {{__html: marked(text )}}></div>
  // )

  const handleEditorChange =({html, text}) => {
    console.log('handleEditorChange', html, text)
    setContent(text)
  }

  const publish = () =>{
    let title='test1'
    request
      .post('articles', { title: title, text: content, notice: 'notice', tags: 'Golang,C++'})
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
      <style jsx>
        {`
          pre.hljs {
            padding: 8px 2px;
            border-radius: 5px;
            background: #f5f2f0;
            position: relative;
          }
           pre.hljs ol{
              list-style: decimal;
              margin: 0;
              margin-left: 40px;
              padding: 0;
            }
            pre.hljs ol li{
              position: relative;
              padding-left: 10px;
            }

            pre.hljs ol li.line-num {
              position: absolute;
              left: -40px;
              top: 0;
              width: 40px;
              height: 100%;
              border-right: 1px solid rgba(0, 0, 0, .66);
            }
            pre.hljs b.name {
              position: absolute;
              top: 2px;
              right: 12px;
              z-index: 10;
              color: #999;
              pointer-events: none;
            }
        `}
      </style>
    </div>
  )
}
export default Publish

//import 'highlight.js/styles/github.css';
//import 'highlight.js/styles/atelier-plateau-light.css';
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


