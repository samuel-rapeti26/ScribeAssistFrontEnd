import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { FileCopy, Print, FileDownload } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
//ParagraphNum

const columns = [
  {
    field: "ParagraphNum",
    headerName: "Paragraph Num",
    flex: 1,
  },
  {
    field: "error",
    headerName: "Error",
    flex: 1,
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
    align:'left',
    headerAlign: 'left',
  },
];


const Summary = ({ revert ,rowsData,selectedNaratvies,setSelectedNarratives,handleChange}) => {

  // console.log("hi",selectedNarratives);
  const [selected, setSelected] = React.useState({});
  console.log("rowsData98",rowsData);
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
      word.push(rowsData[selectedNaratvies[i]].error);
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
    <Box sx={{ width: "100%" }}>
      <p className="mb-3">
        ** Select correct spelled words(which are shown as spelling errors) and
        add to dictionary.{" "}
      </p>{" "}
      <div className="flex justify-start items-center mb-3 gap-2">
        <Button variant="outlined" onClick={() => {}}>
          <FileCopy />
        </Button>{" "}
        <Button variant="outlined" onClick={() => {}}>
          <Print />
        </Button>{" "}
        <Button variant="outlined" onClick={() => {}}>
          <FileDownload /> <span className="ms-1"> Download as Excel </span>{" "}
        </Button>{" "}
        <Button variant="outlined" onClick={() => {}}>
          <FileDownload /> <span className="ms-1"> Download as PDF </span>{" "}
        </Button>{" "}
      </div>{" "}
      <DataGrid
        rows={rowsData}
        columns={columns}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{ Toolbar: GridToolbar }}
        onSelectionModelChange={setSelectedNarratives}
      />{" "}
      <div className="flex justify-end items-center mt-4 gap-2">
        <Button variant="contained" onClick={() => {handleChange(null,"2")}}>
          Correct Output{" "}
        </Button>{" "}
        <Button variant="contained" onClick={handleUpdateTable}>
          Update Dictonary(Selected words){" "}
        </Button>{" "}
        {/* <Button variant="contained" onClick={revert}>
          Revert back{" "}
        </Button>{" "} */}
      </div>{" "}
    </Box>
  );
};

export default Summary;
