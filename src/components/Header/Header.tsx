import React, { ChangeEvent, useContext } from "react";
import {
  Container,
  Form,
  Button,
  Image,
  Navbar,
  FormControl,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Language from "../../constants/languages";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";
import AuthContext from "../../context/AuthContext";
import routes from "../../constants/routes";

import "./Header.scss";

interface IHeaderProps {
  changeLanguage: (language: Language) => void;
  isAuthenticated: boolean;
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const language = useContext(LocalizationContext);
  const auth = useContext(AuthContext);
  const { isAuthenticated } = props;

  const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    auth.logout();
  };

  const handleChangeSelect = (event: ChangeEvent<{ value: string }>) => {
    const value: Language = event.target.value as Language;
    props.changeLanguage(value);
  };

  return (
    <Container className="header">
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Brand>
          <LinkContainer to={routes.HOME} className="header__logo">
            <h1>{LOCALIZATIONS.header.logo[language]}</h1>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <FormControl
              type="text"
              placeholder={LOCALIZATIONS.header.placeholder[language]}
              className="mr-sm-2"
            />
            <Button variant="outline-success">
              {LOCALIZATIONS.header.search[language]}
            </Button>
          </Form>
          <Form.Control
            onChange={handleChangeSelect}
            as="select"
            className="header__language"
          >
            <option value={Language.English}>{Language.English}</option>
            <option value={Language.Russian}>{Language.Russian}</option>
            <option value={Language.German}>{Language.German}</option>
          </Form.Control>
          {isAuthenticated ? (
            <div className="header__authbar">
              {auth.userImage[0] ? (
                <Image
                  className="header__authbar-avatar"
                  src={auth.userImage[0]}
                  roundedCircle
                />
              ) : (
                ""
              )}
              <div className="header__authbar-user">{auth.name}</div>
              <a
                href="/"
                className="header__authbar-link signout"
                onClick={logoutHandler}
              >
                {LOCALIZATIONS.header.singOut[language]}
              </a>
            </div>
          ) : (
            <div className="header__authbar">
              <LinkContainer to={routes.SING_IN}>
                <div className="header__authbar-link">
                  {LOCALIZATIONS.header.singIn[language]}
                </div>
              </LinkContainer>
              <LinkContainer to={routes.SING_UP}>
                <Button variant="dark">
                  {LOCALIZATIONS.header.singUp[language]}
                </Button>
              </LinkContainer>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
