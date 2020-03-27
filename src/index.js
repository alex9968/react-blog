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
import Chat from './pages/home';
import About from './pages/about';
import Project from './pages/project';
import Article from './pages/article3';
import Publish from './pages/publish';

import 'antd/dist/antd.css';

const store = createStore(window.INITIAL_STATE, createHashHistory())
window.STORE = store

//<Redirect path="/" exact={true} to="/index" />
ReactDOM.render(
  <div>
    <ReduxProvider store={store}>
      <Router>
        <Nav />
        <Row style={{ minHeight: '88vh', marginTop: '2%' }}>
          <Col xs={{span: 22,push:1}}  md={{span: 15, push:2}} lg={{span:14, push: 3}} xl={{ span: 12, push:4 }} style={{ borderTop:'1px solid lightgrey' }} >
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/chat" component={Chat} />
              <Route path="/about" component={About} />
              <Route path="/project" component={Project} />
              <Route path="/publish" component={Publish} />
              <Route path="/article/:id" component={Article}/>
            </Switch>
          </Col>
          <Col xs={{span: 22,push:1}} md={{span: 5, push:2}} lg={{span:4, push: 3}} xl={{ span: 4, push:4 }} 
           style={{ borderTop:'1px solid lightgrey', borderLeft:'1px solid lightgrey' }}>
            <div>shhihihihihihihii</div>
          </Col>
        </Row>
        <Foot />
      </Router>
    </ReduxProvider>
  </div>,
  document.getElementById('root')
);


