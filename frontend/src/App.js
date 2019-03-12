import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import MovieList from "./containers/MovieList/MovieList";
import './App.css';
import MovieDetail from './containers/MovieDetail/MovieDetail';
import MovieAdd from './containers/MovieAdd/MovieAdd';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/movies/create" component={MovieAdd}/>
                        <Route path="/movies/:id" component={MovieDetail}/>
                        <Route path="/" component={MovieList}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
