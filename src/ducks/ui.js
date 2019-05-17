import { createActions, asyncInitialState, asyncSelectors } from './utils';

export const { types, actions } = createActions(
  {
    drawerOpen: drawerVariant => drawerVariant,
  },
  'ui',
);

const initialState = asyncInitialState({
  drawer: {
    open: false,
    variant: '',
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.drawerOpen: {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          open: true,
          variant: action.data,
        },
      };
    }
    default:
      return state;
  }
};

const asyncSelector = asyncSelectors(state => state.ui, {});

const syncSelector = {
  isDrawerOpen: state => (state.ui.drawer ? state.ui.drawer.open : false),
  drawerVariant: state => (state.ui.drawer ? state.ui.drawer.variant : ''),
};

export const selectors = Object.assign({}, asyncSelector, syncSelector);
