import React, {Fragment, Component} from 'react';
import {MOVIES_URL} from "../../urls";
import MovieCard from "../../components/MovieCard/MovieCard";



class MovieList extends Component{

    state = {
        movies: []
    };

    componentDidMount(){
        fetch(MOVIES_URL)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Something wrong with your network request")
            }).then(movies => this.setState({movies}))
            .catch(error => console.log(error))
    }

    render(){
        return(
            <Fragment>
                {this.state.movies.map(movie => {

                })}
            </Fragment>
        )
    }
}

export default MovieList;