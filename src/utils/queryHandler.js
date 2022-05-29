/* eslint-disable array-callback-return */
/**
 *
 * @param table the table requested for in the query
 * @param tables the database(all the tables)
 * @returns  the table queried for
 *
 */
function whichTable(table, tables) {
  table = table.toLowerCase();
  if (table === "customers") {
    return tables.customers;
  } else if (table === "suppliers") {
    return tables.suppliers;
  } else if (table === "territories") {
    return tables.territories;
  } else if (table === "products") {
    return tables.products;
  } else {
    return null;
  }
}

/**
 *
 * @param fields a string array of the fields requested for in the sql query
 * @param table the table the fields are to be gotten from(an array of rows(also arrays))
 * @returns  the fields requested in an array,
 *
 */
function whichFields(fields, table) {
  fields = fields.join("");
  //returns whole table if fields == '*'
  if (fields === "*") {
    return table;
  }
  fields = fields.split(",");
  for (var i = 0; i < fields.length; i++) {
    fields[i] = fields[i].toLowerCase();
  }
  var indexes = [];
  var columns = [];
  console.log("These are the fields(in function)", fields);
  table[0].map((item, index) => {
    if (fields.includes(item.toLowerCase())) {
      indexes.push(index);
    }
  });
  // eslint-disable-next-line no-redeclare
  for (var i = 0; i < fields.length; i++) {
    columns.push([]);
    // eslint-disable-next-line no-loop-func
    table.map((row) => {
      columns[i].push(row[indexes[i]]);
    });
  }
  return indexes.length === 0 ? table : columns;
}

/**
 *
 * @param  data an array of all the tables in the database
 * @param query the sql query
 * @returns  returns the data expected to be recieved from the query,
 *           returns the prducts table if the query isn't valid
 */
function queryHandler(database, query) {
  //converting query to lowercase(to remove case sensitivity)
  //and breaking it up into an array
  var data = [...database];
  var modifiedQuery = query.toLowerCase();
  modifiedQuery = modifiedQuery.split(" ");
  modifiedQuery.map((substring) => {
    return substring.replace(/\s+/g, "");
  });

  //placing the tables in objects with meaningful keys for ease of access
  const tables = {
    customers: data[0].data,
    suppliers: data[1].data,
    products: data[2].data,
    territories: data[3].data,
  };

  //checks for processing query with a default return if query is invalid
  if (modifiedQuery[0] === "select") {
    if (modifiedQuery.at(-2) === "from") {
      var fromTable = whichTable(modifiedQuery.at(-1), tables);
      if (fromTable === null) return tables.products;
      var fromFields = modifiedQuery.splice(1, modifiedQuery.length - 3);
      const fields = whichFields(fromFields, fromTable);

      //if selector is * it returns the whole table
      if (fields === fromTable) return fromTable;
      var result = [];
      for (var i = 0; i < fields[0].length; i++) {
        result.push([]);
        // eslint-disable-next-line no-loop-func
        fields.map((column) => {
          result[i].push(column[i]);
        });
      }
      return result;
    } else {
      return tables.products;
    }
  } else {
    return tables.products;
  }
}

export default queryHandler;
