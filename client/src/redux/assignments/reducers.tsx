import actions from './actions';
import update from 'immutability-helper';

const initialState: any = {
  list: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  detail: {
    data: null,
    loading: false,
    error: null,
    update: {
      updating: false,
      error: null,
    },
  },
  create: {
    creating: false,
    error: null,
    data: null
  },
};

export default function assignmentsReducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.SET_STATE:
      return update(state, action.payload);
    case actions.RESET_STATE:
      return update(state, {
        [action.payload.field]: { $set: initialState[action.payload.field] },
      });
    default:
      return state;
  }
}
