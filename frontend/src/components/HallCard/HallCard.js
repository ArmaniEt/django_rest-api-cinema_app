import React from 'react';
import HallDisplayCard from "../../components/UI/HallDisplayCard/HallDisplayCard";

const HallCard = function (props) {
    const {hall} = props;
    const {name, id} = hall;
    const link = {
      url: '/halls/' + id,
      text: "View more..."
    };


    return <HallDisplayCard name={name} link={link.url} link_text={link.text}/>

};

export default HallCard;