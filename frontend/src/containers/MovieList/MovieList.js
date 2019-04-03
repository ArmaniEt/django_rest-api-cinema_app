import React, {Fragment, Component} from 'react';
import {MOVIES_URL} from "../../urls";
import MovieCard from "../../components/MovieCard/MovieCard";
import {loadMovies} from "../../store/actions/movie-list";
import {connect} from "react-redux";


class MovieList extends Component {

    state = {
        movies: [],
    };

    componentDidMount() {
        this.props.loadMovies();
    }

    movieDelete = (movieId) => {
        fetch(MOVIES_URL + movieId + '/', {
            method: "DELETE", headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        });
        this.setState(prevState => {
            let newState = {...prevState};
            let movies = [...newState.movies];
            let movieIndex = movies.findIndex(movie => movie.id === movieId);
            movies.splice(movieIndex, 1);
            newState.movies = movies;
            return newState;
        })

    };

    redirectTo = () => {
        this.props.history.push('/login')
    };

    render() {
        return (
            <Fragment>
                <div className='row'>
                    {this.props.movies.map(movie => {
                        return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={movie.id}>
                            <MovieCard onDelete={localStorage.getItem('auth-token') ?
                                (() => this.movieDelete(movie.id)) : () => this.redirectTo()}
                                       movie={movie}/>
                        </div>
                    })}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => state.movieList;
const mapDispatchToProps = (dispatch) => ({
    loadMovies: () => dispatch(loadMovies())

});
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);