import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider  } from 'react-redux'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
import { createHashHistory  } from 'history'
import createStore from './redux/createStore'

import { Layout, Layout2 }  from './components/Layout';
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


