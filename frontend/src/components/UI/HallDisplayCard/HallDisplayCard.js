import React from 'react';


const HallDisplayCard = props => {
    return(
        <div className="card text-center">
            <div className="card-header">
                {props.name}
            </div>
            <div className="card-body">
                <p className="card-text">{props.seats.map(seat => {
                    return (
                        <div>
                            <span>Ряд: {seat.row}</span> <span>Место: {seat.seat}</span>
                        </div>
                    )
                })}</p>
                <a href="#" className="btn btn-primary">Удалить зал</a>
            </div>
            {/*<div className="card-footer text-muted">*/}
                {/*2 days ago*/}
            {/*</div>*/}
        </div>
    )
};

export default HallDisplayCard;



