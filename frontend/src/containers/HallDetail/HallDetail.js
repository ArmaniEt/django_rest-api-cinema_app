import React, {Fragment, Component} from 'react';
import {HALLS_URL} from "../../urls";
import {NavLink} from 'react-router-dom';

class HallDetail extends Component {

    state = {
        hall: null
    };

    componentDidMount() {
        const match = this.props.match;
        fetch(HALLS_URL + match.params.id)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Wrong network request")
            }).then(hall => this.setState({hall}))
            .catch(error => console.log(error))
    }

    render() {
        if (!this.state.hall) return null;
        return <Fragment>
            <div className="col-4 m-auto">
                <div className="card">
                    <div className="card-body">
                        <h3>{this.state.hall.name}</h3>
                        {this.state.hall.seat.length > 0 ? <p>Места в зале: </p> : null}
                        {this.state.hall.seat.length > 0 ?
                            this.state.hall.seat.map(seat => {
                                return (
                                    <div key={seat.id}>
                                        <span>Ряд: {seat.row}</span> <span>Место: {seat.seat}</span>
                                    </div>
                                );
                            }) : null}

                        <div className="card-footer">
                        </div>
                        <NavLink to={'/halls/' + this.state.hall.id + '/edit'}
                                 className="btn btn-primary mr-2">Edit Hall</NavLink>
                    </div>
                </div>
            </div>
        </Fragment>
    }
}
export default HallDetail;