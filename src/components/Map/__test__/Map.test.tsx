import React from "react";
import Map from "../Map";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = (props) => shallow(<Map {...props} />);

describe("should render map component", () => {
  let component;
  beforeEach(() => {
    const countryData = {
      ISOCode: "IT",
      capitalLocation: {
        coordinates: [35, 28],
        type: "point",
      },
    };
    component = setUp({ countryData });
  });
  it("should render map component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
