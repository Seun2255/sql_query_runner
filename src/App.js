import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import { usePapaParse } from "react-papaparse";
import CreateQueryView from "./components/createQueryView";
import PredefinedQueryView from "./components/predefinedQueryView";
import ViewDatabase from "./components/viewDatabase";
import urls from "./urls";

function App() {
  const { readRemoteFile } = usePapaParse();
  const [view, setView] = useState("home");
  const [data, setData] = useState([]);

  useEffect(() => {
    var tables = [];
    // eslint-disable-next-line array-callback-return
    urls.map((url, id) => {
      readRemoteFile(url, {
        complete: (results) => {
          tables[id] = results;
        },
      });
    });
    setData(tables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Home Page / Main View
    <div className="App">
      <Button
        variant="contained"
        style={muiStyles.databaseButton}
        onClick={() => {
          setView("viewDatabase");
        }}
      >
        Database
      </Button>
      <header>
        <h1 className="header">
          Run and instantly view the results of your queries
        </h1>
      </header>
      <section className="container">
        <div className="button__container">
          <Button
            variant="contained"
            style={muiStyles.createQueryButton}
            onClick={() => {
              setView("createQuery");
            }}
          >
            <span className="app__button__text">Create Query</span>
          </Button>
          <Button
            variant="contained"
            style={muiStyles.predefinedQueryButton}
            onClick={() => {
              setView("predefinedQueryView");
            }}
          >
            <span className="app__button__text">Run Predefined queries</span>
          </Button>
        </div>
      </section>

      {/* Views */}
      {view === "createQuery" && (
        <CreateQueryView setView={setView} data={data} />
      )}
      {view === "predefinedQueryView" && (
        <PredefinedQueryView setView={setView} data={data} />
      )}
      {view === "viewDatabase" && (
        <ViewDatabase setView={setView} data={data} />
      )}
    </div>
  );
}

//style for MUI components
const muiStyles = {
  databaseButton: {
    backgroundColor: "rgb(17, 4, 90)",
    position: "absolute",
    fontWeight: "500",
    top: "10px",
    right: "10px",
    color: "white",
    padding: "5px",
  },
  predefinedQueryButton: {
    backgroundColor: "rgb(17, 4, 90)",
    padding: "5px 10px",
  },
  createQueryButton: {
    backgroundColor: "rgb(17, 4, 90)",
    padding: "5px",
    marginBottom: "40px",
  },
};

export default App;
