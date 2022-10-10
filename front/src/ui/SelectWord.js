import React, { useContext } from "react";
import classes from './SelectWord.module.css';
import TableContext from "../store/table-context";

const SelectWord = props => {
  const context = useContext(TableContext);

  return (
    <div className={classes.select}>
      <details>
        <summary>Sort by name</summary>        
        <input 
          id="name" 
          onChange={event => {
            if (!event.target.value) {
              context.toggleIsSorted(false);
            } else {
              context.sortByName(context.data, event.target.value);
              context.toggleIsSorted(true);
            }
          }}
          type="text" 
          size="10" />        
      </details>
    </div>
  )
}

export default SelectWord;