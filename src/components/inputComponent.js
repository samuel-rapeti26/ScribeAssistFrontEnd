import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import { Modal } from "./common/modal";

const InputComponent = ({ clickProceed }) => {
  const [narrativeFieldEdit, setNarrativeFieldEdit] = useState(false);
  const [narrativeFieldValue, setNarrativeFieldValue] = useState("");
  const progress = "80%";
  const handleNarrativeChange = (event) => {
     console.log("frominputComponent98",event.target.value);
    setNarrativeFieldValue(event.target.value);
    if (narrativeFieldValue.length > 0) {
      setNarrativeFieldEdit(true);
    } else {
      setNarrativeFieldEdit(false);
    }
  };
  console.log("narrativeFieldValue98",narrativeFieldValue);
  return (
    <Paper elevation={3}>
      <div className="p-4">
        <h2 className="text-gray-600 font-semibold text-lg text-uppercase pb-2 mb-2 ps-2">
          Load the narrative
        </h2>
        <div className="flex gap-4 flex-col">
          <TextField
            onChange={(e) => handleNarrativeChange(e)}
            id="filled-textarea"
            label="Input Narrative"
            placeholder="Paste your Narrative here"
            multiline
            rows={12}
            disabled={narrativeFieldEdit}
            value={narrativeFieldValue}
          />
          <div className="w-full flex gap-2 items-center">
            <div className="w-full">
              {/* <LinearProgress /> */}
            </div>
            {/* <p className="w-12 text-xl font-bold">{progress}</p> */}
          </div>
          <div className="flex justify-end gap-2">
            <Button size="large" variant="contained" onClick={()=>clickProceed(narrativeFieldValue)}>
              Click to Proceed
            </Button>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => {
                setNarrativeFieldValue("");
                setNarrativeFieldEdit(false);
              }}
            >
              Refresh Narrative
            </Button>
          </div>
        </div>
      </div>
      <Modal
        modalId="openTemplate"
        open={narrativeFieldEdit}
        setOpen={() => setNarrativeFieldEdit(false)}
        title={""}
        size="sm"
        escape
        content={
          <div className="flex flex-col gap-4 items-center justify-center">
            <h2 className="text-4xl font-semibold text-gray-500 text-uppercase">
              Not editable/ modifiable
            </h2>
            <p className="text-gray-800 text-sm">
              This field can't be modified after pasting narrative here. Refresh
              the tool if needed.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={() => setNarrativeFieldEdit(false)}
              >
                Cancel
              </Button>
              <Button
                size="small"
                color="inherit"
                variant="contained"
                onClick={() => {
                  setNarrativeFieldValue("");
                  setNarrativeFieldEdit(false);
                }}
              >
                Refresh Narrative
              </Button>
            </div>
          </div>
        }
      />
    </Paper>
  );
};

export default InputComponent;
