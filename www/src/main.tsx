import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'

import App from "./components/App";
import "./main.css";

const history = createBrowserHistory()

ReactDOM.render((
    <Router history={history}>
        <App/>
    </Router>
), document.getElementById('app'));