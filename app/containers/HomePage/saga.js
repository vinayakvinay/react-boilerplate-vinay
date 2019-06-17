/**
 * Gets the repositories of the user from Github
 */
import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { UPDATE_USERNAME } from './constants';
import { loadRepos } from './actions';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  if (username.length <= 3) {
    return;
  }

  try {
    const res = yield call(axios.get, requestURL);
    const repos = res.data;
    yield put(loadRepos(repos));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Err ', err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* usernameData() {
  // Watches for UPDATE_USERNAME actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(UPDATE_USERNAME, getRepos);
}
