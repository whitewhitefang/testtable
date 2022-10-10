import React, { useContext } from "react";
import DataRow from "./DataRow";
import SelectRange from "../ui/SelectRange";
import SelectWord from "../ui/SelectWord";
import classes from './Table.module.css';
import TableContext from "../store/table-context";

const Table = () => {  
  const context = useContext(TableContext);
  
  return (
    <table>
      <thead>
        <tr>
          <td>
            <div className={classes.pagination}>
              <div>Page <span className="badge bg-primary">{context.currentPageCount}</span> of {context.pageCount}</div>
              <div className={classes.buttons}>
                <button className="btn btn-small" onClick={() => context.decreasePageCount()}>&#9204;</button>
                <button className="btn btn-small" onClick={() => context.encreasePageCount()}>&#9205;</button>
              </div>
            </div>
          </td>
          <td>
            <SelectWord />
          </td>
          <td>
            <SelectRange category="amount" key={"amount"} />
          </td>
          <td>
            <SelectRange category="distance" key={"distance"} />
          </td>
        </tr>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        {context.sortedData.map(row => {
          return <DataRow dataRow={row} key={row.id} />          
        })}
      </tbody>  
    </table>
  );
};

export default Table;