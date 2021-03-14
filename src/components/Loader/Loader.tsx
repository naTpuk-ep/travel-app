import * as React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.scss";

const Loader: React.FunctionComponent = () => {
  return (
    <div className="loader">
      <Spinner animation="border" />
    </div>
  );
};

export default Loader;
