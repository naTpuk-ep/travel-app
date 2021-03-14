import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../constants/routes";
import "./App.scss";
import Main from "../pages/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Country from "../pages/Country";
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext";
import Registration from "../pages/Registration";
import Login from "../pages/Login";

const App: React.FunctionComponent = () => {
  const { token, login, logout, userId, name, userImage, ready } = useAuth();
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
        <header>
          <Header isAuthenticated={isAuthenticated} />
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
              {isAuthenticated ? <Redirect to="/" /> : <Registration />}
            </Route>
            <Route exact path={routes.SING_IN}>
              {isAuthenticated ? <Redirect to="/" /> : <Login />}
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
