import React, {Fragment} from 'react'
import {MOVIES_URL} from "../../urls";



class MovieList {

    state = {
        movies: []
    };

    componentDidMount(){
        fetch(MOVIES_URL)
            .then(response => response.json())
            .then(json => console.log(json))
            .then(error => console.log(error))
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