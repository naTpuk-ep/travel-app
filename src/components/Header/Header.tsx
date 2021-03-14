import React, { ChangeEvent, useContext } from "react";
import { Container, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import routes from "../../constants/routes";
import Language from "../../constants/languages";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";
import "./Header.scss";

interface IHeaderProps {
  changeLanguage: (language: Language) => void;
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const language = useContext(LocalizationContext);

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
    </Container>
  );
};

export default Header;
