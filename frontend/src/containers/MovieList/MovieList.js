import React, {Fragment, Component} from 'react';
import MovieCard from "../../components/MovieCard/MovieCard";
import {loadMovies} from "../../store/actions/movie-list";
import {connect} from "react-redux";
import {movieDelete} from "../../store/actions/movie-delete";


class MovieList extends Component {

    componentDidMount() {
        this.props.loadMovies();
    }

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
                                (() => this.props.movieDelete(movie.id)) : () => this.redirectTo()}
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
    loadMovies: () => dispatch(loadMovies()),
    movieDelete: (movieId) => dispatch(movieDelete(movieId))

});
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);