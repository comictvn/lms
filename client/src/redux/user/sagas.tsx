import { all, takeEvery, put, call } from 'redux-saga/effects'
import { login } from 'services/user/login'
import { me } from 'services/user/me'
import { logout } from 'services/user/logout'
import actions from './actions'
 
export function* LOGIN({ payload } : any) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    yield call(login, email, password)
    yield put({
      type: 'notifier/SET_STATE',
      payload: { notification: { message: 'Login success', variant: 'success', key: Date.now() } }
    })

    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  } catch (error) {
    yield put({
      type: 'notifier/SET_STATE',
      payload: { notification: { message: error.data.message, variant: 'error', key: Date.now() } }
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  try {
    const response = yield call(me)
    console.log(response.data.data.attributes)
    const { id, email, role } = response.data.data.attributes
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id: id,
        name: email,
        email: email,
        role: role,
        authorized: true,
      },
    })
  } catch (error) {}

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
