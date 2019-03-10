import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={MovieList}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
