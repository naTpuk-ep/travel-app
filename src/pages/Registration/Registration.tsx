import React, { useState, useContext } from "react";
import ImageUploader from "react-images-upload";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import useHttp from "../../hooks/http.hook";
import "./Registration.scss";
import AuthContext from "../../context/AuthContext";
import LOCALIZATIONS from "../../assets/data/localizations";
import AUTH_ERRORS_LOCALIZATIONS from "../../assets/data/authLocalizations";
import LocalizationContext from "../../context/LocalizationContext";
import { RegistratinErrors } from "../../constants/authErrors";

const Registration: React.FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const language = useContext(LocalizationContext);
  const { loading, request } = useHttp();
  const [errors, setErrors] = useState("" as RegistratinErrors);
  const [inputErrors, setInputErrors] = useState<
    { value: string; msg: string; param: string; location: string }[]
  >([]);
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
      setErrors("" as RegistratinErrors);
      setInputErrors([]);
      const data = await request(
        "https://rnovikov-travel-app-backend.herokuapp.com/auth/register",
        "POST",
        { ...form }
      );
      auth.login(
        data.token,
        data.userId,
        data.name,
        data.email,
        data.userImage
      );
    } catch (e) {
      setErrors(e.response.data.message as RegistratinErrors);
      if (e.response.data.errors) {
        setInputErrors(e.response.data.errors);
      }
    }
  };

  const onDrop = (files: File[], picture: string[]) => {
    setForm({ ...form, userImage: picture });
  };

  const findError = (msg: string) => {
    return inputErrors.find((error) => {
      return error.param === msg;
    });
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
              placeholder={LOCALIZATIONS.registration.inputEmail[language]}
              isInvalid={!!findError("email")}
            />
            <Form.Text className="text-danger txt-lg mb-2">
              {findError("email")
                ? AUTH_ERRORS_LOCALIZATIONS.registration.email[language]
                : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>{LOCALIZATIONS.registration.name[language]}</Form.Label>
            <Form.Control
              value={form.name}
              onChange={changeHandler}
              name="name"
              type="text"
              placeholder={LOCALIZATIONS.registration.inputName[language]}
              isInvalid={!!findError("name")}
            />
            <Form.Text className="text-danger txt-lg mb-2">
              {findError("name")
                ? AUTH_ERRORS_LOCALIZATIONS.registration.email[language]
                : ""}
            </Form.Text>
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
              placeholder={LOCALIZATIONS.registration.inputPassword[language]}
              isInvalid={!!findError("password")}
            />
            <Form.Text className="text-danger txt-lg mb-2">
              {findError("password")
                ? AUTH_ERRORS_LOCALIZATIONS.registration.email[language]
                : ""}
            </Form.Text>
          </Form.Group>
          <ImageUploader
            withPreview
            singleImage
            withIcon
            label={LOCALIZATIONS.registration.image[language]}
            buttonText={LOCALIZATIONS.registration.choose[language]}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
          <Form.Text className="text-danger txt-lg mb-2">
            {errors
              ? AUTH_ERRORS_LOCALIZATIONS.registration[errors][language]
              : ""}
          </Form.Text>
          <Button
            block
            onClick={registerHandler}
            disabled={loading}
            variant="primary"
            type="submit"
          >
            {loading ? (
              <div className="loader-sm">
                <Spinner animation="border" />
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
