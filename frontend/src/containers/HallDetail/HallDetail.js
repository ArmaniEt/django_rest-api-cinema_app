import React, {Fragment, Component} from 'react';
import {NavLink} from 'react-router-dom';
import HallShows from "../../components/HallShows/HallShows";
import {loadHall} from "../../store/actions/hall-detail";
import {connect} from "react-redux";

class HallDetail extends Component {


    componentDidMount() {
        this.props.loadHall(this.props.match.params.id);
    }


    render() {
        const {hall, shows} = this.props.hallDetail;
        if (!hall) return null;
        return <Fragment>
            <div className="col-4 m-auto">
                <div className="card text-center mt-2">
                    <div className="card-body">
                        <h3>{hall.name}</h3>
                        {hall.seat.length > 0 ? <p>Места в зале: </p> : null}
                        {hall.seat.length > 0 ?
                            hall.seat.map(seat => {
                                return (
                                    <div key={seat.id}>
                                        <span>Ряд: {seat.row}</span> <span>Место: {seat.seat}</span>
                                    </div>
                                );
                            }) : null}
                        {shows.length > 0 ?
                            <div className="card-footer">
                                <HallShows shows={shows}/>
                            </div>
                            : null}
                        <NavLink to={'/halls/' + hall.id + '/edit'}
                                 className="btn btn-primary w-50 mt-2">Edit Hall</NavLink>
                    </div>
                </div>
            </div>
        </Fragment>
    }
}
const mapStateToProps = state => {
    return {
        hallDetail: state.hallDetail,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HallDetail);