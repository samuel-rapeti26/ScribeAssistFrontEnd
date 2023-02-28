import { useEffect, useState } from "react";
import axios from "axios";
import InputComponent from "./components/inputComponent";
import OutputComponent from "./components/outputComponent";
import DictionarieComponent from "./components/dictionarieComponent";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ManualPdf from "./assets/Smart Error Detector Tool_User Manual_V1.0.0.pdf";
import "./style.css";
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";

function App() {
  const [sidebarItems, setSidebarItems] = useState({
    input: true,
    output: false,
    rules: false,
    userManual: false,
  });
  const [parasContent, setParasContent] = useState([])
  const [paragraph, setParagraph] = useState("");
  const [data, setdata] = useState([]);
  const [table, setTable] = useState({});
  const key1 = Cookies.get("access_token_cookie");
  const key2 = Cookies.get("csrf_access_token");

  axios.defaults.withCredentials = true;

  const headers1 = {
    // "Accept": "application/json",
    // "Content-Type": "application/json",
    "X-CSRF-TOKEN": key2,
    access_token_cookie: key1,
    Accept: "*/*",
  };

  const getCorrectionTable = (data) => {
    // console.log("datasplitt", data);
    const payload = { data };
    try {
      axios
        .post("http://localhost:2000/summary", payload, { headers: headers1 })
        .then((response) => {
          console.log("response", response);
          const rowdata = Object.keys(response.data.output.Category).map(
            (key) => ({
              id: key,
              error: response.data.output.Error[key],
              suggestion: response.data.output.Suggestion[key],
              errorType: response.data.output.ErrorType[key],
              category: response.data.output.Category[key],
              StartPos: response.data.output.StartPos[key],
              EndPos: response.data.output.EndPos[key],
              Operation: response.data.output.Operation[key],
              FrontendAction: response.data.output.FrontendAction[key],
              ParagraphNum: response.data.output.ParagraphNum[key]
            })
          );
          setParasContent(data);
          setTable(rowdata);
          setSidebarItems({
            ...sidebarItems,
            output: true,
            input: false,
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
      // setTable(await api.post("", { data }));
      // setTable(await api.get(""));
    } catch (e) {
      console.error(e);
    }
    console.log("table", table);
  };


  const Proceed = (narrativeFieldValue) => {
    console.log("narrative", narrativeFieldValue);
    setParagraph(narrativeFieldValue);
    // console.log("paragraph", paragraph);
    const temp = narrativeFieldValue.split("\n");
    console.log("temp", temp);
    setdata(temp);
    // console.log("splitdata", data);
    getCorrectionTable(temp);
  };

  // console.log("fromapp.js", data);

  const RevertBack = () => {
    setSidebarItems({
      ...sidebarItems,
      output: false,
      input: true,
    });
  };

  return (
    <div className="">
      <header className="py-3 bg-skyblue">
        <div className="px-4">
          <div className="flex items-center">
            <div className="w-2/12">
              <h1 className="logo font-bold text-white text-xl text-start text-uppercase">
                Scribe Assist
              </h1>
            </div>
            <div className="w-10/12">
              <div className="flex justify-end items-center">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={() => {}}
                  color="inherit"
                  className="text-white"
                >
                  <AccountCircle className="text-white" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="">
        <div className="flex h-full">
          <div className="w-2/12 h-screen sidebar">
            <div className="flex flex-col p-4 gap-2">
              <div
                className={`text-lg text-white cursor-pointer px-2 py-1 rounded-md  ${
                  sidebarItems.input
                    ? "bg-gray-400"
                    : "hover:bg-teal-600 hover:animate-pulse"
                }`}
                onClick={() =>
                  setSidebarItems({
                    input: true,
                    output: false,
                    rules: false,
                    userManual: false,
                  })
                }
              >
                Input
              </div>
              <div
                className={`text-lg text-white cursor-pointer px-2 py-1 rounded-md  ${
                  sidebarItems.output
                    ? "bg-gray-400"
                    : "hover:bg-teal-600 hover:animate-pulse"
                }`}
                onClick={() =>
                  setSidebarItems({
                    input: false,
                    output: true,
                    rules: false,
                    userManual: false,
                  })
                }
              >
                Output
              </div>
              <div
                className={`text-lg text-white cursor-pointer px-2 py-1 rounded-md  ${
                  sidebarItems.rules
                    ? "bg-gray-400"
                    : "hover:bg-teal-600 hover:animate-pulse"
                }`}
                onClick={() =>
                  setSidebarItems({
                    input: false,
                    output: false,
                    rules: true,
                    userManual: false,
                  })
                }
              >
                Dictionaries & Rule
              </div>
              <div
                className={`text-lg text-white cursor-pointer px-2 py-1 rounded-md  ${
                  sidebarItems.userManual
                    ? "bg-gray-400"
                    : "hover:bg-teal-600 hover:animate-pulse"
                }`}
                onClick={() =>
                  setSidebarItems({
                    input: false,
                    output: false,
                    rules: false,
                    userManual: true,
                  })
                }
              >
                User manual
              </div>
            </div>
          </div>
          <div className="w-10/12 px-8 py-4">
            {sidebarItems.input && (
              <InputComponent
                clickProceed={(narrativeFieldValue) =>
                  Proceed(narrativeFieldValue)
                }
              />
            )}
            {sidebarItems.output && (
              <OutputComponent
                clickRevertBack={() => RevertBack()}
                inputData={paragraph}
                correctionTable={table}
                parasContent={parasContent}
              />
            )}
            {sidebarItems.rules && (
              <DictionarieComponent clickRevertBack={() => RevertBack()} />
            )}
            {sidebarItems.userManual && (
              <div className="h-screen">
                <object
                  data={ManualPdf}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                >
                  <p>
                    Alternative text - include a link{" "}
                    <a href={ManualPdf}>to the PDF!</a>
                  </p>
                </object>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
