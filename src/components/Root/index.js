import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Root from './Root';
import { selectors as loginSelectors } from '../../ducks/login';

const mapStateToProps = state => ({
  loggedIn: loginSelectors.loggedIn(state),
  isLoading: loginSelectors.loading(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
