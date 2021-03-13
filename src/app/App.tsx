import * as React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../constants/routes";
import "./App.scss";
import Main from "../pages/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Country from "../pages/Country";
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext";
import Registration from "../pages/Registration";

const App: React.FunctionComponent = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
        }}
      >
        <header>
          <Header />
        </header>
        <main>
          <Switch>
            <Route exact path={routes.HOME}>
              <Main />
            </Route>
            <Route exact path={routes.COUNTRY}>
              <Country />
            </Route>
            <Route exact path={routes.SING_UP}>
              <Registration />
            </Route>
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </AuthContext.Provider>
    </>
  );
};

export default App;
