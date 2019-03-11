import React, {Fragment, Component} from 'react';
import {MOVIES_URL} from "../../urls";
import { NavLink } from 'react-router-dom';


class MovieDetail extends Component {

    state = {
        movie: null
    };

    componentDidMount() {
        const match = this.props.match;
        fetch(MOVIES_URL + match.params.id)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Wrong network request")
            }).then(movie => this.setState({movie}))
            .catch(error => console.log(error))
    }

    render() {
        if (!this.state.movie) return null;
        return (
            <Fragment>
                <div className="col-4 m-auto">
                    <div className="card">
                        <img className="card-img-top" src={this.state.movie.poster} alt="Movie's poster"/>
                        <div className="card-body">
                            <h3>{this.state.movie.name}</h3>
                            <p className="card-text">{this.state.movie.description}</p>
                        </div>
                        <div className="card-footer">
                            <p>Дата выхода в прокат: {this.state.movie.release_date}</p>
                            <p>Дата завершения: {this.state.movie.finish_date}</p>
                        </div>
                        <NavLink to="/">Back To Movies</NavLink>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MovieDetail;