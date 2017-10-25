import request from 'superagent'
import {getPings, putUserProfile, savePing} from '../client-api'
import {showError} from './error-message'

export const RECEIVE_PINGS = 'RECEIVE_PINGS'
export const POST_PING = 'POST_PING'

export const receivePings = (pings) => {
  return {
    type: RECEIVE_PINGS,
    pings: pings
  }
}

export function fetchPings () {
  return dispatch => {
    getPings()
      .then(res => {
        dispatch(receivePings(res.body))
      })
      .catch(err => {
        dispatch(showError(err.message))
      })
  }
}

export function updateUser (newUser) {
  return {
    type: 'UPDATE_USER',
    newUser
  }
}

export function updateProfile (id, newData) {
  return dispatch => {
    putUserProfile(id, newData)
      .then(res => {
        dispatch(updateUser(res.body))
      })
      .catch(err => dispatch(showError(err.message)))
  }
}
export function postPingAsync (ping, callback) {
  return dispatch => {
    savePing(ping)
      .then(res => {
        callback()
      })
      .catch(err => {
        dispatch(showError(err.message))
      })
  }
}
