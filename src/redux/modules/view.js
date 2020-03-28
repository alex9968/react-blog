import I, { List, Set, isImmutable } from 'immutable' 
import _ from 'lodash'
import request from '../../utils/request'

export const VIEW_SET = 'VIEW_SET'
export const VIEW_SET_IN = 'VIEW_SET_IN'
export const VIEW_MERGE_IN = 'VIEW_MERGE_IN'
export const VIEW_DELETE_IN = 'VIEW_DELETE_IN'
export const VIEW_TOGGLE_IN = 'VIEW_TOGGLE_IN'
export const ADD_REQUESTING_IDS = 'ADD_REQUESTING_IDS'
export const DEL_REQUESTING_IDS = 'DEL_REQUESTING_IDS'

const HttpState = {
  UNKNOWN: 'UNKNOWN',
  REQUESTING: 'REQUESTING',
  REQUESTED: 'REQUESTED'
}

const initialState = I.fromJS({
  message: '',
  chatHistory: {},
  articleDetails: {},
  articlesFindByTag: {},
  signupDialogOpen: false,
  loader: {
    show: false,
    text: null
  },
  self: {},
  loginState: {
    state: HttpState.UNKNOWN,
    result: {} // 'ok, 'user_type'
  },
  login: {
    emailOrMobileOrUsername: 'test@test.com',
    password: '123aaa',
    code: '',
    mobile: '',
    mobileCountryCode: '+86',
    method: 'password'
  },
  apiRoot: request.API_ROOT
})
export default function(aView = initialState, action) {
  const { table } = action
  let { value, path } = action
  if (!isImmutable(value)) {
    value = I.fromJS(value)
  }
  let view
  if (!isImmutable(aView)) {
    view = I.fromJS(aView)
  } else {
    view = aView
  }
  if (!Array.isArray(action.path)) {
    path = [path]
  }
  switch (action.type) {
    case VIEW_SET:
      return value
    case VIEW_SET_IN:
      return view.setIn(path, value)
    case VIEW_MERGE_IN:
      return view.mergeIn(path, value)
    case VIEW_DELETE_IN:
      return view.deleteIn(path, value)
    case VIEW_TOGGLE_IN:
      return view.updateIn(path, v => !v)
    case ADD_REQUESTING_IDS:
      return view.updateIn(['tables', table, 'requestingIds'], requestingIds => requestingIds.union(value))
    case DEL_REQUESTING_IDS:
      return view.updateIn(['tables', table, 'requestingIds'], requestingIds => requestingIds.subtract(value))

    default:
      return view
  }
}

export const viewSet = value => ({ type: VIEW_SET, value })
export const viewSetIn = (path, value) => ({ type: VIEW_SET_IN, path, value })
export const viewMergeIn = (path, value) => ({ type: VIEW_MERGE_IN, path, value })
export const viewDeleteIn = (path, value) => ({ type: VIEW_DELETE_IN, path, value })


export const viewToggleIn = path => ({ type: VIEW_TOGGLE_IN, path })
export const setFetching = (table, fetching) => ({
  type: VIEW_SET_IN,
  path: ['tables', table, 'fetching'],
  value: fetching
})
export const getFetching = table => (D, S) => S().view.getIn(['tables', table, 'fetching'])
export const addRequestingIds = (table, value) => ({
  type: ADD_REQUESTING_IDS,
  table,
  value
})
export const setLoggedIn = result => D => D(viewSetIn(['loginState', 'result'], result))

export const getLoginState = view => {
  const state = view.getIn(['loginState', 'state', 'ok'])
  // if (state === HttpState.REQUESTED) {
  //   return view.getIn(['loginState', 'result', 'ok'])
  // }
  return state
}
