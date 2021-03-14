import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../constants/routes";
import "./App.scss";
// eslint-disable-next-line import/no-cycle
import Main from "../pages/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Country from "../pages/Country";
import Language from "../constants/languages";
import LocalizationContext from "../context/LocalizationContext";

const App: React.FunctionComponent = () => {
  const [language, setLanguage] = useState(Language.English);

  return (
    <LocalizationContext.Provider value={language}>
      <header>
        <Header changeLanguage={setLanguage} />
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
    </LocalizationContext.Provider>
  );
};

export default App;
