import moment from 'moment'

export function getDay(time) {
  return moment(time).format('YYYY-MM-DD')
}

function getLeftMinutes(et) {
  return Math.floor((new Date(et).getTime() - Date.now()) / 1000 / 60)
}

export function getLeftDays(time) {
  return getLeftMinutes(time) / 60 / 24
}

export function getMonths(t) {
  return (new Date(t).getTime() - Date.now()) / 1000 / 60 / 60 / 24 / 31
}

export function expired(user) {
  const endTime = user.get('end_time')
  return new Date(endTime).getTime() - Date.now() < 0
}
