import React, {Fragment, Component} from 'react';
import {MOVIES_URL, SHOWS_URL} from "../../urls";
import {NavLink} from 'react-router-dom';
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import MovieShows from "../../components/MovieShows/MovieShows";

const currentDate = new Date().toISOString().slice(0, 10);
const tempDate = new Date();
tempDate.setDate(tempDate.getDate() + 3);
const threeDaysAfter = new Date(tempDate).toISOString().slice(0, 10);

class MovieDetail extends Component {

    state = {
        movie: null,
        shows: []
    };

    componentDidMount() {
        console.log(currentDate);
        console.log(threeDaysAfter);
        const match = this.props.match;
        fetch(MOVIES_URL + match.params.id)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Wrong network request")
            }).then(movie => this.setState({movie}))
            .catch(error => console.log(error));
        this.showsRequest(match.params.id)
    }

    showsRequest = (movieId) => {
        fetch(`${SHOWS_URL}?movie_id=${movieId}
        &hall_id=&starts_after=${currentDate}&starts_before=${threeDaysAfter}`)
            .then(response => {
                if (!response) throw new Error("No shows for this date range");
                if (response && response.ok) {
                    return response.json();
                } else {
                    throw new Error("Wrong network request")
                }
            }).then(shows => this.setState({shows}))
    };

    render() {
        if (!this.state.movie) return null;
        return (
            <Fragment>
                <div className="col-4 m-auto">
                    <div className="card">
                        {this.state.movie.poster ?
                            <img className="card-img-top" src={this.state.movie.poster} alt="Movie's poster"/> : null}
                        <div className="card-body">
                            <h3>{this.state.movie.name}</h3>
                            {this.state.movie.categories.length > 0 ?
                                <MovieCategories categories={this.state.movie.categories}/> : null}
                            <p className="card-text">{this.state.movie.description}</p>
                            {this.state.shows.length > 0 ?
                                (<ul className="list-group">
                                    <p>Сеансы:</p>
                                    <MovieShows shows={this.state.shows}/>
                                </ul>) : null}
                        </div>

                        <div className="card-footer">
                            <p>Дата выхода в прокат: {this.state.movie.release_date}</p>
                            <p>Дата завершения: {this.state.movie.finish_date}</p>
                        </div>
                        <NavLink to={'/movies/' + this.state.movie.id + '/edit'}
                                 className="btn btn-primary mr-2">Edit</NavLink>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MovieDetail;