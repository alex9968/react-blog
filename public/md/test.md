## 博客开发需求文档


#### WEB端界面组价规划

* 首页右侧组件，保持显示
    * 最新文章展示
    * 文章标签（数量）展示
    * 联系我们+赞助支持
    
    
* 文章代码渲染
* 文章tag添加
* 发布markdown
* 


#### expres接口

* 

```javascript
marked.setOptions({
  renderer: renderer,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
}); 
```
```go
import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
    db, err := gorm.Open("mysql", "user:password@tcp(IP:port)/dbname?charset=utf8&parseTime=True&loc=Local")
  	db.DB().SetMaxIdleConns(10)
		db.DB().SetMaxOpenConns(100)
  defer db.Close()
}
```


