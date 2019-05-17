import { get } from 'lodash';

const apiEndpoint = '127.0.0.1';

const HTTP_OK = 200;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_AUTHORIZED = 401;

export const checkStatus = async response => {
  if (response.status === HTTP_OK || response.status === HTTP_NO_CONTENT) {
    return response;
  }
  if (response.status === HTTP_NOT_AUTHORIZED) {
    const error = new Error('Login Failed: Username/password is incorrect.');
    error.res = response;
    error.showUser = true;
    return error;
  }
  return response;
};

export const objectToUrlParam = data => {
  return Object.keys(data)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');
};

const getSafeJSONResponse = res => {
  if (get(res, "res.headers.get('content-type').indexOf('application/json')") !== -1) {
    return res.json();
  }
  return null;
};

export const fetchGet = async (methodName, urlParam, respType = 'Inline') => {
  const responseType = `responseMetadataFormat=${respType}`;
  const endPoint = urlParam
    ? `${methodName}?${responseType}&${objectToUrlParam(urlParam)}`
    : `${methodName}?${responseType}`;
  const url = new URL(endPoint.replace(/^\/+/, ''), apiEndpoint).href;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
    .then(checkStatus)
    .then(res => getSafeJSONResponse(res));
};

export const fetchPost = async (methodName, bodyObject, urlParam, respType = 'Inline') => {
  const resType = `responseMetadataFormat=${respType}`;
  const endPoint = urlParam
    ? `${methodName}?${resType}&${objectToUrlParam(urlParam)}`
    : `${methodName}?${resType}`;
  const url = new URL(endPoint.replace(/^\/+/, ''), apiEndpoint).href;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(bodyObject),
  })
    .then(checkStatus)
    .then(res => getSafeJSONResponse(res));
};

export const fetchPut = async (methodName, bodyObject, respType = 'None') => {
  const responseType = `responseMetadataFormat=${respType}`;
  const endPoint = `${methodName}?${responseType}`;
  const url = new URL(endPoint.replace(/^\/+/, ''), apiEndpoint).href;

  return fetch(url.replace(/(?<!:)\/{2,}/g, '/'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: typeof bodyObject === 'string' ? bodyObject : JSON.stringify(bodyObject),
  })
    .then(checkStatus)
    .then(res => getSafeJSONResponse(res));
};

export const fetchDelete = async methodName => {
  const endPoint = `${methodName}?responseMetadataFormat=None`;
  const url = new URL(endPoint.replace(/^\/+/, ''), apiEndpoint).href;

  return fetch(url.replace(/(\/+)/, '/'), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
    .then(checkStatus)
    .then(res => getSafeJSONResponse(res));
};

export const fetchPostLogin = (methodName, bodyObject) => {
  return fetch(`${apiEndpoint}/${methodName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObject),
  })
    .then(checkStatus)
    .then(res => res.json());
};
