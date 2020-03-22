import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider  } from 'react-redux'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import { createHashHistory  } from 'history'
import createStore from './redux/createStore'
import { Col } from 'antd'

import Nav from './components/Nav';
import Foot from './components/Foot';
import Home from './pages/home';
import Chat from './pages/chat';
import About from './pages/about';
import Project from './pages/project';

import 'antd/dist/antd.css';

const store = createStore(window.INITIAL_STATE, createHashHistory())
window.STORE = store

ReactDOM.render(
  <div>
    <ReduxProvider store={store}>
      <Nav />
      <div style={{ minHeight: '83vh' }}>
        <Col xs={{span: 22,push:1}} md={{span: 20, push:2}} xl={{ span: 12, push:6 }} style={{ border:'1px solid red' }} >
          <Router>
            <Switch>
              <Redirect path="/" exact={true} to="/index" />
              <Route path="/index" component={Home} exact/>
              <Route path="/chat" component={Chat} />
              <Route path="/about" component={About} />
              <Route path="/project" component={Project} />
            </Switch>
          </Router>
        </Col>
      </div>
      <Foot />
      </ReduxProvider>
    </div>,
  document.getElementById('root')
);


