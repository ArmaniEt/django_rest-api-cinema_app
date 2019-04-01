import React, {Component, Fragment} from 'react';
import axios from 'axios';
import UserForm from './../../components/UserForm/UserForm';
import {REGISTER_UPDATE_URL} from "../../urls";
import connect from "react-redux/es/connect/connect";


class PersonalArea extends Component {

    state = {
        success: [],
    };


    formSubmitted = (data) => {
        let id = this.props.auth.id;
        return axios.patch(REGISTER_UPDATE_URL + id + '/', data, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
            console.log(response);
            if (response.statusText === 'OK'){
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.success = ["Даннные успешно обновлены"];
                    return newState;
                })
            }
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    };


    render() {
        const {email, first_name, last_name, username} = this.props.auth;
        const {success} = this.state;
        return <Fragment>
            <div className="card mt-4">
                <div className="card-header text-center">Личный кабинет</div>
                <div className="card-body">
                    <h5 className="card-title text-center">Добро пожаловать {username}!</h5>
                    <div className="card-text">
                        <p>Имя: {first_name}</p>
                        <p>Фамилия: {last_name}</p>
                        <p>E-mail: {email}</p>
                    </div>
                </div>
            </div>
            <h3 className="text-center mt-4">Редактировать данные</h3>
            {username ? <UserForm onSubmit={this.formSubmitted} user={this.props.auth} success={success}/> : null}
        </Fragment>
    }
}

const mapStateToProps = (state) => ({auth: state.auth});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalArea);