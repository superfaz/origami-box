import "./App.css";
import { Suspense } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Masu from "./Masu";
import Process from "./Process";
import Logo from "./Logo";
import { FacebookProvider, ProfilePage } from "./Profile";
import { TemplatePage } from "./Template";
import Legal from "./Legal";

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <FacebookProvider>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/edit/:templateKey">
              <Masu />
            </Route>
            <Route path="/templates">
              <TemplatePage />
            </Route>
            <Route exact path="/logo">
              <Logo />
            </Route>
            <Route exact path="/process">
              <Process />
            </Route>
            <Route exact path="/legal">
              <Legal />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </FacebookProvider>
    </Suspense>
  );
}
