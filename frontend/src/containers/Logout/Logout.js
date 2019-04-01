import React, {Component} from 'react';
import {logout} from './../../store/actions/logout'
import {connect} from "react-redux";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
        this.props.history.replace('/');

    };

    render() { return <h2>Выход</h2>; }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Logout);

