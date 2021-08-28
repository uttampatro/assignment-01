import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreateMovie from './pages/createMovie';
import Movie from './pages/movie/index';
import Home from './pages/home';

function App() {
    return (
        <div className="app">
            <div className="app_body">
                <Switch>
                    <Route exact path={'/'}>
                        <Redirect to={'home'}></Redirect>
                    </Route>
                    <Route path={'/createMovie'} component={CreateMovie} />
                    <Route path={'/home'} component={Home} />
                    <Route path={'/movie/:id'} component={Movie} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
