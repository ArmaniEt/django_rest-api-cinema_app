import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import MovieList from "./containers/MovieList/MovieList";
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={MovieList}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
