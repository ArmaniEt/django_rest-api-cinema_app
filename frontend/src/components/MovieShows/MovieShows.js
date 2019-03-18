import React from "react";
import moment from 'moment';


const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm')
};

const MovieShows = props => {
    return (
        <div>
            {props.shows.map(show => {
                return <div key={show.id}>
                    <li className="list-group-item mt-2">
                        <div>
                            <span>Зал: {show.hall_name}</span>
                            <p>Начало: {formatDate(show.begin_show_time)}</p>
                        </div>
                        <div>
                            <p>Окончание: {formatDate(show.finish_show_time)}</p>
                        </div>
                    </li>
                </div>
            })}
        </div>
    );
};


export default MovieShows;