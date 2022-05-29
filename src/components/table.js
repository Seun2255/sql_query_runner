function Table(props) {
  const { data } = props;
  const head = data[0];
  const body = data.slice(1);

  return (
    <div className="table">
      <table border="1">
        <thead>
          <tr className="table__row" id="table__head">
            {head.map((rowData, id) => {
              return (
                <th style={{ padding: "4px" }} key={id}>
                  {rowData}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((row, index) => {
            return (
              <tr className="table__row" key={index}>
                {row.map((rowData, id) => {
                  return <td key={id}>{rowData}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
