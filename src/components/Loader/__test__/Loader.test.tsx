import React from "react";
import Loader from "../Loader";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = () => shallow(<Loader />);

describe("should render loader component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("should render loader component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
