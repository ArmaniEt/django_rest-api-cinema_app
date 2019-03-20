import React, {Component, Fragment} from 'react';
import {HALLS_URL} from "../../urls";
import HallForm from "../../components/HallForm/HallForm";
import axios from 'axios';


class HallAdd extends Component {

    state = {
        alert: null
    };

    showErrorAlert = (error) => {
        console.log(error);
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: 'Hall was not added!'};
            return newState;
        })
    };

    gatherFormData = (hall) => {
        let formData = new FormData();
        Object.keys(hall).forEach(key => {
            const value = hall[key];
            if (value) formData.append(key, value);
        });
        return formData;
    };

    formSubmitted = (hall) => {
        const formData = this.gatherFormData(hall);
        return axios.post(HALLS_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        })
            .then(response => {
                const hall = response.data;
                console.log(hall);
                this.props.history.replace('/halls/' + hall.id);
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.showErrorAlert(error.response);
            });
    };

    render() {
        const alert = this.state.alert;
        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            <HallForm onSubmit={this.formSubmitted}/>
        </Fragment>
    }
}

export default HallAdd;