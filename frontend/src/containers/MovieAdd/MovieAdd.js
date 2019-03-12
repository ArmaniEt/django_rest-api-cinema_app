import React, {Component} from 'react';
import {CATEGORIES_URL} from "../../urls";
import {MOVIES_URL} from "../../urls";
import DatePicker from "react-datepicker";


class MovieAdd extends Component {

    state = {
        movie: {
            name: "",
            description: "",
            release_date: "",
            finish_date: "",
            categories: []

        },
        categories: [],
        alert: null,
        submitDisabled: false
    };

    componentDidMount() {

        fetch(CATEGORIES_URL)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Something wrong with your network request");
            }).then(categories => this.setState(prevState => {
            let newState = {...prevState};
            newState.categories = categories.results;
            return newState;
        }))
            .catch(error => console.log(error))

    }

    updateMovieState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let movie = {...prevState.movie};
            movie[fieldName] = value;
            newState.movie = movie;
            return newState;
        })
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateMovieState(fieldName, value);
    };

    dateChanged = (field, date) => {
        console.log(date);
        this.updateMovieState(field, date.toISOString().slice(0, 10));

    };

    selectChanged = (event) => {
        const value = [];
        const fieldName = event.target.name;
        const options = event.target.options;
        for(let i = 0; i  < options.length; i++){
            if(options[i].selected) value.push(+options[i].value)
        }
        this.updateMovieState(fieldName, value);

    };

    formSubmitted = (event) => {
        event.preventDefault();
        console.log(this.state);

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
        });


        const data = JSON.stringify(this.state.movie);
        const headers = {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        };
        fetch(MOVIES_URL, {method: "POST", body: data, headers})
            .then(response => {
                if (response.status === 201) return response.json();
                throw new Error("Movie was not created");
            }).then( movie => this.setState( this.props.history.replace('/movies/' + movie.id)
            ))
            .catch(error =>
                console.log(error));
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Movie was not added!`};
                    return newState;
                })

    };


    render() {

        const {name, description, release_date, finish_date, categories} = this.state.movie;
        let alert = null;
        if(this.state.alert){
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        const release_date_selected = release_date ? new Date(release_date) : null;
        const finish_date_selected = finish_date ? new Date(finish_date) : null;

        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input className="form-control" type="text" name="name" value={name} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input className="form-control" type="text" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дата выхода в прокат:</label>
                    <DatePicker selected={release_date_selected} name="release_date"
                                className="form-control" onChange={(date) => this.dateChanged('release_date', date)}/>
                </div>
                <div className="form-group">
                    <label>Дата завершения проката:</label>
                    <DatePicker selected={finish_date_selected} className="form-control" name="finish_date"
                                onChange={(date) => this.dateChanged('finish_date', date)}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Категории</label>
                    <select multiple name="categories" onChange={this.selectChanged}>
                        {this.state.categories.map(category => {
                            return <option selected={category.id in categories}
                                           value={category.id}>{category.name}</option>
                        })}
                    </select>
                </div>

                <button disabled={this.state.submitDisabled}
                        className="btn btn-primary" type="submit">Сохранить</button>
            </form>
        </div>
    }
}

export default MovieAdd;