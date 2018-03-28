import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import DnDChoice from '../pages/DnDChoice';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <header>Drag and Drop test</header>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dndchoice" exact component={DnDChoice} />
                <Route component={Page404} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;