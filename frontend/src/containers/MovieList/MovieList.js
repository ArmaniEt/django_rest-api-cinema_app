import React, {Fragment, Component} from 'react';
import {MOVIES_URL} from "../../urls";
import MovieCard from "../../components/MovieCard/MovieCard";


class MovieList extends Component {

    state = {
        movies: []
    };

    componentDidMount() {
        fetch(MOVIES_URL)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Something wrong with your network request");
            }).then(movies =>
            this.setState({movies: movies.results}))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Fragment>
                <div className='row'>
                    {this.state.movies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie}/>
                    })}
                </div>
            </Fragment>
        )
    }
}

export default MovieList;