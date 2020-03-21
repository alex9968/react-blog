// import { applyMiddleware, createStore } from 'redux'
// import thunk from 'redux-thunk'
// import makeRootReducer from './state'
//
// export default (initialState = {}) => {
//   const store = createStore(makeRootReducer(), initialState, applyMiddleware(thunk))
//   window.DISPATCH = store.dispatch
//   window.STATE = store.getState
//   return store
// }


import { applyMiddleware, compose, createStore  } from 'redux'
import { connectRouter, routerMiddleware  } from 'connected-react-router'
import thunk from 'redux-thunk'
import makeRootReducer from './state'

export default (initialState = {}, history) => {
  const store = createStore(connectRouter(history)(makeRootReducer()), initialState, compose(applyMiddleware(thunk, routerMiddleware(history))))
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = hashHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./state', () => {
      const reducers = require('./state').default // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  window.DISPATCH = store.dispatch
  window.STATE = store.getState
  return store
}

