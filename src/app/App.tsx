import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import routes from "../constants/routes";
import "./App.scss";
import Main from "../pages/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Country from "../pages/Country";
import LocalizationContext from "../context/LocalizationContext";
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import TopRating from "../pages/TopRating";

const App: React.FunctionComponent = () => {
  const hash =
    "5FAAFCB0796BD5C3A42B9641047E65AA1BE70A766FC39B4A3EBEE1B8C10EA9D9";
  const storageName = `TravelAppLanguage${hash}`;
  const data = JSON.parse(
    localStorage.getItem(storageName) || `{ "language": "en"}`
  );

  const [language, setLanguage] = useState(data.language);
  const [search, setSearch] = useState("");
  const { token, login, logout, userId, name, email, userImage } = useAuth();
  const isAuthenticated = !!token;

  window.addEventListener("unload", () => {
    localStorage.setItem(`${storageName}`, JSON.stringify({ language }));
  });

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          name,
          email,
          userImage,
          isAuthenticated,
        }}
      >
        <LocalizationContext.Provider value={language}>
          <header>
            <Header
              changeLanguage={setLanguage}
              changeSearch={setSearch}
              isAuthenticated={isAuthenticated}
            />
          </header>
          <main>
            <Container className="main">
              <Switch>
                <Route exact path={routes.HOME}>
                  <Main search={search} />
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
