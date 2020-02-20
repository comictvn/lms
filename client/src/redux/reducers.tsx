import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as reduxFormReducer } from 'redux-form';
import user from './user/reducers';
import notifier from './notifier/reducers';
import users from './users/reducers';
import assignments from './assignments/reducers';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer, // mounted under "form"
    user,
    notifier,
    users,
    assignments,
  })
 