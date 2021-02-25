import './App.css';
import { Suspense } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './AppInsights';
import Home from './Home';
import Masu from './Masu/';
import Process from './Process';
import Logo from './Logo';

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <AppInsightsContext.Provider value={reactPlugin}>
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/masu">
              <Masu />
            </Route>
            <Route exact path="/logo">
              <Logo />
            </Route>
            <Route exact path="/process">
              <Process />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </AppInsightsContext.Provider>
    </Suspense>
  );
}
