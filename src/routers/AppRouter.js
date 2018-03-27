import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page404 from '../pages/Page404';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <header>Drag and Drop test</header>
            <Switch>
                <Route component={Page404} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;