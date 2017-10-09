import React, { Component } from 'react'
import { Button, Input, Card, Image, Item, Icon, Modal, Header} from 'semantic-ui-react'
import { Link} from 'react-router-dom'
import axios from 'axios'

import styles from './DetailsView.scss';

import PokemonView from '../PokemonView/PokemonView.jsx';

class DetailsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalCount: 0,
            currMovie: {},
            currIdx:0
        };
        //
        // this.baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
        this.updateDetails = this.updateDetails.bind(this);
        this.clickLeftHandler = this.clickLeftHandler.bind(this);
        this.clickRightHandler = this.clickRightHandler.bind(this);

    }

    componentWillMount() {
        let movies = this.props.location.params.moviesList;
        let currIdx = this.props.location.query;
        console.log("movie list received by details: " + this.props.location.params.moviesList);
        console.log("index list received by details: " + this.props.location.query);

        this.setState({
            movies: movies,
            currIdx:currIdx
        });

        let currMovieId = movies[currIdx].id;
        this.updateDetails(currMovieId)
    }

    updateDetails(currMovieId) {
        let getMovieUrl = 'https://api.themoviedb.org/3/movie/' + currMovieId + '?api_key=2ba1defe49928fa3f6b38c04f378cd89&language=en-US'
        axios.get(getMovieUrl)
            .then((response) => {
                this.setState({
                    currMovie: response.data,
                });
                console.log(response.data);

            }).catch((error) => {
            console.log(error);
        });
    }


    clickLeftHandler(event, data) {
        // let listSize = this.state.totalCount;
        if (this.state.currIdx !== 0) {
            let newIdx = (this.state.currIdx - 1);
            let newMovieId = this.state.movies[newIdx].id;

            this.setState({
                currIdx:newIdx
            });

            console.log("new movie index: ", newIdx);
            console.log("new movie id: ", newMovieId);

            this.updateDetails(newMovieId);
        }

    }

    clickRightHandler(event, data) {
        if (this.state.currIdx !== 100) { // ????
            let newIdx = (this.state.currIdx + 1);
            let newMovieId = this.state.movies[newIdx].id;
            this.setState({
                currIdx:newIdx
            });
            console.log("new movie index: ", newIdx);
            console.log("new movie id: ", newMovieId);

            this.updateDetails(newMovieId);
        }
    }



    render() {
        let posterUrl = "https://image.tmdb.org/t/p/w90_and_h134_bestv2/" + this.state.currMovie.poster_path;
        if (this.state.currMovie.poster_path === null) {
            posterUrl = '../../assets/no_img.jpg'
        }

        return(
            <Modal dimmer={false} open size='small'>
                <Modal.Header>{this.state.currMovie.title}</Modal.Header>
                <Modal.Content image className="detailImg">
                    <Image src={posterUrl} />
                    <Modal.Description className="descriptionContainer">
                        <Header>{this.state.currMovie.release_date}</Header>
                        <p>Vote average: {this.state.currMovie.vote_average}</p>
                        <p>Runtime: {this.state.currMovie.runtime}mins</p>
                        <p>{this.state.currMovie.overview}</p>
                    </Modal.Description>
                </Modal.Content>
                <Button icon='settings' onClick={this.clickLeftHandler}/>
                <Button floated='right' icon='settings' onClick={this.clickRightHandler}/>
            </Modal>






        )
    }
}

export default DetailsView