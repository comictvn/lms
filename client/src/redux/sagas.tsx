import { all } from 'redux-saga/effects'
import user from './user/sagas'
import users from './users/sagas'
import assignments from './assignments/sagas'

export default function* rootSaga() {
  yield all([user(), users(), assignments()])
}
