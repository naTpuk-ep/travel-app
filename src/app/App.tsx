import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import routes from "../constants/routes";
import "./App.scss";
import Main from "../pages/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Country from "../pages/Country";
import Language from "../constants/languages";
import LocalizationContext from "../context/LocalizationContext";
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import TopRating from "../pages/TopRating";

const App: React.FunctionComponent = () => {
  const [language, setLanguage] = useState(Language.English);
  const { token, login, logout, userId, name, userImage } = useAuth();
  const isAuthenticated = !!token;

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          name,
          userImage,
          isAuthenticated,
        }}
      >
        <LocalizationContext.Provider value={language}>
          <header>
            <Header
              changeLanguage={setLanguage}
              isAuthenticated={isAuthenticated}
            />
          </header>
          <main>
            <Container className="main">
              <Switch>
                <Route exact path={routes.HOME}>
                  <Main />
                </Route>
                <Route exact path={routes.COUNTRY}>
                  <Country />
                </Route>
                <Route exact path={routes.SING_UP}>
                  {isAuthenticated ? <Redirect to="/" /> : <Registration />}
                </Route>
                <Route exact path={routes.SING_IN}>
                  {isAuthenticated ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route exact path={routes.TOP_PLACE_RATING}>
                  <TopRating />
                </Route>
              </Switch>
            </Container>
          </main>
          <footer>
            <Footer />
          </footer>
        </LocalizationContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
