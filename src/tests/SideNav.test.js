import React from "react";
import SideNav from "../routes/DashRouter/SideNav/index.js";
import renderer from "react-test-renderer";

it("renders side nav correctly", () => {
  const tree = renderer.create(<SideNav />).toJSON();
  expect(tree).toMatchSnapshot();
});
