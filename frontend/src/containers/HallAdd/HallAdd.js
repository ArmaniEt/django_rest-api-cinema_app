import React, {Component, Fragment} from 'react';
import {HALLS_URL} from "../../urls";
import HallForm from "../../components/HallForm/HallForm";
import axios from 'axios';
import {movieAdd} from "../../store/actions/movie_add";
import connect from "react-redux/es/connect/connect";
import {HALL_ADD_SUCCESS, hallAdd} from "../../store/actions/hall-add";


class HallAdd extends Component {



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
        this.props.hallAdd(formData).then((result) => {
            console.log(result);
            if(result.type === HALL_ADD_SUCCESS) this.props.history.replace('/halls/' + result.data.id)
        })
    };

    render() {
        return <Fragment>
            <HallForm loading={this.props.loading} onSubmit={this.formSubmitted} errors={this.props.errors}/>
        </Fragment>
    }
}

const mapStateToProps = state => state.hall;

const mapDispatchToProps = dispatch => ({
    hallAdd: (formData) => dispatch(hallAdd(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(HallAdd);