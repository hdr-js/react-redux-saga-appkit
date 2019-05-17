import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as loginActions } from '../../../ducks/login';
import AppBar from './AppBar';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: loginActions.logout,
},
dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppBar);
