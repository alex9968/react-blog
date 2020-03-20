import I from 'immutable'
import request from '../../utils/request'
import immutableHandler from '../immutableHandler'

export const SETTINGS_SET_IN = 'SETTINGS_SET_IN'
export const SETTINGS_SET = 'SETTINGS_SET'
export const SETTINGS_MERGE = 'SETTINGS_MERGE'

const initialState = I.fromJS({
  qiniuToken: '',
  qiniuHost: '',
})

export default immutableHandler((state = initialState, action) => {
  const { path, value } = action
  switch (action.type) {
    case SETTINGS_SET:
      return value
    case SETTINGS_MERGE:
      return state.merge(value)
    case SETTINGS_SET_IN:
      return state.setIn(path, value)
    default:
      return state
  }
})

export const settingsMerge = value => ({ type: SETTINGS_MERGE, value })
export const settingsSet = value => ({ type: SETTINGS_SET, value })
export const settingsSetIn = (path, value) => ({
  type: SETTINGS_SET_IN,
  path,
  value
})


