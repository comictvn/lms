import actions from './actions'

const initialState = {
  id: '',
  name: '',
  role: '',
  email: '',
  authorized: false,
  loading: false,
}

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
