import { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Masu from "./Masu";
import ProcessPage from "./ProcessPage";
import LogoPage from "./LogoPage";
import { FacebookProvider, ProfilePage } from "./Profile";
import { TemplatePage } from "./Template";
import CreatePage from "./CreatePage";
import LegalPage from "./LegalPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <FacebookProvider>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/edit/:templateKey">
              <Masu />
            </Route>
            <Route path="/templates">
              <TemplatePage />
            </Route>
            <Route exact page="/create">
              <CreatePage />
            </Route>
            <Route exact path="/logo">
              <LogoPage />
            </Route>
            <Route exact path="/process">
              <ProcessPage />
            </Route>
            <Route exact path="/legal">
              <LegalPage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
          <ToastContainer />
          <Footer />
        </BrowserRouter>
      </FacebookProvider>
    </Suspense>
  );
}
