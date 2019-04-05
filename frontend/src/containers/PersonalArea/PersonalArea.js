import React, {Component, Fragment} from 'react';
import UserForm from './../../components/UserForm/UserForm';
import connect from "react-redux/es/connect/connect";
import {userUpdate} from "../../store/actions/personal-area";


class PersonalArea extends Component {


    formSubmitted = (data) => {
        let id = this.props.auth.id;
        console.log(id);
        this.props.userUpdate(data, id);

    };

    render() {
        const {email, first_name, last_name, username} = this.props.auth;
        const {success, loading} = this.props.success;
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
            {username ? <UserForm onSubmit={this.formSubmitted}
                                  user={this.props.auth} success={success} loading={loading}/> : null}
        </Fragment>
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    success: state.updateUser

});
const mapDispatchToProps = dispatch => ({
    userUpdate: (data, id) => dispatch(userUpdate(data, id))

});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalArea);