import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from './Login';
import { selectors as loginSelectors, actions as loginActions } from '../../../ducks/login';

const mapStateToProps = state => ({
  loggedIn: loginSelectors.loggedIn(state),
  isLoading: loginSelectors.loading(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login: loginActions.login,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
