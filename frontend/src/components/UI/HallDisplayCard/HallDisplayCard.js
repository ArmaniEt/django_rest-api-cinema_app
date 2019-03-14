import React from 'react';
import {NavLink} from 'react-router-dom';

const HallDisplayCard = props => {
    return(
        <div className="card text-center">
            <div className="card-header">
                {props.name}
            </div>
            <div className="card-body">
                <NavLink to={props.link}>{props.link_text}</NavLink>
                <button onClick={props.deleteHall} type="button" className="btn-block btn-primary">Удалить зал</button>
            </div>
            {/*<div className="card-footer text-muted">*/}
                {/*2 days ago*/}
            {/*</div>*/}
        </div>
    )
};

export default HallDisplayCard;



