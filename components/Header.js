import Link from "next/link";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Logo from "./Logo";

const Header = ({ home, changeActiveItem, nav }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (home) {
      changeActiveItem({ ...navItems[newValue], idx: newValue });
    }
  };

  let navItems = [
    { label: "भारतीय इतिहास", value: "indian-history" },
    { label: "संविधान", value: "constitution" },
    { label: "भूगोल", value: "geography" },
    { label: "मध्य प्रदेश G.K", value: "mp-gk" },
    { label: "समसामयिकी", value: "current-affairs" },
  ];

  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      {nav && (
        <Tabs
          value={value}
          centered
          onChange={handleChange}
          aria-label="Navigation"
          className="tabs"
        >
          {navItems.map((navItem, idx) => {
            return (
              <Tab
                key={idx}
                className="tab"
                label={navItem.label}
                {...a11yProps(idx)}
              />
            );
          })}
        </Tabs>
      )}
    </StyledHeader>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Header;

const StyledHeader = styled.header`
  margin-bottom: 1em;
  width: 100%;
  padding: 0.5em 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tabs {
    width: 60rem;
    margin-left: 7em;
  }
`;
