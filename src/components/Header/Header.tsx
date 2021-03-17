import React, {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Container,
  Form,
  Button,
  Image,
  Navbar,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import Language from "../../constants/languages";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";
import AuthContext from "../../context/AuthContext";
import routes from "../../constants/routes";
import "./Header.scss";

interface IHeaderProps {
  changeLanguage: (language: Language) => void;
  changeSearch: (search: string) => void;
  isAuthenticated: boolean;
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const language = useContext(LocalizationContext);
  const auth = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();
  const inputSearch: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const { isAuthenticated } = props;

  useEffect(() => {
    inputSearch.current?.focus();
    setIsHome(routes.HOME === location.pathname);
  }, [location, isHome]);

  const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    auth.logout();
  };

  const handleChangeSelect = (event: ChangeEvent<{ value: string }>) => {
    const value: Language = event.target.value as Language;
    props.changeLanguage(value);
  };

  const handleChangeSearch = (event: ChangeEvent<{ value: string }>) => {
    const value: string = event.target.value as string;
    props.changeSearch(value);
    setSearch(value);
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value: string = inputSearch.current?.value as string;
    props.changeSearch(value);
  };

  const handleClickClear = () => {
    props.changeSearch("");
    setSearch("");
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
          {isHome ? (
            <Form inline onSubmit={handleSubmitForm} className="header__search">
              <InputGroup className="mr-sm-2">
                <FormControl
                  onChange={handleChangeSearch}
                  value={search}
                  type="text"
                  placeholder={LOCALIZATIONS.header.placeholder[language]}
                  ref={inputSearch}
                />
                <InputGroup.Append>
                  <InputGroup.Text onClick={handleClickClear}>
                    ✖
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <Button variant="success" type="submit">
                {LOCALIZATIONS.header.search[language]}
              </Button>
            </Form>
          ) : (
            ""
          )}
          <Form.Control
            onChange={handleChangeSelect}
            as="select"
            className="header__language"
            defaultValue={language}
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
