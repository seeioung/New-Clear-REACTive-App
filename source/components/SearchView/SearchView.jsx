import React, { Component } from 'react'
import { Grid, Menu, Segment} from 'semantic-ui-react'
import axios from 'axios'

import styles from './SearchView.scss';

import ResultListView from "../ResultListView/ResultListView.jsx";

class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            movies: {},
            sortBy: 'Name',
            sortIn: 'Ascending'
        };

        this.searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=2ba1defe49928fa3f6b38c04f378cd89&language=en-US';
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.sortByChangeHandler = this.sortByChangeHandler.bind(this);
        this.sortInChangeHandler = this.sortInChangeHandler.bind(this);
    }

    inputChangeHandler(event) {
        let searchKeyword = event.target.value;

        if (searchKeyword !== '') {
            let url = this.searchUrl + "&query=" + searchKeyword;
            axios.get(url)
                .then((response) => {
                    this.setState({
                        movieName : searchKeyword,
                        movies: response.data.results
                    });
                }).catch((error) => {
                console.log(error);
            })
        } else {
            this.setState({
                movies: {}
            });
        }
    }

    sortResults(sortBy, sortIn) {
        let sortedMovies = this.state.movies;
        if ((Object.keys(sortedMovies).length === 0)) {
            console.log("empty no need to sort")
            return;
        }
        // sort movies
        if (sortBy === "Name") {
            sortedMovies.sort(function(a, b) {
                if (sortIn === "Ascending") {
                    return a.title.localeCompare(b.title);
                }
                return b.title.localeCompare(a.title);
            });
        } else {
            sortedMovies.sort(function(a, b) {
                if (sortIn === "Ascending") {
                    return a.popularity - b.popularity;
                }
                return b.popularity - a.popularity;
            });
        }

        this.setState({
            movies: sortedMovies
        });

    }

    sortByChangeHandler(event, data) {
        console.log("change sort by");

        let sortBy = data.text;
        let sortIn = this.state.sortIn;

        this.sortResults(sortBy, sortIn);

        this.setState({
            sortBy: data.text
        });


    }

    sortInChangeHandler(event, data) {
        console.log("change sort in");
        let sortBy = this.state.sortBy;
        let sortIn = data.value;

        this.sortResults(sortBy, sortIn);

        this.setState({
            sortIn: data.value
        });
    }

    render() {
        return(
            <div className="Search">
                <h1 className="Search_header">Let's GET us a List of Movies!</h1>

                <div className="searchContainer">
                    <Input
                        className="Input"
                        onChange={this.inputChangeHandler}
                        placeholder='Search for movies'
                    />

                    <div className="SortByDropdown">
                        <span>Sort By: </span>
                        <Dropdown className="dropdown" defaultValue="Name" text={this.state.sortBy} button >
                            <Dropdown.Menu className="dropdown">
                                <Dropdown.Item text="Name" onClick={this.sortByChangeHandler} />
                                <Dropdown.Item text="Popularity" onClick={this.sortByChangeHandler} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>




                <Form className="SortInCheckBox">
                    <Form.Field className="checkBoxField">
                        <span>Sort in: {this.state.sortIn}</span>
                    </Form.Field>
                    <Form.Field className="checkBoxField">
                        <Checkbox
                            radio
                            label='Ascending'
                            name='checkboxRadioGroup'
                            value='Ascending'
                            checked={this.state.sortIn === 'Ascending'}
                            onChange={this.sortInChangeHandler}
                        />
                    </Form.Field>
                    <Form.Field className="checkBoxField">
                        <Checkbox
                            radio
                            label='Descending'
                            name='checkboxRadioGroup'
                            value='Descending'
                            checked={this.state.sortIn === 'Descending'}
                            onChange={this.sortInChangeHandler}
                        />
                    </Form.Field>
                </Form>

                <ResultListView resultList={this.state.movies}/>
            </div>
        )
    }
}

export default SearchView


