import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ViewDictonary from "./viewDictonary";
import ModifyDictonary from "./ModifyDictonary";
import RulesPdf from "../assets/Sanofi - Narrative QC Tool - Scenarios.pdf";


const DictionarieComponent = ({ clickRevertBack }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Rules" value="1" />
              <Tab label="View Dictionary" value="2" />
              <Tab label="Modify Dictionary" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="h-screen">
              <object
                data={RulesPdf}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href={RulesPdf}>to the PDF!</a>
                </p>
              </object>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <ViewDictonary />
          </TabPanel>
          <TabPanel value="3">
            <ModifyDictonary/>
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
};

export default DictionarieComponent;
