import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectors as loginSelectors } from '../../ducks/login';
import Layout from './Layout';
import { selectors as uiSelectors } from '../../ducks/ui';

const mapStateToProps = state => ({
  loggedIn: loginSelectors.loggedIn(state),
  isDrawerOpen: uiSelectors.isDrawerOpen(state),
  drawerVariant: uiSelectors.drawerVariant(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
