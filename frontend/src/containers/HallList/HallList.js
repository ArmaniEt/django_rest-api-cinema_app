import React, {Fragment, Component} from 'react';
import HallCard from '../../components/HallCard/HallCard';
import connect from "react-redux/es/connect/connect";
import {loadHalls} from "../../store/actions/hall-list";
import {hallDelete} from "../../store/actions/hall-delete";


class HallList extends Component {

    componentDidMount() {
        this.props.loadHalls()
    }

    redirectTo = () => {
        this.props.history.push('/login')
    };

    render() {
        return (
            <Fragment>
                <div className='row'>
                    {this.props.halls.map(hall => {
                        return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3' key={hall.id}>
                            <HallCard onDelete={localStorage.getItem('auth-token') ?
                                () => this.props.deleteHall(hall.id) : () => this.redirectTo()}
                                      hall={hall}/>
                        </div>
                    })}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => state.hallList;
const mapDispatchToProps = (dispatch) => ({
    loadHalls: () => dispatch(loadHalls()),
    deleteHall: (id) => dispatch(hallDelete(id))

});
export default connect(mapStateToProps, mapDispatchToProps)(HallList);