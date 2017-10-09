import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Tab, Menu} from 'semantic-ui-react'

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Pokemon from './components/Pokemon/Pokemon.jsx';
import ListView from './components/ListView/ListView.jsx';
import GalleryView from './components/GalleryView/GalleryView.jsx';
import DetailsView from './components/DetailsView/DetailsView.jsx';
import RouterView from './RouterView.jsx'

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');


render(
    // Define your router and replace <Home /> with it!
    // <RouterView/>,
    <Home/>,
    document.getElementById('app')
);
