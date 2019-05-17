import {
  createActions,
  asyncInitialState,
  asyncOnRequest,
  asyncOnSuccess,
  asyncSelectors,
  asyncOnError,
} from './utils';

export const { types, actions } = createActions(
  {
    logout: () => null,
    asyncs: {
      login: fields => fields,
      signup: fields => fields,
    },
  },
  'login',
);

const initialState = asyncInitialState({
  loggedIn: sessionStorage.getItem('token') !== null,
  token: sessionStorage.getItem('token'),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.login:
    case types.signup:
      return asyncOnRequest(state, action);
    case types.saga.signup.success:
    case types.saga.login.success:
      return asyncOnSuccess(state, action, (data, successAction) => {
        const { token } = successAction.payload;
        const loggedIn = token && true;
        if (loggedIn) sessionStorage.setItem('token', token || null);
        else sessionStorage.removeItem('token');
        return {
          loggedIn,
          token,
        };
      });
    case types.saga.login.failure:
    case types.saga.signup.failure:
      return asyncOnError(state, action);

    case types.logout:
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('token_type');
      return {
        ...state,
        data: {
          ...state.data,
          loggedIn: false,
          token: null,
        },
      };
    default:
      return state;
  }
};

export const selectors = Object.assign(
  {},
  {
    ...asyncSelectors(state => state.login, {
      loggedIn: data => (data !== null && data !== undefined ? data.loggedIn : false),
    }),
    loading: state => state.login.loading,
  },
);
