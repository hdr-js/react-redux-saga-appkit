import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from './Drawer';

import { selectors as uiSelectors, actions as uiActions } from '../../../ducks/ui'

const mapStateToProps = (state) => ({
  // isDrawerOpen: uiSelectors.isDrawerOpen(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    drawerOpen: uiActions.drawerOpen
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
