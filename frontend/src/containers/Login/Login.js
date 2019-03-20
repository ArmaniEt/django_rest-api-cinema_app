import React, {Component, Fragment} from 'react';
import {BASE_URL, LOGIN_URL} from "../../urls";


class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: ""
        }
    };

    formSubmitted = (event) => {
        event.preventDefault();
        return fetch(BASE_URL + LOGIN_URL,
            {method: "POST", headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.credentials)})
            .then(response => {
                console.log(response);
                return response.json();
        }).then(token => {
                localStorage.setItem('auth-token', token.token);
                this.props.history.push('/');
            }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            credentials:
                {...this.state.credentials,
                    [event.target.name]: event.target.value
                }
        })
    };

    render() {
        const {username, password} = this.state.credentials;
        return <Fragment>
            <h2>Вход</h2>
            <form onSubmit={this.formSubmitted}>
                <div className="form-row">
                    <label className="font-weight-bold">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Войти</button>
            </form>
        </Fragment>
    }
}


export default Login;
