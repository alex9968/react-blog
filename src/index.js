import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider  } from 'react-redux'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import { createHashHistory  } from 'history'
import createStore from './redux/createStore'

import { Layout }  from 'components/Layout';
import Nav from 'components/Nav';
import Foot from 'components/Foot';
import Home from 'pages/home';
import Chat from 'pages/chat';
import Sort from 'pages/sort';
import Project from 'pages/project';
import Article from 'pages/article';
import Publish from 'pages/publish';
import 'antd/dist/antd.css';
const store = createStore(window.INITIAL_STATE, createHashHistory())
window.STORE = store

//<Redirect path="/" exact={true} to="/index" />
ReactDOM.render(
  <div>
    <ReduxProvider store={store}>
      <Router>
        <Nav />
        <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sort/:tag" component={Sort} />
          <Route path="/project" component={Project} />
          <Route path="/article/:id" component={Article} />
          <Route path="/publish" component={Publish} />
          <Route path="/chat" component={Chat} />
        </Switch>
        </Layout>
        <Foot />
      </Router>
    </ReduxProvider>
  </div>,
  document.getElementById('root')
);


