import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ErrorHighligtingCorrection from "./ErrorHighligtingCorrection";
import { useSelector } from "react-redux";

const OutputComponent = ({ clickRevertBack, parasContent }) => {
  const { table: correctionTable } = useSelector(
    (state) => state.correctionTableReducer
  );

  const [selectedNaratvies, setSelectedNarratives] = useState([]);

  return (
    <Paper elevation={3}>
      <div className="p-4">
        <Typography variant="h6" gutterBottom>
          Error Highligting and Correction
        </Typography>
        <ErrorHighligtingCorrection
          rows={correctionTable}
          selectedNaratvies={selectedNaratvies}
          setSelectedNarratives={setSelectedNarratives}
          parasContent={parasContent}
          goInputHandler={clickRevertBack}
        />
      </div>
    </Paper>
  );
};

export default OutputComponent;
