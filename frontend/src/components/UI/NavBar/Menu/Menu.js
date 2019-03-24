import React, {Component, Fragment} from 'react';
import MenuItem from '../Menu/MenuItem/MenuItem';


class Menu extends Component {

    state = {
        menuCollapse: true,
    };

    toggle = () => {
        this.setState({menuCollapse: !this.state.menuCollapse})
    };


    render() {
        const username = localStorage.getItem('username');
        const isAdmin = localStorage.getItem('is_admin');
        return <Fragment>
            <button onClick={this.toggle}
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className={(this.state.menuCollapse ? "collapse" : "") + " navbar-collapse"} id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <MenuItem to="/">Фильмы</MenuItem>
                    {isAdmin === 'true' ? <MenuItem to="/movies/create">Добавить фильм</MenuItem> : null}
                    <MenuItem to='/halls/'>Залы</MenuItem>
                    {isAdmin === 'true' ? <MenuItem to='/halls/create'>Добавить зал</MenuItem> : null}

                </ul>
                <ul className='navbar-nav ml-auto'>

                    {username ? [

                            <MenuItem to="/personal" key="personal">Личный кабинет</MenuItem>,
                            <MenuItem to="/logout" key="logout">Выйти</MenuItem>
                        ]
                        : [
                            <MenuItem key='login' to="/login">Войти</MenuItem>,
                            <MenuItem key='register' to="/register">Зарегистрироваться</MenuItem>
                        ]}
                </ul>
            </div>
        </Fragment>
    }
}


export default Menu;