import React from "react";


const MovieShows = props => {
    return (
        <div>
            {props.shows.map(show => {
                return <div>
                    <li className="list-group-item mt-2">
                        <div>
                            <p>Дата начала: {new Date(show.begin_show_time).toISOString().slice(0, 10)}</p>
                            <p>{new Date(show.begin_show_time).toLocaleTimeString()}</p>
                        </div>
                        <div>
                            <p>Дата окончания: {new Date(show.finish_show_time).toISOString().slice(0, 10)}</p>
                            <p>{new Date(show.finish_show_time).toLocaleTimeString()}</p>
                        </div>
                    </li>
                </div>
            })}
        </div>
    );
};


export default MovieShows;