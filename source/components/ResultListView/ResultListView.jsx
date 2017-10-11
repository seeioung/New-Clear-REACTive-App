import React, { Component } from 'react'
import { List, Item, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import styles from './ResultListView.scss';

class ResultListView extends Component {

    render() {

        let noResult = (Object.keys(this.props.resultList).length === 0);

        if (noResult) {
            return (
                <div className="ResultList">
                    <List ordered={true}>
                        <List.Content><h3>No Movie...</h3></List.Content>
                    </List>
                </div>
            )
        }

        let moviesList = this.props.resultList;
        let resultListItems = this.props.resultList.map((result, idx) => {
            let posterUrl = "https://image.tmdb.org/t/p/w90_and_h134_bestv2/" + result.poster_path;
            if (result.poster_path === null) {
                posterUrl = './../../assets/no_img.jpg'
            }

            let year = result.release_date + "";
            if (year === null) {
                year = "";
            }

            let detailsLink = "/details"+result.id;
            return (
                <Item key={idx} className="itemHeader">
                    <Item.Image size='tiny' src={posterUrl} />
                    <Item.Content>
                        <Item.Header>
                            <Link to={{ pathname: `/details/${ result.id }`,  query: idx, params:{moviesList: moviesList} }} key={idx}>
                                <span>{result.title}</span>
                            </Link>

                        </Item.Header>
                        <Item.Extra>{year}</Item.Extra>
                    </Item.Content>
                </Item>
            )
        });

        return(
            <div className="searchList">
                <Item.Group  divided>{resultListItems}</Item.Group>
            </div>

        )
    }
}

ResultListView.propTypes = {
    resultList: PropTypes.object
};

export default ResultListView