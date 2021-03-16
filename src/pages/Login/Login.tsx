import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";
import "../Registration/Registration.scss";

const Login: React.FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("http://localhost:3000/auth/login", "POST", {
        ...form,
      });
      setErrors("");
      auth.login(
        data.token,
        data.userId,
        data.name,
        data.email,
        data.userImage
      );
    } catch (e) {
      setErrors(e.response.data.message);
    }
  };

  return (
    <Container fluid className="pr-0 pl-0 mh-100 d-inline-block">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3 className="mb-4">Sign In</h3>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={form.password}
                onChange={changeHandler}
                name="password"
                type="password"
                placeholder="Password"
                isInvalid={!!errors}
              />
            </Form.Group>
            <Form.Text className="text-danger txt-lg mb-2">{errors}</Form.Text>
            <Button
              block
              onClick={loginHandler}
              disabled={loading}
              variant="primary"
              type="submit"
            >
              {loading ? (
                <div className="loader-sm">
                  <Loader />
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
