import React from 'react'


const Card = props => {
  return(
      <div className="card" style={{width: '18rem'}}>
          <img className="card-img-top" src={props.image} alt="Movie's poster"/>
          <div className="card-body">
              <h5 className="card-title">{props.header}</h5>
              <p className="card-text">{props.description}</p>

          </div>

      </div>
  )
};