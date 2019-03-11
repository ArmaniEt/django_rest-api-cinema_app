import React from 'react';
import { NavLink } from 'react-router-dom';


const Card = props => {
    return (
        <div className="col-4">
            <div className="card">
                {props.image ? <img style={{width: '320px', height: '350px'}}
                                    className="card-img-top m-auto" src={props.image} alt="Movie's poster"/> : null}
                <div className="card-body">
                    <h5 className="card-title">{props.header}</h5>
                    {props.description ? <p className="card-text">{props.text}</p> : null}
                    <div className="card-footer">
                        <span>Дата выхода в прокат: {props.release_date}</span>
                        {props.finish_date ?
                            <span> Дата завершения: {props.finish_date}</span>
                            : null}
                    </div>
                    <NavLink to={props.link}>{props.link_text}</NavLink>
                </div>
            </div>
        </div>
    )
};

export default Card;