import { useState } from "react";
import Button from "@mui/material/Button";
import ArrowBack from "@material-ui/icons/ArrowBackSharp";
import ArrowDown from "@material-ui/icons/ArrowDownwardSharp";
import ViewQueryResult from "./viewQueryResult";

function PredefinedQueryView(props) {
  const { setView, data } = props;
  const [dropdown, setDropdown] = useState(false);

  //list of predefined queries
  const queries = [
    "select * from products",
    "select contactName, contactTitle from customers",
    "select productName from products",
  ];

  const [query, setQuery] = useState(queries[0]);
  const [showResult, setShowResult] = useState(false);
  console.log("Data: ", data);

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
        <h1 className="header">Run a Predefined Query</h1>
      </header>
      <div className="query__dropdown">
        <div
          className="dropdown__item"
          style={{ borderBottom: dropdown ? "2px solid black" : "none" }}
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <span style={{ marginRight: "5px" }}>{query}</span>
          {dropdown ? null : (
            <ArrowDown sx={{ width: "100%", height: "100%" }} />
          )}
        </div>
        {dropdown &&
          queries.map((item, index) => {
            return (
              <div
                className="dropdown__item"
                key={index}
                onClick={
                  query === queries[index]
                    ? null
                    : () => {
                        setQuery(queries[index]);
                        setDropdown(false);
                      }
                }
                style={{
                  backgroundColor:
                    query === queries[index]
                      ? "rgb(47, 46, 51)"
                      : "rgb(17, 4, 90)",
                }}
              >
                {item}
              </div>
            );
          })}
      </div>
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
  backButton: {
    backgroundColor: "rgb(17, 4, 90)",
    position: "absolute",
    fontWeight: "500",
    top: "10px",
    left: "10px",
    color: "white",
    padding: "5px",
  },
  dropdownButton: {
    backgroundColor: "rgb(17, 4, 90)",
    color: "white",
    padding: "5px",
    marginRight: "5px",
  },
  runQueryButton: {
    backgroundColor: "rgb(17, 4, 90)",
    padding: "5px",
    marginTop: "40px",
  },
};

export default PredefinedQueryView;
