import React, {Component, Fragment} from 'react'
import {REGISTER_SUCCESS, registerUser} from "../../store/actions/register";
import {connect} from "react-redux";
import {login, LOGIN_SUCCESS} from "../../store/actions/login";


class Register extends Component {
    state = {
        user: {
            'username': '',
            'password': '',
            'password_confirm': '',
            'email': '',
            'first_name': '',
            'last_name': ''
        },
    };

    formSubmitted = (event) => {
        event.preventDefault();
        const {username, password} = this.state.user;
        if (!this.props.loading) {
            this.props.registerUser(this.state.user).then(result => {
                if (result.type === REGISTER_SUCCESS) {
                    this.props.login(username, password).then(result => {
                       if(result.type === LOGIN_SUCCESS){
                           this.props.history.replace('/')
                       }
                    });
                }
            })
        }
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    };


    showErrors = (name) => {
        if (this.props.errors && this.props.errors[name]) {
            return this.props.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password, password_confirm, email, first_name, last_name} = this.state.user;
        return <Fragment>
            <h2 className="text-center mt-2">Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row mt-3">
                    <label className="font-weight-bold col-sm-2 m-auto">Имя пользователя:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="username" value={username}
                               onChange={this.inputChanged}/>
                        {this.showErrors('username')}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <label className="font-weight-bold col-sm-2 m-auto">Пароль:</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" value={password}
                               onChange={this.inputChanged}/>
                        {this.showErrors('password')}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <label className="font-weight-bold col-sm-2 m-auto">E-mail:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" value={email}
                               onChange={this.inputChanged}/>
                        {this.showErrors('email')}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <label className="font-weight-bold col-sm-2 m-auto">Имя:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="first_name" value={first_name}
                               onChange={this.inputChanged}/>
                        {this.showErrors('first_name')}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <label className="font-weight-bold col-sm-2 m-auto">Фамилия:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="last_name" value={last_name}
                               onChange={this.inputChanged}/>
                        {this.showErrors('last_name')}
                    </div>
                </div>
                <div className="form-row mt-3">
                    <label className="font-weight-bold col-sm-2 m-auto">Подтверждение пароля:</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password_confirm" value={password_confirm}
                               onChange={this.inputChanged}/>
                        {this.showErrors('password_confirm')}
                    </div>
                </div>
                <div className="text-center">
                    <button disabled={this.props.loading} type="submit" className="btn btn-primary mt-4">Создать учётную
                        запись
                    </button>
                </div>
            </form>
        </Fragment>
    }
}


const mapStateToProps = (state) => state.register;


const mapDispatchToProps = dispatch => ({
    registerUser: (user) => dispatch(registerUser(user)),
    login: (username, password) => dispatch(login(username, password))

});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
