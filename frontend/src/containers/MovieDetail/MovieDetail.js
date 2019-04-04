import React, {Fragment, Component} from 'react';
import {NavLink} from 'react-router-dom';
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import MovieShows from "../../components/MovieShows/MovieShows";
import {loadMovie} from "../../store/actions/movie-detail";
import {connect} from "react-redux";



class MovieDetail extends Component {

    componentDidMount() {
        this.props.loadMovie(this.props.match.params.id)
    }


    render() {
        const {movie, shows} = this.props.movieDetail;
        if (!movie) return null;
        return (
            <Fragment>
                <div className="col-4 m-auto">
                    <div className="card">
                        {movie.poster ?
                            <img className="card-img-top" src={movie.poster} alt="Movie's poster"/> : null}

                        <div className="card-body">
                            <h3>{movie.name}</h3>
                            {movie.categories.length > 0 ?
                                <MovieCategories categories={movie.categories}/> : null}
                                <p className="text-center m-2">Описание Фильма</p>
                            <p className="card-text">{movie.description}</p>
                            {shows.length > 0 ?
                                (<ul className="list-group">
                                    <p className="text-center m-1">Сеансы</p>
                                    <MovieShows shows={shows}/>
                                </ul>) : null}
                        </div>

                        <div className="card-footer">
                            <p>Дата выхода в прокат: {movie.release_date}</p>
                            {movie.finish_date ?
                                <p>Дата завершения: {movie.finish_date}</p> : null}
                        </div>

                        <NavLink to={'/movies/' + movie.id + '/edit'}
                                 className="btn btn-primary m-2">Edit Movie</NavLink>

                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        movieDetail: state.movieDetail,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadMovie: (id) => dispatch(loadMovie(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);