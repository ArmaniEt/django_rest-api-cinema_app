import React, {Component} from 'react';

class Logout extends Component {
    componentDidMount(){
        localStorage.removeItem('auth-token');
        localStorage.removeItem('username');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('is_staff');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        this.props.history.replace('/');

    };

    render(){return <h2>Выход</h2>;}
}

export default Logout;

