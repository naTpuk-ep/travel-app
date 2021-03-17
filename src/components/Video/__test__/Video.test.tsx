import React from "react";
import Video from "../Video";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = (props) => shallow(<Video {...props} />);

describe("should render video component", () => {
  let component;
  beforeEach(() => {
    component = setUp("test");
  });
  it("should contain video-container", () => {
    const wrapper = component.find(".video-container");
    expect(wrapper.length).toBe(1);
  });

  it("should contain react-player", () => {
    const player = component.find("ReactPlayer");
    expect(player.length).toEqual(1);
  });

  it("should render video component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
