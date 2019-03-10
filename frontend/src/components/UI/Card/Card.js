import React from 'react'


const Card = props => {
  return(
      <div className="card" style={{width: '18rem'}}>
          {props.image ? <img className="card-img-top" src={props.image} alt="Movie's poster"/> : null}
          <div className="card-body">
              <h5 className="card-title">{props.header}</h5>
              {props.description ? <p className="card-text">{props.text}</p> : null}
              <div className="card-footer">
                  <span>Дата выхода в прокат: {props.release_date}</span>
                  {props.finish_date ? <span>Дата завершения: {props.finish_date}</span> : null}
              </div>
              <a href="#">{props.link}</a>
          </div>
      </div>
  )
};

export default Card;