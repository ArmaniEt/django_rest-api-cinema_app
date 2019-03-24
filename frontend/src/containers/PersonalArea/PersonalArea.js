import React, {Component, Fragment} from 'react';
import axios from 'axios';
import UserForm from 'components/UserForm/UserForm';


class PersonalArea extends Component{
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

     componentDidMount(){
         let username = localStorage.getItem('username');
         let email = localStorage.getItem('email');
         let first_name = localStorage.getItem('first_name');
         let last_name = localStorage.getItem('last_name');
         this.setState({
                 ...this.state,
             user: {
                 username: username,
                 email: email,
                 first_name: first_name,
                 last_name: last_name
             },
             errors: {}
         })
     }


     render() {
         const {username, email, first_name, last_name, password} = this.state.user;
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
             <UserForm personalData={this.state}/>
         </Fragment>
     }
}

export default PersonalArea;