import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Cookies from "js-cookie";

const ViewDictonary = ({ clickRevertBack }) => {
  const [age, setAge] = React.useState("");
  const key1 = Cookies.get("access_token_cookie");
  const key2 = Cookies.get("csrf_access_token");
  const [rows1, setRows1] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [rows3, setRows3] = React.useState([]);
  const [rows4, setRows4] = React.useState([]);

  axios.defaults.withCredentials = true;

  const headers1 = {
    // "Accept": "application/json",
    // "Content-Type": "application/json",
    access_token_cookie: key1,
    Accept: "*/*",
  };

  const handleChange = (event) => {
    console.log(event);
    setAge(event.target.value);
    try {
      axios
        .get("http://localhost:2000/viewdict", {
          headers: headers1,
        })
        .then((response) => {
          console.log("response", response);
          const rowdata2 = Object.keys(response.data.data.accepted_abbrev).map(
            (key) => ({
              id: key,
              "Accepted Abbreviation": response.data.data.accepted_abbrev[key],
            })
          );
          console.log("rowdata2", rowdata2);
          const rowdata1 = Object.keys(response.data.data.additional_words).map(
            (key) => ({
              id: key,
              ...response.data.data.additional_words[key],
            })
          );
          console.log("rowdata1", rowdata1);
          const rowdata3 = Object.keys(response.data.data.product_list).map(
            (key) => ({
              id: key,
              "Product List": response.data.data.product_list[key],
            })
          );
          console.log("rowdata3", rowdata3);
          const rowdata4 =response.data.data.unit_codes.NAME.map(
            (key,index) => ({
              id:index,
              NAME: key,
              R3_CODE: response.data.data.unit_codes.R3_CODE[index],
            })
          );
          console.log("rowdata4", rowdata4);
          setRows1(rowdata1);
          setRows2(rowdata2);
          setRows3(rowdata3);
          setRows4(rowdata4);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (e) {
      console.log("error", e);
    }
  };

  const columns2 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Accepted Abbreviation",
      headerName: "Accepted Abbreviation",
      editable: true,
      flex: 1,
    },
  ];

  const columns1 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Words",
      headerName: "Words",
      editable: true,
      flex: 1,
    },
    {
      field: "Time",
      headerName: "Time",
      editable: true,
      flex: 1,
    },
    {
      field: "User",
      headerName: "User",
      editable: true,
      flex: 1,
    },
  ];

  const columns3 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Product List",
      headerName: "Product List",
      editable: true,
      flex: 1,
    },
  ];

  const columns4 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "NAME",
      headerName: "NAME",
      editable: true,
      flex: 1,
    },
    {
      field: "R3_CODE",
      headerName: "R3_CODE",
      editable: true,
      flex: 1,
    },
  ];

  return (
    <div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select the view
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Select the view"
              onChange={handleChange}
            >
              <MenuItem value={1}>1. Updated Dictionary (Additional)</MenuItem>
              <MenuItem value={2}>2. Accepted Abbreviations</MenuItem>
              <MenuItem value={3}>3. Product List</MenuItem>
              <MenuItem value={4}>4. Unit Code (R3)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="grid grid-cols-1 ">
        <div className="shadow-md bg-white p-2">
          <div className="w-full">
            {age === 1 && (
              <DataGrid
                rows={rows1}
                columns={columns1}
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            )}
            {age === 2 && (
              <DataGrid
                rows={rows2}
                columns={columns2}
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            )}
            {age === 3 && (
              <DataGrid
                rows={rows3}
                columns={columns3}
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            )}
            {age === 4 && (
              <DataGrid
                rows={rows4}
                columns={columns4}
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDictonary;
