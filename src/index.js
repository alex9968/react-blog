import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider  } from 'react-redux'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import { createHashHistory  } from 'history'
import createStore from './redux/createStore'

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
      <Router>
        <Switch>
          <Redirect path="/" exact={true} to="/index" />
          <Route path="/index" component={Home} exact/>
          <Route path="/chat" component={Chat} />
          <Route path="/about" component={About} />
          <Route path="/project" component={Project} />
        </Switch>
      </Router>
      <Foot />
    </ReduxProvider>
  </div>,
  document.getElementById('root')
);


