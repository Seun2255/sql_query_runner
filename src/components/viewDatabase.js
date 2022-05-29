import { useState } from "react";
import Button from "@mui/material/Button";
import Close from "@material-ui/icons/Close";
import Table from "./table";
import ArrowBack from "@material-ui/icons/ArrowBackSharp";

function ViewDatabase(props) {
  const { setView, data } = props;
  const options = [
    "Customers",
    "Suppliers",
    "Products",
    "Territories",
    "Tables",
  ];
  const [option, setOption] = useState(options[4]);

  return (
    <div className="view">
      <Button
        variant="contained"
        style={muiStyles.closeButton}
        onClick={() => {
          setView("home");
        }}
      >
        <Close />
      </Button>
      <header>
        <h1 className="header">{option}</h1>
      </header>

      {/* displays the available tables if options is set to 'Tables' and displays 
      the table selected if the option is set to one of the tables */}
      {option === "Tables" ? (
        // displays the available tables
        <div className="container">
          <div className="button__container">
            {options.map((option, index) => {
              return index !== 4 ? (
                <button
                  className="options"
                  onClick={() => {
                    setOption(option);
                  }}
                  key={index}
                >
                  {option}
                </button>
              ) : null;
            })}
          </div>
        </div>
      ) : (
        // displays the table modal for the selevted table
        <div className="table__view">
          <Button
            variant="contained"
            style={muiStyles.backButton}
            onClick={() => {
              setOption("Tables");
            }}
          >
            <ArrowBack />
          </Button>
          <header>
            <h1 className="header">{option}</h1>
          </header>
          <div className="table__container">
            <Table data={data[options.indexOf(option)].data} />
          </div>
        </div>
      )}
    </div>
  );
}

//style for MUI components
const muiStyles = {
  closeButton: {
    backgroundColor: "rgb(17, 4, 90)",
    position: "absolute",
    fontWeight: "500",
    top: "10px",
    right: "10px",
    color: "white",
    padding: "5px",
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

export default ViewDatabase;
