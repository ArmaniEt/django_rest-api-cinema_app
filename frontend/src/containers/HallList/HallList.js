import React, {Fragment, Component} from 'react';
import {HALLS_URL} from "../../urls";
import HallCard from '../../components/HallCard/HallCard';
import connect from "react-redux/es/connect/connect";
import {loadHalls} from "../../store/actions/hall-list";


class HallList extends Component {
    state = {
        halls: []
    };

    componentDidMount() {
        this.props.loadHalls()
    }

    // TODO remove hallDelete to the separate actions
    hallDelete = (hallId) => {
        fetch(HALLS_URL + hallId + '/', {
            method: "DELETE", headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        });
        this.setState(prevState => {
            let newState = {...prevState};
            let halls = [...newState.halls];
            let movieIndex = halls.findIndex(hall => hall.id === hallId);
            halls.splice(movieIndex, 1);
            newState.halls = halls;
            return newState;
        })

    };

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
                                () => this.hallDelete(hall.id) : () => this.redirectTo()}
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

});
export default connect(mapStateToProps, mapDispatchToProps)(HallList);