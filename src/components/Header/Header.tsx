import React, { ChangeEvent, useContext } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
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
      <LinkContainer to={routes.HOME}>
        <h1 className="header__logo">{LOCALIZATIONS.header.logo[language]}</h1>
      </LinkContainer>
      <Form.Control
        onChange={handleChangeSelect}
        size="sm"
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
            Sign out
          </a>
        </div>
      ) : (
        <div className="header__authbar">
          <LinkContainer to={routes.SING_IN}>
            <div className="header__authbar-link">Sign in</div>
          </LinkContainer>
          <LinkContainer to={routes.SING_UP}>
            <Button variant="outline-light">Sign up</Button>
          </LinkContainer>
        </div>
      )}
    </Container>
  );
};

export default Header;
