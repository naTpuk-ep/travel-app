import * as React from "react";
import { Container, Nav } from "react-bootstrap";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";
import "./Footer.scss";

const Footer: React.FunctionComponent = () => {
  const language = React.useContext(LocalizationContext);
  return (
    <Container>
      <div className="footer">
        <Nav className="mr-auto">
          <h5 className="authors">
            {`${LOCALIZATIONS.authors[language]}:`}&nbsp; &nbsp;
          </h5>
          <Nav.Link href="https://github.com/DmitryAstapenko">
            DmitryAstapenko
          </Nav.Link>
          <Nav.Link href="https://github.com/RamanNovikau">
            RamanNovikau
          </Nav.Link>
          <Nav.Link href="https://github.com/naTpuk-ep">
            YauheniPiatrou
          </Nav.Link>
          <Nav.Link href="https://github.com/zhenyamarinovich">
            ZhenyaMarinovich
          </Nav.Link>
        </Nav>
        <span className="year">2021</span>
        <div className="logo">
          <a href="https://rs.school/js/">
            <img
              src="https://rs.school/images/rs_school_js.svg"
              alt="RS-school"
            />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
