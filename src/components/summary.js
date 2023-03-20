import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from 'react-redux';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridToolbarExport,
  useGridApiContext,
} from "@mui/x-data-grid";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import ItemsTable from "./ItemsTable";
import userReducer from "../reducers/user";
//ParagraphNum
const data = {
  id: "5df3180a09ea16dc4b95f910",
  items: [
    {
      sr: 1,
      desc: "desc1",
      xyz: 5,
    },
    {
      sr: 2,
      desc: "desc2",
      xyz: 6,
    },
  ],
};
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDoc = ({ data = [] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <ItemsTable data={data} />
    </Page>
  </Document>
);

const Summary = ({
  revert,
  rowsData,
  selectedNaratvies,
  setSelectedNarratives,
  handleChange,
}) => {
  // console.log("hi",selectedNarratives);
  const { user: userStore } = useSelector(
      (state) => state.userReducer
  );
  const [selected, setSelected] = React.useState({});
  console.log("rowsData98", rowsData);
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
      user.push(userStore);
    }
    let temp = { word: word, time: time, user: userStore };
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

  let filteredData = rowsData.filter((data) => data.error !== "\n");
  let valueOptions = new Set();
  filteredData.forEach((element) => {
    valueOptions.add(element.errorType);
  });

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
      type: "singleSelect",
      valueOptions: [...valueOptions],
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <p className="mb-3">
        ** Select correct spelled words(which are shown as spelling errors) and
        add to dictionary.{" "}
      </p>{" "}
      <DataGrid
        rows={filteredData}
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
        <Button
          variant="contained"
          onClick={() => {
            handleChange(null, "2");
          }}
        >
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
