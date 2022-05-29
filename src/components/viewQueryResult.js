import Button from "@mui/material/Button";
import Close from "@material-ui/icons/Close";
import Table from "./table";
import queryHandler from "../utils/queryHandler";

function ViewQueryResult(props) {
  const { query, tables, setShowResult } = props;
  const data = queryHandler(tables, query);

  return (
    <div className="table__view">
      <Button
        variant="contained"
        style={muiStyles.closeButton}
        onClick={() => {
          setShowResult(false);
        }}
      >
        <Close />
      </Button>
      <header>
        <h1 className="header">{query}</h1>
      </header>
      <div className="table__container">
        <Table data={data} />
      </div>
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
};

export default ViewQueryResult;
