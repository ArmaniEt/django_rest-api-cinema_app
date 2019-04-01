import React, {Component, Fragment} from 'react';
import MovieForm from "../../components/MovieForm/MovieForm";
import {connect} from 'react-redux';
import { movieAdd, MOVIE_ADD_SUCCESS } from "../../store/actions/movie_add";

class MovieAdd extends Component {


    gatherFormData = (movie) => {
        let formData = new FormData();
        Object.keys(movie).forEach(key => {
            const value = movie[key];
            if (value) {
                if (Array.isArray(value)) {
                    value.forEach(item => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    };

    formSubmitted = (movie) => {
        const formData = this.gatherFormData(movie);
        this.props.movieAdd(formData).then((result) => {
            console.log(result);
            if (result.type === MOVIE_ADD_SUCCESS) this.props.history.replace('/movies/' + result.data.id)
        });

    };
    render() {
        return <Fragment>
            <MovieForm onSubmit={this.formSubmitted} errors={this.props.errors} loading={this.props.loading}/>
        </Fragment>
    }
}

const mapStateToProps = state => ({
    movie: state.movie,
    loading: state.loading,
    errors: state.errors
});
const mapDispatchToProps = dispatch => ({
    movieAdd: (formData) => dispatch(movieAdd(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieAdd);