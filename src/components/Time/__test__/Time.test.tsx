import React from "react";
import Time from "../Time";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = (props) => shallow(<Time {...props} />);

describe("should render time", () => {
  let component;
  beforeEach(() => {
    component = setUp({ timezone: "UTC+03:00" });
  });
  it("should render time component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
