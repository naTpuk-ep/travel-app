import * as React from "react";
import { Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import routes from "../../constants/routes";
import "./Header.scss";

const Header: React.FunctionComponent = () => {
  return (
    <Container className="header">
      <LinkContainer to={routes.HOME}>
        <h1 className="header__logo">
          Travel <span className="header__logo-span">App</span>
        </h1>
      </LinkContainer>
    </Container>
  );
};

export default Header;
