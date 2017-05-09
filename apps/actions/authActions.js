import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import { SIGNIN_URL, SIGNUP_URL } from '../api';
import { addAlert } from './alertsActions';

exports.loginUser = (email, password) => {
  return function (dispatch) {
    return axios.post(SIGNIN_URL, { email, password }).then((response) => {
      const { user_id, token } = response.data;
      Keychain.setGenericPassword(user_id, token)
        .then(function () {
          dispatch(authUser(user_id));
        }).catch((error) => {
      dispatch(addAlert('Could not login #1'));
      });
    }).catch((error) => {
      dispatch(addAlert('Could not login #2'));
    });
  };
};
exports.signupUser = (email, password) => {
  return function (dispatch) {
    return axios.post(SIGNUP_URL, { email, password }).then((response) => {
      const { user_id, token } = response.data;
      Keychain.setGenericPassword(user_id, token)
        .then(function () {
          dispatch(authUser(user_id));
        }).catch((error) => {
      dispatch(addAlert('Could not login'));
      });
    }).catch((error) => {
      dispatch(addAlert('Could not signup'));
    });
  };
};

authUser = (user_id) => {
  return {
    type: 'AUTH_USER',
    user_id
  };
};

exports.unauthUser = {
  type: 'UNAUTH_USER'
};
