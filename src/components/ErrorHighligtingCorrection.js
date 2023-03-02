import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ErrorsContent from "./ErrosContent";
import SuggestionContent from "./SuggestionContent";
import FinalNarrative from "./FinalNarrative";
import axios from "axios";
import Cookies from "js-cookie";

const ErrorHighligtingCorrection = ({
  rows,
  selectedNaratvies,
  setSelectedNarratives,
  parasContent,
}) => {
  let rowsData = rows.map((row) => ({
    ...row,
    paraContent: parasContent[row.ParagraphNum - 1],
  }));

  // console.log("hi", selectedNaratvies);

  const [selected, setSelected] = React.useState({});
  const [correctOutput, setCorrectOutput] = useState([]);
  const [finalisedNarratives, setFinalisedNarratives] = useState([]);
  const columns = [
    { field: "para", headerName: "Para", width: 90 },
    {
      field: "error",
      headerName: "Error",
      flex: 1,
      cellClassName: "highlight--cell",
    },
    {
      field: "suggestion",
      headerName: "Suggestion",
      flex: 1,
    },
    {
      field: "errorType",
      headerName: "Error Type",
      type: "number",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "StartPos",
      headerName: "StartPos",
      flex: 1,
    },
    {
      field: "EndPos",
      headerName: "EndPos",
      flex: 1,
    },
    {
      field: "operation",
      headerName: "Operation",
      flex: 1,
    },
    {
      field: "frontEndAction",
      headerName: "FrontendAction",
      flex: 1,
    },
  ];

  const correctOutputHandle = () => {
    if (selectedNaratvies.length > 0) {
      setFinalisedNarratives(selectedNaratvies);
    }
  };

  const onFinaliseClick = () => {
    setCorrectOutput(finalisedNarratives);
  };

  axios.defaults.withCredentials = true;

  const handleUpdateTable = () => {
    let word = [];
    let time = [];
    let user = [];
    for (let i = 0; i < selectedNaratvies.length; i++) {
      let currentDate = new Date();
      let t =
        currentDate.getHours() +
        ":" +
        currentDate.getMinutes() +
        ":" +
        currentDate.getSeconds();
      word.push(rows[selectedNaratvies[i]].error);
      time.push(t);
      user.push(sessionStorage.getItem("user"));
    }
    let temp = { word: word, time: time, user: user };
    // console.log("hiloo", temp);
    setSelected(temp);

    //Update table api

    const key1 = Cookies.get("access_token_cookie");
    const key2 = Cookies.get("csrf_access_token");

    const headers1 = {
      // "Accept": "application/json",
      // "Content-Type": "application/json",
      "X-CSRF-TOKEN": key2,
      access_token_cookie: key1,
      Accept: "*/*",
    };
    try {
      axios
        .post("http://localhost:2000/updatedict", temp, { headers: headers1 })
        .then((response) => {
          console.log("response", response);
          alert("Request sent to update dictionary.");
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col gap-4">
          <DataGrid
            rows={rowsData}
            columns={columns}
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            onSelectionModelChange={setSelectedNarratives}
            selectionModel={selectedNaratvies} //### to select rows in ErrorHighlighting that are selected in summary
            sx={{
              "& .highlight--cell": {
                backgroundColor: "#90ee90",
              },
            }}
          />
          <div className="w-full flex justify-end items-center px-4 gap-2">
            <Button variant="contained" onClick={correctOutputHandle}>
              {" "}
              Correct output{" "}
            </Button>
            <Button variant="contained" onClick={handleUpdateTable}>
              {" "}
              Update dict{" "}
            </Button>
            <Button variant="contained"> Revert back </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="shadow-md bg-white p-2 flex flex-col gap-2 "
            style={{ height: " -webkit-fill-available" }}
          >
            <h2 className="text-xl text-gray-600 border-b pb-2">
              Error Highligted
            </h2>
            <ErrorsContent paragraphs={rowsData} parasContent={parasContent} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 h-full">
        {!!finalisedNarratives.length && (
          <div className="flex flex-col gap-4">
            <div className="shadow-md bg-white p-2 flex flex-col gap-2">
              <h2 className="text-xl text-gray-600 border-b pb-2">
                Customized Correction
              </h2>
              <SuggestionContent
                paragraphs={rowsData}
                selectedNaratvies={finalisedNarratives}
                parasContent={parasContent}
              />
              <div className="flex justify-center items-center w-full">
                <Button
                  size="large"
                  variant="contained"
                  onClick={onFinaliseClick}
                >
                  Finalize.
                </Button>
              </div>
            </div>
          </div>
        )}
        {!!correctOutput.length && (
          <div className="shadow-md bg-white p-2 flex flex-col gap-2">
            <h2 className="text-xl text-gray-600 border-b pb-2">
              Final Narrative
            </h2>
            <FinalNarrative
              paragraphs={rowsData}
              selectedNaratvies={correctOutput}
              parasContent={parasContent}
            />
            <div className="flex justify-center items-center w-full">
              <Button size="large" variant="contained">
                Download doc.
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorHighligtingCorrection;
