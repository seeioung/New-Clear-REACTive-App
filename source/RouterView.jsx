
import React, { Component } from 'react'
import {  Menu, Segment} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom'

// import ListView from './components/ListView/ListView.jsx';
import SearchView from './components/SearchView/SearchView.jsx';
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
                    <Menu className="menuContainer" inverted>
                        <Menu.Item active={activeItem === 'search'}>
                            <div id='search' onClick={this.handleSearchClick}>
                                <NavLink exact className="nav-link" activeClassName="active" to="/" >
                                    <span className="menuText">Movie Search</span>
                                </NavLink>
                            </div>
                        </Menu.Item>

                        <Menu.Item active={activeItem === 'gallery'}>
                            <div onClick={this.handleGalleryClick}>
                                <NavLink exact className="nav-link" activeClassName="active" to="/gallery">
                                    <span className="menuText">Movie Gallery</span>
                                </NavLink>
                            </div>

                        </Menu.Item>
                    </Menu>

                    <div>
                        <Switch>
                            <Route exact path='/' component={SearchView}/>
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