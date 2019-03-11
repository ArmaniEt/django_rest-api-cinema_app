import React from 'react';
import Card from "../../components/UI/Card/Card";

const MovieCard = function (props) {

    const {name, id, description, poster, release_date, finish_date} = props.movie;
    const link = {
      url: '/movies/' + id,
      text: "Read more..."
    };


    return <Card image={poster} header={name} text={description}
                 release_date={release_date} finish_date={finish_date} link={link.url} link_text={link.text}/>

};

export default MovieCard;
