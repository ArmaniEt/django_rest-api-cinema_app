import {NavLink} from 'react-router-dom'
import React from 'react';

class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="bg-dark rounded mb-2">
                    <ul className="nav p-2">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to={'/'}>На главную</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" to={'/movies/create'}>Добавить фильм</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" to={'/halls/'}>Залы</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" to={'/halls/create'}>Добавить зал</NavLink>
                        </li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;
