import React, { useState } from "react";
import Link from "next/link";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";

export default function AdminNav() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        centered
        onChange={handleChange}
        aria-label="Navigation"
        style={{
          width: "100%",
          margin: "0 auto",
          position: "fixed",
          padddingBottom: "1em",
          left: "0",
          bottom: "0",
          background: "#FFFFFF",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        }}
      >
        <Tab label="Exams" {...a11yProps(0)} />
        <Tab label="Users" {...a11yProps(1)} />
        <Tab label="Scores" {...a11yProps(2)} />
      </Tabs>
    </>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
