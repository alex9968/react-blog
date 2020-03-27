import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider  } from 'react-redux'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import { createHashHistory  } from 'history'
import createStore from './redux/createStore'
import { Col, Row } from 'antd'

import Nav from './components/Nav';
import Foot from './components/Foot';
import Home from './pages/home';
import Chat from './pages/chat';
import About from './pages/about';
import Project from './pages/project';
import Article from './pages/article3';
import Publish from './pages/publish';

import 'antd/dist/antd.css';

const store = createStore(window.INITIAL_STATE, createHashHistory())
window.STORE = store

const Layout = (props) =>(
  <Row style={{ minHeight: '88vh', marginTop: '2%' }}>
    <Col xs={{span: 22,push:1}}  md={{span: 15, push:2}} lg={{span:14, push: 3}} xl={{ span: 12, push:4 }} style={{ borderTop:'1px solid lightgrey' }} >
      {props.children}
    </Col>
    <Col xs={{span: 22,push:1}} md={{span: 5, push:2}} lg={{span:4, push: 3}} xl={{ span: 4, push:4 }} 
      style={{ borderTop:'1px solid lightgrey', borderLeft:'1px solid lightgrey' }}>
      <div>shhihihihihihihii</div>
    </Col>
  </Row>
)
const Layout2 = (props) =>(
  <Row style={{ minHeight: '88vh', marginTop: '2%' }}>
    <Col xs={{span: 22,push:1}}  md={{span: 18, push:3}} lg={{span:14, push: 5}} xl={{ span: 12, push:6 }} style={{ borderTop:'1px solid lightgrey' }} >
      {props.children}
    </Col>
  </Row>
)

//<Redirect path="/" exact={true} to="/index" />
ReactDOM.render(
  <div>
    <ReduxProvider store={store}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact><Layout><Home/></Layout></Route>
          <Route path="/about"><Layout><About/></Layout></Route>
          <Route path="/project"><Layout><Project/></Layout></Route>
          <Route path="/article/:id"><Layout><Article/></Layout></Route>
          <Route path="/publish"><Layout2><Publish/></Layout2></Route>
          <Route path="/chat"><Layout2><Chat/></Layout2></Route>
        </Switch>
        <Foot />
      </Router>
    </ReduxProvider>
  </div>,
  document.getElementById('root')
);


