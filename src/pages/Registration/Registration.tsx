import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import { Container, Form, Button } from "react-bootstrap";
import useHttp from "../../hooks/http.hook";
import "./Registration.scss";

const Registration: React.FunctionComponent = () => {
  const { loading, request, error, clearError } = useHttp();
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    userImage: [""],
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

  const onDrop = (files: File[], picture: string[]) => {
    setForm({ ...form, userImage: picture });
  };

  return (
    <Container fluid className="pr-0 pl-0 mh-100 d-inline-block">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3 className="mb-4">Sign Up</h3>
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
            <Form.Group controlId="name">
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
            <ImageUploader
              withPreview
              singleImage
              withIcon
              label="Max file size: 5mb, accepted: jpg|gif|png"
              buttonText="Choose images"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            <Form.Text className="text-danger txt-lg mb-2">{errors}</Form.Text>
            <Button
              onClick={registerHandler}
              disabled={loading}
              variant="primary"
              type="submit"
            >
              Create profile
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Registration;
