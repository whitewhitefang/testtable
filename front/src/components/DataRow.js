import React from "react";

const DataRow = props => {
  return (
    <tr>
      <td>{new Date(props.dataRow.date).toDateString()}</td>
      <td>{props.dataRow.name}</td>
      <td>{props.dataRow.amount}</td>
      <td>{props.dataRow.distance}</td>
    </tr>
  );
};

export default DataRow;