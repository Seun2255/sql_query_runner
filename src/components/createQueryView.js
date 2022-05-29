import { useState } from "react";
import Button from "@mui/material/Button";
import ArrowBack from "@material-ui/icons/ArrowBackSharp";
import ViewQueryResult from "./viewQueryResult";

function CreateQueryView(props) {
  const { setView, data } = props;
  const [query, setQuery] = useState("");
  const [showResult, setShowResult] = useState(false);
  return (
    <div className="view">
      <Button
        variant="contained"
        style={muiStyles.backButton}
        onClick={() => {
          setView("home");
        }}
      >
        <ArrowBack />
      </Button>
      <header>
        <h1 className="header">Create and run a Query</h1>
      </header>
      <textarea
        className="query__input"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        sx={muiStyles.runQueryButton}
        onClick={() => {
          setShowResult(true);
        }}
      >
        <span className="app__button__text">Run Query</span>
      </Button>

      {/* modal that displays Table gotten from Query */}
      {showResult && (
        <ViewQueryResult
          query={query}
          tables={data}
          setShowResult={setShowResult}
        />
      )}
    </div>
  );
}

//style for MUI components
const muiStyles = {
  runQueryButton: {
    backgroundColor: "rgb(17, 4, 90)",
    padding: "5px",
    marginTop: "40px",
  },
  backButton: {
    backgroundColor: "rgb(17, 4, 90)",
    position: "absolute",
    fontWeight: "500",
    top: "10px",
    left: "10px",
    color: "white",
    padding: "5px",
  },
};

export default CreateQueryView;
