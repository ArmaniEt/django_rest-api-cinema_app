import React, {Component, Fragment} from 'react'
import axios from 'axios';
import {LOGIN_URL, REGISTER_URL} from "../../urls";


class Register extends Component {
    state = {
        user: {
            'username': '',
            'password': '',
            'passwordConfirm': '',
            'email': '',
            'first_name': '',
            'last_name': ''
        },
        errors: {}
    };

    passwordsMatch = () => {
        const {password, passwordConfirm} = this.state.user;
        return password === passwordConfirm;
    };

    formSubmitted = (event) => {
        event.preventDefault();
        if (this.passwordsMatch()) {
            const {username, password, email, first_name, last_name} = this.state.user;
            const data = {username, password, email, first_name, last_name};
            return axios.post(REGISTER_URL, data).then(response => {
                console.log(response);
                this.performLogin(username, password);
            }).catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({
                    ...this.state,
                    errors: error.response.data
                })
            });
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

    performLogin = (username, password) => {
        axios.post(LOGIN_URL, {username, password}).then(response => {
            console.log(response);
            localStorage.setItem('auth-token', response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('first_name', response.data.first_name);
            localStorage.setItem('last_name', response.data.last_name);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('is_admin', response.data.is_admin);
            localStorage.setItem('is_staff', response.data.is_staff);
            this.props.history.replace('/');

        }).catch(error => {
            console.log(error);
            console.log(error.response);
            this.props.history.replace({
                pathname: '/login/',
                state: {next: '/'}
            })
        })

    };

    passwordConfirmChange = (event) => {
        this.inputChanged(event);
        const password = this.state.user.password;
        const passwordConfirm = event.target.value;
        const errors = (password === passwordConfirm) ? [] : ['Password do not match'];
        this.setState({
            errors: {
                ...this.state.errors,
                passwordConfirm: errors
            }
        })
    };

    showErrors = (name) => {
        if (this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password, passwordConfirm, email, first_name, last_name} = this.state.user;
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
                        <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                               onChange={this.passwordConfirmChange}/>
                        {this.showErrors('passwordConfirm')}
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-4">Создать учётную запись</button>
                </div>
            </form>
        </Fragment>
    }
}


export default Register
