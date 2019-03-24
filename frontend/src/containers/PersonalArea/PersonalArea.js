import React, {Component, Fragment} from 'react';
import axios from 'axios';
import UserForm from './../../components/UserForm/UserForm';
import {REGISTER_UPDATE_URL} from "../../urls";


class PersonalArea extends Component {

    state = {
        user: {
            'username': '',
            'password': '',
            'passwordConfirm': '',
            'email': '',
            'first_name': '',
            'last_name': ''
        },
        errors: {},
    };


    componentDidMount() {
        let username = localStorage.getItem('username');
        let email = localStorage.getItem('email');
        let first_name = localStorage.getItem('first_name');
        let last_name = localStorage.getItem('last_name');
        this.setState(prevState => {
                let newState = {...prevState};
                newState.user.username = username;
                newState.user.email = email;
                newState.user.first_name = first_name;
                newState.user.last_name = last_name;
                return newState;
            }
        )
    }

    formSubmitted = (data) => {
        let id = localStorage.getItem('id');
        return axios.patch(REGISTER_UPDATE_URL + id + '/', data, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    };


    render() {
        const {username, email, first_name, last_name, password} = this.state.user;
        const {user} = this.state;
        return <Fragment>
            <div className="card mt-4">
                <div className="card-header text-center">Личный кабинет</div>
                <div className="card-body">
                    <h5 className="card-title text-center">Добро пожаловать {username}!</h5>
                    <div className="card-text">
                        <p>{password}</p>
                        <p>Имя: {first_name}</p>
                        <p>Фамилия: {last_name}</p>
                        <p>E-mail: {email}</p>
                    </div>
                </div>
            </div>
            <h3 className="text-center mt-4">Редактировать данные</h3>
            {user ? <UserForm onSubmit={this.formSubmitted} user={user}/> : null}
        </Fragment>
    }
}

export default PersonalArea;