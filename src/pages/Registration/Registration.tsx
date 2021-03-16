import React, { useState, useContext } from "react";
import ImageUploader from "react-images-upload";
import { Form, Button, Card } from "react-bootstrap";
import useHttp from "../../hooks/http.hook";
import "./Registration.scss";
import AuthContext from "../../context/AuthContext";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";
import Loader from "../../components/Loader";

const Registration: React.FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const language = useContext(LocalizationContext);
  const { loading, request } = useHttp();
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
        "https://rnovikov-travel-app-backend.herokuapp.com/auth/register",
        "POST",
        { ...form }
      );
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

  const onDrop = (files: File[], picture: string[]) => {
    setForm({ ...form, userImage: picture });
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-inner" bg="light">
        <h3 className="mb-4">{LOCALIZATIONS.registration.singUp[language]}</h3>
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
          <Form.Group controlId="name">
            <Form.Label>{LOCALIZATIONS.registration.name[language]}</Form.Label>
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
            block
            onClick={registerHandler}
            disabled={loading}
            variant="primary"
            type="submit"
          >
            {loading ? (
              <div className="loader-sm">
                <Loader />
              </div>
            ) : (
              LOCALIZATIONS.registration.create[language]
            )}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Registration;
