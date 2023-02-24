import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Highlighter from "react-highlight-words";

const ErrorHighligtingCorrection = ({rows, selectedNaratvies,setSelectedNarratives}) => {
  const [sentence, setsentence] = useState([]);
  const [error, seterror] = useState([]);
  const [correction, setcorrection] = useState([]);
  const [finalerror, setfinalerror] = useState([]);
  const [para, setpara] = useState(
    "Initial information received on 17-Apr-2019 regarding a unsolicited valid serious case received from a nurse from Cech Repblic.This case involves a 62 years old male patient had hyperglycemia, while he was treated with PQC (MNO) with the use of medical device ABC.The patient's medical history includes disability.No concomitant medication is reported.On an unknown date in 2017 (reported 2 years ago), the patient started taking PQC solution for injection at a dose of 80 U once daily at night   via subcutaneous route (with an unknown strength, batch number and expiry date) for DM.On an unknown date in December-2018, approximately 1 year after initiation of PQC it is reported that the patient was running out of suspect drug and thus from an unknown date in 2019, the patient had elevated blood sugars characterized by blood blood sugar levels of 500, 600 and sometimes gets as low as 300 when the patient has not eaten (hyperglycemia). Seriousness criteria was assessed as medically significant for the event as per reporter. Blood glucose in 2016 was 125 mg/dl. Action taken was none for hyperglycemia. The patient was treated with insulin human, insulin human injection, isophane (Novolin) for hyperglycemia. The event outcome was reported as not resolved for hyperglycemia.No further relvant information is reporting ~  "
  );
  const [sortByTwo, setsortByTwo] = useState([]);
  const [errorType, setErrorType] = useState();
  const [correctedFieldValue, setCorrectedFieldValue] = useState(
    "Samuel is a good boy"
  );
  const [correctedFieldValue2, setCorrectedFieldValue2] = useState();
  const [correctedFieldValue3, setCorrectedFieldValue3] = useState();

  const columns = [
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
      field: "Operation",
      headerName: "Operation",
      flex: 1,
    },
    {
      field: "FrontendAction",
      headerName: "FrontendAction",
      flex: 1,
    },
    {
      field: "ParagraphNum",
      headerName: "ParagraphNum",
      flex: 1,
    }
  ];

  // const suggest = [{ paragraphNum: "1", error: "she", suggestion: "he", errorType: "Invalid/ambiguous date (month)", category: "Optional", startPos: "33", endPos: "43", operation: "date2", frontendAction:"Replace"  },
  // { paragraphNum: "1", error: "01-Apr-2020", suggestion: "01-Apr-20", errorType: "Invalid/ambiguous date (month)", category: "Optional", startPos: "33", endPos: "43", operation: "date2", frontendAction:"Replace"},
  // { error: "she", suggestion: "he", paragraph: 1, position: 15 }];
  const suggest = [
    { error: "Tis", suggestion: "This", paragraph: 2, position: 1 },
    { error: "Iniial", suggestion: "Initial", paragraph: 1, position: 1 },
  ];
  const List = [
    "01-Arp-2020",
    "ID",
    "XYZ",
    "involves",
    "ABC",
    "is",
    "COPD",
    "his",
    "dl",
    "QD",
    "unknonw",
    "strngth",
    "diabets",
    "fo",
    "can",
    "   ",
    "MNO",
    "reported reported",
    "~",
  ];
  useEffect(() => {
    if (para) {
      setsentence(para.split("\n\n"));
    }

    setsortByTwo(
      suggest.sort(function (a, b) {
        return a.paragraph - b.paragraph || a.position - b.position;
      })
    );
    const temp = para.split("\n");
    for (let j = 0; j < temp.length; j++) {
      let temp_para = temp[j];

      let temp_error = temp_para.split(" ");

      let temp_correction = temp_para.split(" ");

      console.log(sortByTwo);
      suggest.map((words) => {
        for (let i = 0; i < temp_error.length; i++) {
          console.log(
            words.position === i + 1 && words.error === temp_error[i]
          );

          if (words.position === i + 1 && words.error === temp_error[i]) {
            temp_correction[i] = words.suggestion;
            temp_error[i] = words.errorType;
            console.log("temp_error[i] ", temp_error[i]);
            // seterror(current => [...current, temp_error.join("")]);
            // setcorrection(current => [...current, temp_correction.join(" ")]);

            console.log("error", errorType);

            console.log("correction", correction);

            // setfinalerror(finalerror + errorType.join("\n"));
            // setfinalcorrection(finalcorrection + correction.join("\n"));
            // console.log("finalerror", finalerror);
            // console.log("finalcorrection", finalcorrection);
          }
        }
      });
    }
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col gap-4">
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
            selectionModel={selectedNaratvies}
            onSelectionModelChange={setSelectedNarratives}
          />{" "}
          <div className="w-full flex justify-end items-center px-4 gap-2">
            <Button variant="contained"> Correct output </Button>{" "}
            <Button variant="contained"> Update dict </Button>{" "}
            <Button variant="contained"> Revert back </Button>{" "}
          </div>{" "}
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="shadow-md bg-white p-2 flex flex-col gap-2 "
            style={{ height: " -webkit-fill-available" }}
          >
            <h2 className="text-xl text-gray-600 border-b pb-2">
              Error Highligted{" "}
            </h2>
            <div>
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={List}
                autoEscape={true}
                textToHighlight={para}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col gap-4">
          <div className="shadow-md bg-white p-2 flex flex-col gap-2">
            <h2 className="text-xl text-gray-600 border-b pb-2">
              Customized Correction{" "}
            </h2>{" "}
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[]}
              autoEscape={true}
              textToHighlight={para}
            />{" "}
            <div className="flex justify-center items-center w-full">
              <Button size="large" variant="contained">
                Finalize.{" "}
              </Button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="shadow-md bg-white p-2 flex flex-col gap-2">
          <h2 className="text-xl text-gray-600 border-b pb-2">
            Final Narrative{" "}
          </h2>{" "}
          <Highlighter
            highlightClassName="YourHighlightClass"
            highlightStyle={{ backgroundColor: "lightgreen" }}
            searchWords={List}
            autoEscape={true}
            textToHighlight={para}
          />{" "}
          <div className="flex justify-center items-center w-full">
            <Button size="large" variant="contained">
              Download doc.{" "}
            </Button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ErrorHighligtingCorrection;

// import React, { useState } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { Button, TextField } from "@mui/material";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "firstName",
//     headerName: "First name",
//     editable: true,
//     flex: 1,
//   },
//   {
//     field: "lastName",
//     headerName: "Last name",
//     editable: true,
//     flex: 1,
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     editable: true,
//     flex: 1,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     flex: 1,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

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

// const ErrorHighligtingCorrection = () => {
//   const [sentence, setsentence] = useState([]);
//   const [para, setpara] = useState([]);
//   const [sortByTwo, setsortByTwo] = useState([]);
//   const [error, setError] = useState([]);
//   const [correctedFieldValue, setCorrectedFieldValue] = useState();
//   const [correctedFieldValue2, setCorrectedFieldValue2] = useState();
//   const [correctedFieldValue3, setCorrectedFieldValue3] = useState();

//   const suggest = [{ error: "an", suggestion: "a", paragraph: 0, position: 6},
//   { error: "stat", suggestion: "States", paragraph: 0, position: 4},
//   { error: "shw", suggestion: "he", paragraph: 1, position: 15}];
//   useEffect(() => {

//   setpara("Initial information from United stat regarding in an unsoliciated valid non serious case recieved ffrom non-health care proffessional on 8-oct-2023. \nThis ase involves a 82 years old lady patient for whom it eas eported that she did not performe safety test on his LXYZ pen in years ");
//   setsentence(para.split("\n"));

//   setsortByTwo(suggest.sort(function (a, b) {
//       return  a.paragraph - b.paragraph || a.position - b.position;
//   }));
//   const errorCorrection= () => {
//     const temp = para.split("\n");
//     console.log("temp", temp);

// for (let j = 0; j < temp.length; j++) {
//     let temp_para= temp[j];

// let temp_error = temp_para.split(" ");
// let temp_correction = temp_para.split(" ");

// sortByTwo.forEach((words)=> {
//      for(let i=0 ; i<temp_error.length ; i++) {

// if(words.position === i && words.error === temp_error[i]) {
//     temp_correction[i] = "<span style="color:greens">"+words. suggestion+"</span>";
//     temp_error[i]="<span style="color:red">"+words.error+"</span>";

// seterror(current => [...current, temp_error.join("")]);
//  setcorrection(current => [...current, temp_correction.join(" ")]);

// console.log("error", error);

//  console.log("correction", correction);

// setfinalerror(finalerror+error.join("\n"));
//  setfinalcorrection(finalcorrection + correction.join("\n"));
//  console.log("finalerror", finalerror);
//  console.log("finalcorrection", finalcorrection);
// }
// }
// });

// }    }, []);
//   return (
//     <div className="flex flex-col gap-4">
//       <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 h-full">

//         <div className="flex flex-col gap-4">
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           autoHeight
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           checkboxSelection
//           disableSelectionOnClick
//           experimentalFeatures={{ newEditingApi: true }}
//           components={{ Toolbar: GridToolbar }}
//         />
//         <div className="w-full flex justify-end items-center px-4 gap-2">
//           <Button variant="contained">Correct output</Button>
//           <Button variant="contained">Update dict</Button>
//           <Button variant="contained">Revert back</Button>
//         </div>
//         </div>

//       <div className="flex flex-col gap-4">
//       <div className="shadow-md bg-white p-2 flex flex-col gap-2">
//             <h2 className="text-xl text-gray-600 border-b pb-2">
//               Error Highligted
//             </h2>
//             <TextField
//              disabled="disabled"
//               id="filled-textarea"
//               multiline
//               rows={12}
//               value={correctedFieldValue}
//             />

//           </div>
//           </div>
//       </div>
//       <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 h-full">

//         <div className="flex flex-col gap-4">

//           <div className="shadow-md bg-white p-2 flex flex-col gap-2">
//             <h2 className="text-xl text-gray-600 border-b pb-2">
//               Customized Correction
//             </h2>
//             <TextField
//             disabled="disabled"

//               id="filled-textarea"

//               multiline
//               rows={12}
//               value={correctedFieldValue2}
//             />
//             <div className="flex justify-center items-center w-full">
//               <Button size="large" variant="contained">
//                 Finalize.
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="shadow-md bg-white p-2 flex flex-col gap-2">
//           <h2 className="text-xl text-gray-600 border-b pb-2">
//             Final Narrative
//           </h2>
//           <TextField
//           disabled="disabled"

//               id="filled-textarea"

//               placeholder="Final output will be displayed here once you finalise the customised correction"
//               multiline
//               rows={12}
//               value={correctedFieldValue3}
//             />
//           <div className="flex justify-center items-center w-full">
//             <Button size="large" variant="contained">
//               Download doc.
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorHighligtingCorrection ;
