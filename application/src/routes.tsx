import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/landing';
import WorkersForm from './pages/workersForm';
import WorkersList from './pages/workersList';
import QuoteForm from './pages/quoteForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/hire" component={WorkersList} />
            <Route path="/work" component={WorkersForm} />
            <Route path="/quote" component={QuoteForm} />
        </BrowserRouter>
    )
}

export default Routes;