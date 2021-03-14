import * as React from "react";
import { useContext } from "react";
import { Container, Button, Image, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import routes from "../../constants/routes";
import AuthContext from "../../context/AuthContext";
import "./Header.scss";

interface IHeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const auth = useContext(AuthContext);
  const { isAuthenticated } = props;

  const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    auth.logout();
  };

  return (
    <Container className="header">
      <LinkContainer to={routes.HOME}>
        <h1 className="header__logo">
          Travel <span className="header__logo-span">App</span>
        </h1>
      </LinkContainer>
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
