import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function ModifyDictonary() {
  const columns = [
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

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  const [table, setTable] = useState({});
  const [rows, setRows] = useState([]);
  const [selecteditems, setSelectedItems] = useState({});
  const key1 = Cookies.get("access_token_cookie");
  const key2 = Cookies.get("csrf_access_token");

  axios.defaults.withCredentials = true;

  const headers1 = {
    // "Accept": "application/json",
    // "Content-Type": "application/json",
    access_token_cookie: key1,
    Accept: "*/*",
  };

  const headers2 = {
    // "Accept": "application/json",
    // "Content-Type": "application/json",
    "X-CSRF-TOKEN": key2,
    access_token_cookie: key1,
    Accept: "*/*",
  };

  const fetchData = ()=>{
    try {
      axios
        .get("http://localhost:2000/temptable", { headers: headers1 })
        .then((response) => {
          //   setTable(response.data);
          console.log("response", response);
          const rowdata = Object.keys(response.data.data).map((key) => ({
            id: key,
            ...response.data.data[key],
          }));
          console.log("rowdata", rowdata);
          setRows(rowdata);
        })
        .catch((error) => {
          console.log("error", error);
        });
      // setTable(await api.post("", { data }));
      // setTable(await api.get(""));
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onSelectionChange = (model) => {
    let word = [];
    let user = [];
    let time = [];
    model.forEach((element) => {
      word.push(rows[element].Words);
      user.push(rows[element].User);
      time.push(rows[element].Time);
    });

    const selected = { word: word, time: time, user: user };
    console.log("selecteditem", selected);
    setSelectedItems(selected);
    console.log("hi", selecteditems);
  };

  const addwords = () => {
    try {
      axios
        .post("http://localhost:2000/addwords", selecteditems, {
          headers: headers2,
        })
        .then((response) => {
          console.log("response", response);
          alert("Word(s) added to the dictionary.");
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (e) {
      console.log("error", e);
    }
    fetchData();
  };

  const rejectwords = () => {
    try {
      axios
        .post("http://localhost:2000/rejectwords", selecteditems, {
          headers: headers2,
        })
        .then((response) => {
          console.log("response", response);
          alert("Word(s) removed from the dictionary.");
          fetchData();
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (e) {
      console.log("error", e);
    }
    fetchData();
  };

  return (
    <div className="bg-white flex flex-col gap-2 w-full shadow-lg p-2">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{ Toolbar: GridToolbar }}
        onSelectionModelChange={onSelectionChange}
      />
      <div className="w-full flex justify-center items-center px-4 gap-2">
        <Button variant="contained" onClick={addwords}>
          Accept
        </Button>
        <Button variant="contained" onClick={rejectwords}>
          Reject
        </Button>
      </div>
    </div>
  );
}
export default ModifyDictonary;
