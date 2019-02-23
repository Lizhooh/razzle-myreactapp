import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import './styles/index.css';

import routes from './page-routes';

const App = () => {
    return (
        <Switch>
            {routes.map((item, index) => (
                <Route key={index} {...item} />
            ))}
        </Switch>
    )
};

export default App;
