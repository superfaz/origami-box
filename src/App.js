import './App.css';
import { Suspense } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Masu from './Masu/';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Process from './Process';
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './AppInsights';

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <AppInsightsContext.Provider value={reactPlugin}>
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/process">
              <Process />
            </Route>
            <Route path="/">
              <Masu />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </AppInsightsContext.Provider>
    </Suspense>
  );
}
