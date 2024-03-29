import { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Error404Page from "./Error/Error404Page";
import ErrorBoundary from "./Error/ErrorBoundary";
import ErrorTestPage from "./Error/ErrorTestPage";
import CreatePage from "./CreatePage";
import EditPage from "./EditPage";
import Footer from "./Footer";
import HomePage from "./HomePage";
import LegalPage from "./LegalPage";
import LogoPage from "./LogoPage";
import NavBar from "./NavBar";
import ProcessPage from "./ProcessPage";
import { FacebookProvider, ProfilePage } from "./Profile";
import { TemplatePage } from "./Template";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ScrollToTop from "./Generic/ScrollToTop";

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <FacebookProvider>
        <BrowserRouter>
          <ScrollToTop />
          <NavBar />
          <ErrorBoundary>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/edit/:templateKey">
                <EditPage />
              </Route>
              <Route path="/templates">
                <TemplatePage />
              </Route>
              <Route exact path="/create">
                <CreatePage />
              </Route>
              <Route exact path="/legal">
                <LegalPage />
              </Route>
              <Route exact path="/profile">
                <ProfilePage />
              </Route>
              <Route exact path="/logo">
                <LogoPage />
              </Route>
              <Route exact path="/500">
                <ErrorTestPage />
              </Route>
              <Route exact path="/process">
                <ProcessPage />
              </Route>
              <Route>
                <Error404Page />
              </Route>
            </Switch>
          </ErrorBoundary>
          <ToastContainer />
          <Footer />
        </BrowserRouter>
      </FacebookProvider>
    </Suspense>
  );
}
