import React, { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import LOCALIZATIONS from "../../assets/data/localizations";
import AuthContext from "../../context/AuthContext";
import LocalizationContext from "../../context/LocalizationContext";
import AUTH_ERRORS_LOCALIZATIONS from "../../assets/data/authLocalizations";
import { LoginErrors } from "../../constants/authErrors";
import useHttp from "../../hooks/http.hook";
import "../Registration/Registration.scss";

const Login: React.FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const language = useContext(LocalizationContext);
  const { loading, request } = useHttp();
  const [errors, setErrors] = useState("" as LoginErrors);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      setErrors("" as LoginErrors);
      const data = await request(
        "https://rnovikov-travel-app-backend.herokuapp.com/auth/login",
        "POST",
        {
          ...form,
        }
      );
      auth.login(data.token, data.userId, data.name, data.userImage);
    } catch (e) {
      setErrors(e.response.data.message as LoginErrors);
    }
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-inner" bg="light">
        <h3 className="mb-4">{LOCALIZATIONS.login.singIn[language]}</h3>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>
              {LOCALIZATIONS.registration.email[language]}
            </Form.Label>
            <Form.Control
              value={form.email}
              onChange={changeHandler}
              name="email"
              type="email"
              placeholder="Enter email"
              isInvalid={!!errors}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>
              {LOCALIZATIONS.registration.password[language]}
            </Form.Label>
            <Form.Control
              value={form.password}
              onChange={changeHandler}
              name="password"
              type="password"
              placeholder="Password"
              isInvalid={!!errors}
            />
          </Form.Group>
          <Form.Text className="text-danger txt-lg mb-2">
            {errors ? AUTH_ERRORS_LOCALIZATIONS.login[errors][language] : ""}
          </Form.Text>
          <Button
            block
            onClick={loginHandler}
            disabled={loading}
            variant="primary"
            type="submit"
          >
            {LOCALIZATIONS.login.singIn[language]}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
