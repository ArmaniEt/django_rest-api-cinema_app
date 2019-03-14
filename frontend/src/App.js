import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import MovieList from "./containers/MovieList/MovieList";
import './App.css';
import MovieDetail from './containers/MovieDetail/MovieDetail';
import MovieAdd from './containers/MovieAdd/MovieAdd';
import MovieEdit from './containers/MovieEdit/MovieEdit';
import Layout from './Layout';
import HallList from "./containers/HallList/HallList";
import HallDetail from "./containers/HallDetail/HallDetail";


class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/halls/:id" component={HallDetail}/>
                            <Route path="/halls/" component={HallList}/>
                            <Route path="/movies/create" component={MovieAdd}/>
                            <Route path="/movies/:id/edit" component={MovieEdit}/>
                            <Route path="/movies/:id" component={MovieDetail}/>
                            <Route path="/" component={MovieList}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
