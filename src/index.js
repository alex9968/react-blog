import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider  } from 'react-redux'
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { createHashHistory  } from 'history'
import createStore from './redux/createStore'

import Nav from './components/Nav';
import Foot from './components/Foot';
import Home from './pages/about';
import About from './pages/about';
import 'antd/dist/antd.css';

const store = createStore(window.INITIAL_STATE, createHashHistory())
window.STORE = store

ReactDOM.render(
  <div>
    <ReduxProvider store={store}>
      <Nav />
      <Router>
        <Route path="/" component={Home}>
          <Route path="/chat" component={About} />
          <Route path="/about" component={About} />
          <Route path="/project" component={About} />
        </Route>
      </Router>
      <Foot />
    </ReduxProvider>
  </div>,
  document.getElementById('root')
);


