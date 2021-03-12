import * as React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../constants/routes";
import "./App.scss";
import Main from "../pages/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Country from "../pages/Country";

const App: React.FunctionComponent = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route exact path={routes.HOME}>
            <Main />
          </Route>
          <Route path={routes.COUNTRY}>
            <Country />
          </Route>
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
