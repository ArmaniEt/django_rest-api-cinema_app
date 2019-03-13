import React, {Component} from 'react';
import {CATEGORIES_URL} from "../../urls";
import {MOVIES_URL} from "../../urls";
import DatePicker from "react-datepicker";
import Select from 'react-select';


class MovieAdd extends Component {

    state = {
        movie: {
            name: "",
            description: "",
            release_date: "",
            finish_date: "",
            poster: null,
            categories: []

        },
        fileName: "",

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
            newState.categories = categories;
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

    selectChanged = (value, fieldName) => {
        const category_value = value.map(item => item.value);
        this.updateMovieState(fieldName, category_value);

    };

    fileChanged = (event) => {
        const fileName = event.target.value;
        const fieldName = event.target.name;
        const fileObject = event.target.files.length > 0 ? event.target.files[0] : null;
        this.updateMovieState(fieldName, fileObject);
        this.setState(prevState => {
            let newState = {...prevState};
            newState.fileName = fileName;
            return newState;
        })
    };

    formSubmitted = (event) => {
        event.preventDefault();
        console.log(this.state);

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
        });


        let data = new FormData();
        Object.keys(this.state.movie).forEach(key => {
            const value = this.state.movie[key];
            if(value && value.toString() !== "") {
                data.append(key, this.state.movie[key])
            }
        });
        fetch(MOVIES_URL, { method: "POST", body: data}).then(response => {
                if (response.ok) return response.json();
                throw new Error("Movie was not created");
            }).then(movie => ( this.props.history.replace('/movies/' + movie.id)
            )).catch(error =>
                console.log(error));
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Movie was not added!`};
                    return newState;
                })

    };


    render() {

        const {name, description, release_date, finish_date} = this.state.movie;
        let alert = null;
        if(this.state.alert){
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        const release_date_selected = release_date ? new Date(release_date) : null;
        const finish_date_selected = finish_date ? new Date(finish_date) : null;

        const select_options = this.state.categories.map(category => {
            return {value: category.id, label: category.name};
        }); // storing categories for passing it to Select options
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
                    <DatePicker dateFormat="YYYY-MM-dd" selected={release_date_selected} name="release_date"
                                className="form-control" onChange={(date) => this.dateChanged('release_date', date)}/>
                </div>
                <div className="form-group">
                    <label>Дата завершения проката:</label>
                    <DatePicker dateFormat="YYYY-MM-dd" selected={finish_date_selected} className="form-control" name="finish_date"
                                onChange={(date) => this.dateChanged('finish_date', date)}/>
                </div>

                <input type="file" name="poster" value={this.state.fileName} onChange={this.fileChanged}/>
                <div className="form-group">
                    <label>Категории</label>

                    <Select options={select_options}
                            isMulti={true} onChange={(value) => this.selectChanged(value, 'categories')}
                            name="categories"
                    />
                </div>
                <button disabled={this.state.submitDisabled}
                        className="btn btn-primary" type="submit">Сохранить</button>
            </form>
        </div>
    }
}

export default MovieAdd;