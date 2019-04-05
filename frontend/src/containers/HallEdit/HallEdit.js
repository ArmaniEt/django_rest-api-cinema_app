import React, {Component, Fragment} from 'react';
import HallForm from "../../components/HallForm/HallForm";
import connect from "react-redux/es/connect/connect";
import {loadHall, saveHall} from "../../store/actions/hall-edit";
import {HALL_EDIT_SUCCESS} from "../../store/actions/hall-edit";

class HallEdit extends Component {
    state = {
        hall: null,
        errors: {}
    };

    componentDidMount() {
        this.props.loadHall(this.props.match.params.id)
    }


    formSubmitted = (hall) => {
        const {auth} = this.props;
        return this.props.saveHall(hall, auth.token).then(result => {
            if(result.type === HALL_EDIT_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        })
    };

    render() {
        const {errors, hall} = this.props.hallEdit;
        return <Fragment>
            {hall ? <HallForm onSubmit={this.formSubmitted} hall={hall} errors={errors}/> : null}
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        hallEdit: state.hallEdit,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),
        saveHall: (hall, token) => dispatch(saveHall(hall, token))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(HallEdit);