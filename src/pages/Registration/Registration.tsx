import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import useHttp from "../../hooks/http.hook";

const Registration: React.FunctionComponent = () => {
  const { loading, request, error, clearError } = useHttp();
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        "http://localhost:3000/auth/register",
        "POST",
        { ...form }
      );
      setErrors("");
    } catch (e) {
      setErrors(e.response.data.message);
    }
  };

  return (
    <Container fluid className="pr-0 pl-0 mh-100 d-inline-block">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3 className="mb-4">Sign Up</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={changeHandler}
                name="name"
                type="text"
                placeholder="Enter name"
                isInvalid={!!errors}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
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
              onClick={registerHandler}
              disabled={loading}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Registration;
