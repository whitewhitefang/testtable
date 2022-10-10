import React, { useContext } from "react";
import classes from './SelectRange.module.css';
import TableContext from "../store/table-context";

const SelectRange = props => {
  const context = useContext(TableContext);

  return (
    <div className={classes.select}>
      <details className={classes.details}>
        <summary>Sort by...</summary>
        <label htmlFor="equality">{props.category} = </label>
        <input 
          id="equality" 
          onChange={event => {
            if (!event.target.value) {
              context.toggleIsSorted(false);
            } else {
              context.sortByEqual(context.data, props.category, event.target.value);
              context.toggleIsSorted(true);
            }
          }} 
          type="text" 
          size="6" 
        />
        <label htmlFor="more">{props.category} &gt; </label>
        <input 
          id="more" 
          onChange={event => {
            if (!event.target.value) {
              context.toggleIsSorted(false);
            } else {
              context.sortIsMore(context.data, props.category, event.target.value);
              context.toggleIsSorted(true);
            } 
          }}
          type="text" 
          size="6" 
        />
        <label htmlFor="less">{props.category} &lt; </label>
        <input 
          id="less" 
          onChange={event => {
            if (!event.target.value) {
              context.toggleIsSorted(false);
            } else {
              context.sortIsLess(context.data, props.category, event.target.value);
              context.toggleIsSorted(true);
            } 
          }}
          type="text" 
          size="6" 
        />
      </details>
    </div>
  );
};

export default SelectRange;