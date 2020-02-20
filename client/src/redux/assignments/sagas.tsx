import { all, takeEvery, put, call } from 'redux-saga/effects';
import { fetchList, fetchDetail, updateDetail, create } from 'services/assignment';
import actions from './actions';

export function* FETCH_LIST({ payload = {} }: any = {}) {
  const { filters } = payload;
  yield put({
    type: actions.SET_STATE,
    payload: {
      list: {
        $merge: {
          loading: true,
          data: [],
          error: null,
        },
      },
    },
  });

  try {
    const {
      data: { data, meta },
    } = yield call(fetchList, filters);
    yield put({
      type: actions.SET_STATE,
      payload: {
        list: {
          $merge: {
            data,
            meta,
          },
        },
      },
    });
  } catch (error) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        list: { $merge: { error } },
      },
    });
  } finally {
    yield put({
      type: actions.SET_STATE,
      payload: {
        list: { $merge: { loading: false } },
      },
    });
  }
}

export function* FETCH_DETAIL({ payload = {} }: any = {}) {
  const { id } = payload;
  yield put({
    type: actions.SET_STATE,
    payload: {
      detail: {
        $merge: {
          loading: true,
          data: null,
          error: null,
        },
      },
    },
  });

  try {
    const {
      data: { data },
    } = yield call(fetchDetail, id);
    yield put({
      type: actions.SET_STATE,
      payload: {
        detail: {
          $merge: {
            data,
          },
        },
      },
    });
  } catch (error) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        detail: { $merge: { error } },
      },
    });
  } finally {
    yield put({
      type: actions.SET_STATE,
      payload: {
        detail: { $merge: { loading: false } },
      },
    });
  }
}

export function* UPDATE_DETAIL({ payload = {} }: any = {}) {
  const { data, onSuccess, onError } = payload;
  yield put({
    type: actions.SET_STATE,
    payload: {
      detail: {
        update: {
          $merge: {
            updating: true,
            error: null,
          },
        },
      },
    },
  });

  try {
    const response = yield call(updateDetail, data);
    onSuccess(response);
  } catch (error) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        detail: { update: { $merge: { error } } },
      },
    });
    onError(error);
  } finally {
    yield put({
      type: actions.SET_STATE,
      payload: {
        detail: { update: { $merge: { updating: false } } },
      },
    });
  }
}

export function* CREATE({ payload = {} }: any = {}) {
  const { data, onSuccess, onError } = payload;
  yield put({
    type: actions.SET_STATE,
    payload: {
      create: {
        $merge: {
          creating: true,
          error: null,
        },
      },
    },
  });

  try {
    const response = yield call(create, data);
    onSuccess(response);
  } catch (error) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        create: { $merge: { error } },
      },
    });
    onError(error);
  } finally {
    yield put({
      type: actions.SET_STATE,
      payload: {
        create: { $merge: { creating: false } },
      },
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_LIST, FETCH_LIST),
    takeEvery(actions.FETCH_DETAIL, FETCH_DETAIL),
    takeEvery(actions.UPDATE_DETAIL, UPDATE_DETAIL),
    takeEvery(actions.CREATE, CREATE),
  ]);
}
