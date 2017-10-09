import React, { Component } from 'react'
import { Grid, Menu, Segment} from 'semantic-ui-react'
import axios from 'axios'

import styles from './SearchView.scss';

import GenresContentView from "../GenresContentView/GenresContentView.jsx";

class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
            activeGenreId: 0,
            movieGenres: {},
            movies: {}
        };

        this.handleItemClick = this.handleItemClick.bind(this);

    }

    componentWillMount() {
        let getGenresUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=2ba1defe49928fa3f6b38c04f378cd89';
        axios.get(getGenresUrl)
            .then((response) => {
                this.setState({
                    movieGenres: response.data.genres
                });

            }).catch((error) => {
            console.log(error);
        });



            let getAllUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=2ba1defe49928fa3f6b38c04f378cd89&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
            axios.get(getAllUrl)
                .then((response) => {
                    this.setState({
                        movies: response.data.results
                    });

                }).catch((error) => {
                console.log(error);
            });

    }

    handleItemClick(event, { name, id }){
        let newGenreId = id;
        this.setState({
            activeItem: name,
            activeGenreId: newGenreId
        });

        let getMoviesUrl = 'https://api.themoviedb.org/3/genre/' + newGenreId + '/movies?api_key=2ba1defe49928fa3f6b38c04f378cd89&language=en-US&include_adult=false&sort_by=vote_average.desc';

        axios.get(getMoviesUrl)
            .then((response) => {
                this.setState({
                    movies: response.data.results
                });

            }).catch((error) => {
            console.log(error);
        });
    }



    render() {
        let noResult = (Object.keys(this.state.movieGenres).length === 0);
        if (noResult) {
            return (
                <div/>
            )
        }
        let genresListItem = this.state.movieGenres.map((result, idx) => {
            let genreName = result.name;
            let genreId = result.id;
            return (
                <Menu.Item key={idx} name={genreName} id={genreId} active={this.state.activeItem === genreName} onClick={this.handleItemClick} />
            )
        });

        return(
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        {genresListItem}
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment className="gallerySegment">
                        <GenresContentView moviesList={this.state.movies}/>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default SearchView


