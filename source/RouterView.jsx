
import React, { Component } from 'react'
import { Button, Input, Dropdown, Form, Checkbox, Label, Menu, Tab, Segment} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom'
import axios from 'axios'

import ListView from './components/ListView/ListView.jsx';
import GalleryView from './components/GalleryView/GalleryView.jsx';
import DetailsView from './components/DetailsView/DetailsView.jsx';

import styles from './styles/RouterView.scss';


class RouterView extends Component {
    constructor() {
        super();
        this.state = {
            activeItem: "search"
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleGalleryClick = this.handleGalleryClick.bind(this);
    }
    handleSearchClick() {
        this.setState({
            activeItem: "search"
        });
    }

    handleGalleryClick() {
        this.setState({
            activeItem: "gallery"
        });
    }

    render() {
        let activeItem = this.state.activeItem;
        return(
            <Router>
                <Segment className="container">
                    <div className = "Nav">
                        <Menu compact inverted size='large'>
                            <Link to="/"><Menu.Item name='MovieSearch'/></Link>
                            <Link to="/Gallery"><Menu.Item name='Gallery' /></Link>
                        </Menu>
                    </div>

                    <div>
                        <Switch>
                            <Route exact path='/' component={ListView}/>
                            <Route exact path='/gallery' component={GalleryView}/>
                            <Route path='/details/:value' component={DetailsView}/>
                            <Route render = {function(){
                                return <h3>404 Not Found</h3>
                            }}/>
                        </Switch>
                    </div>

                </Segment>
            </Router>
        )
    }
}

export default RouterView