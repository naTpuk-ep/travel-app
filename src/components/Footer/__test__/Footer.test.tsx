import React from "react";
import Footer from "../Footer";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = () => shallow(<Footer />);

describe("should render footer component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("should contain footer-container", () => {
    const wrapper = component.find(".footer");
    expect(wrapper.length).toBeLessThan(2);
  });

  it("should render footer component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
