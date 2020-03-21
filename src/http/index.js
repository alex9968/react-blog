import request from '../utils/request'
import { settingsSetIn } from '../redux/modules/settings'
import _ from 'lodash'
import I from 'immutable'

const getPublicData = () => D => {
  request.get('public').then(body => {
    const { ok, settings } = body
    if (ok) {
      console.info(settings)
      //D(articlesSet(I.fromJS(_.keyBy(articles || [], 'id'))))
      D(settingsSetIn(['qiniuToken'], settings.qiniuToken))
      D(settingsSetIn(['qiniuHost'], settings.qiniuHost))
      console.info( settings)
      // D(viewSetIn(['projects'], projects))
      // D(dataMergeIn(['notification'], data))
    }
  })
}

export default getPublicData
