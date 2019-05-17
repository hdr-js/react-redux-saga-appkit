const constructType = (namespace, key, lifecycle = 'none') => {
  if (lifecycle === 'none') {
    return `${namespace}_${key}`;
  }
  return `${namespace}_${key}.${lifecycle}`;
};

export const createActions = (actionCreators, namespace) => {
  let { asyncs, ...syncs } = actionCreators;
  if (!asyncs) {
    asyncs = {};
  }
  if (!Object.entries) {
    Object.entries = obj => {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i);
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }
      return resArray;
    };
  }

  const sagas = Object.entries(asyncs).reduce(
    (acc, [key]) => ({
      ...acc,
      [key]: {
        success: payload => ({
          type: constructType(namespace, key, 'success'),
          name: key,
          lifecycle: 'success',
          payload,
        }),
        failure: error => ({
          type: constructType(namespace, key, 'failure'),
          name: key,
          lifecycle: 'failure',
          error,
        }),
      },
    }),
    {},
  );

  asyncs = Object.entries(asyncs).reduce(
    (acc, [key, func]) => ({
      ...acc,
      [key]: (...args) => ({
        type: constructType(namespace, key),
        name: key,
        lifecycle: 'request',
        data: func(...args),
      }),
    }),
    {},
  );

  syncs = Object.entries(syncs).reduce(
    (acc, [key, func]) => ({
      ...acc,
      [key]: (...args) => ({
        type: constructType(namespace, key),
        name: key,
        lifecycle: 'none',
        data: func(...args),
      }),
    }),
    {},
  );

  const sagaTypes = Object.entries(sagas).reduce(
    (acc, [key, sagaActions]) => ({
      ...acc,
      [key]: Object.entries(sagaActions).reduce(
        (sagaActionAcc, [lifecycle]) => ({
          ...sagaActionAcc,
          [lifecycle]: constructType(namespace, key, lifecycle),
        }),
        {},
      ),
    }),
    {},
  );

  const types = Object.entries({ ...syncs, ...asyncs }).reduce(
    (acc, [key]) => ({
      ...acc,
      [key]: constructType(namespace, key),
    }),
    { saga: sagaTypes },
  );

  const actions = { ...syncs, ...asyncs, saga: sagas };

  return { types, actions };
};

export const asyncInitialState = (initialData = null) => {
  return {
    fetched: false,
    loading: false,
    detailLoading: false,
    error: null,
    data: initialData,
    notifications: {},
  };
};

export const asyncOnRequest = (state, action) => ({
  ...state,
  error: null,
  notifications: {},
  loading: !action.type.includes('subOp_'),
  [`${action.name}_loading`]: true,
});

export const asyncOnSuccess = (state, action, map, notification) => {
  const notifications = { [action.name]: true, ...(notification || {}) };

  notifications.clear = () => {
    notifications[action.name] = false;
  };

  return {
    ...state,
    fetched: true,
    loading: false,
    [`${action.name}_loading`]: false,
    notifications,
    data: map(state.data, action),
  };
};

export const asyncOnError = (state, action) => ({
  ...state,
  loading: false,
  [`${action.name}_loading`]: false,
  error: action.error,
});

export const asyncSelectors = (getState, dataSelectors) => {
  const selectors = Object.entries(dataSelectors).reduce(
    (acc, [key, func]) => ({
      ...acc,
      [key]: (state, ...args) => {
        const { fetched, data } = getState(state);
        return fetched ? func(data, ...args) : data[key];
      },
    }),
    {},
  );
  return {
    ...selectors,
    isFetched: state => getState(state).fetched,
    isLoading: state => getState(state).loading,
    error: state => getState(state).error,
  };
};

export const syncSelectors = (getState, dataSelectors) => {
  const selectors = Object.entries(dataSelectors).reduce(
    (acc, [key, func]) => ({
      ...acc,
      [key]: (state, ...args) => {
        return func(getState(state, ...args));
      },
    }),
    {},
  );
  return selectors;
};
