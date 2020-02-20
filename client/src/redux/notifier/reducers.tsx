import actions from './actions'

const initialState = {
  notification: { message: 'Welcome to IWA', key: 1, variant: 'success' }
}

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
