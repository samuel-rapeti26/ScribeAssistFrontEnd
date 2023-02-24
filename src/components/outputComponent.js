import React,{useState} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Summary from "./summary";
import ErrorHighligtingCorrection from "./ErrorHighligtingCorrection";

const OutputComponent = ({ clickRevertBack, inputData, correctionTable }) => {
  const [value, setValue] = React.useState("1");
  const [selectedNaratvies, setSelectedNarratives] = useState([]);
  // console.log("fromoutputcomponent",inputData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Summary" value="1" />
              <Tab label="Error Highligting and Correction" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Summary revert={clickRevertBack} rowsData={correctionTable} setSelectedNarratives={setSelectedNarratives}/>
          </TabPanel>
          <TabPanel value="2">
            <ErrorHighligtingCorrection rows={correctionTable} selectedNaratvies={selectedNaratvies} setSelectedNarratives={setSelectedNarratives}/>
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
};

export default OutputComponent;
