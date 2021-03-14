import * as React from "react";
import { Container, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import routes from "../../constants/routes";
import Language from "../../constants/languages";
import "./Header.scss";

const Header: React.FunctionComponent = () => {
  return (
    <Container className="header">
      <LinkContainer to={routes.HOME}>
        <h1 className="header__logo">
          Travel <span className="header__logo-span">App</span>
        </h1>
      </LinkContainer>
      <Form.Control size="sm" as="select" className="header__language">
        <option>{Language.English}</option>
        <option>{Language.Russian}</option>
        <option>{Language.German}</option>
      </Form.Control>
    </Container>
  );
};

export default Header;
