import I from 'immutable'
import immutableHandler from '../immutableHandler'

export const MESSAGES_SET = 'MESSAGES_SET '
export const MESSAGES_SET_IN = 'MESSAGES_SET_IN'
export const MESSAGE_SET = 'MESSAGE_SET'
export const MESSAGES_CONCAT = 'MESSAGES_CONCAT'

export const ADD_MSG = 'ADD_MSG'
export const ADD_USER = 'ADD_USER'
export const DEL_USER = 'DEL_USER '

const initialState = I.fromJS({
  message: '',
  self:{
    cid: '',
    name: '',
    avatar: ''
  },
  history: {},
  users: {}
})

export default immutableHandler((m = initialState, action) => {
  const { id, value, path } = action
  switch (action.type) {
    case MESSAGES_SET:
      return value
    case MESSAGE_SET:
      return m.set(id, value)
    case MESSAGES_CONCAT:
      return m.concat(value)
    case MESSAGES_SET_IN:
      return m.setIn(path, value)

    case ADD_MSG:
      return m.mergeIn(['history'], value)
      //return m.setIn(['history'], m.get('history').push(value))
    case ADD_USER:
      return m.mergeIn(['users'], value)
    case DEL_USER:
      return m.deleteIn(['users',id ])

    default:
      return m
  }
})

export const messagesSet = value => ({ type: MESSAGES_SET, value })
export const messageSet = (id, value) => ({ type: MESSAGE_SET, id, value })
export const chatSetIn = (path, value) => ({
  type: MESSAGES_SET_IN,
  path,
  value
})
export const messagesConcat = value => ({ type: MESSAGES_CONCAT, value })

export const addUser = value => ({ type: ADD_USER, value })
export const delUser = id => ({ type: ADD_USER, id })
export const addMsg = value => ({ type: ADD_MSG, value })


