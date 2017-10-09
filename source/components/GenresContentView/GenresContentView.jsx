import React, { Component } from 'react'
import { Image} from 'semantic-ui-react'
import { Link} from 'react-router-dom'

import styles from './GenresContentView.scss';

class GenresContentView extends Component {

    render() {

        let noResult = (Object.keys(this.props.moviesList).length === 0);
        if (noResult) {
            return (
                <div>No content</div>
            )
        }

        let movieGalleryItems = this.props.moviesList.map((result, idx) => {
            let posterUrl = "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" + result.poster_path;

            if (result.poster_path === null) {
                posterUrl = '../../assets/no_img.jpg'
            }

            return (
                <Link className="detailLink" to={{ pathname: `/details/${ result.id }`,  query: idx, params:{moviesList: this.props.moviesList} }} key={idx}>
                    <Image className="galleryImage" src={posterUrl} shape='rounded' />
                </Link>
            )

        });

        return(
            <div className="moviesContainer">
                {movieGalleryItems}
            </div>
        )
    }
}

export default GenresContentView


