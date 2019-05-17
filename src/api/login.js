import { fetchPostLogin } from './utils.js';

export const login = ({ email, password }) => {
  const bodyObject = {
    email,
    password,
  };
  return fetchPostLogin('login', bodyObject).then(data => {
    return {
      token: data.access_token,
    };
  });
};

export const signup = ({ email, password }) => {
  const bodyObject = {
    email,
    password,
  };
  return fetchPostLogin('registration/brand_sign_up', bodyObject).then(data => {
    return {
      token: data.token,
    };
  });
};
