import React, { useState, useEffect, useCallback } from "react";

const TableContext = React.createContext({
  rawTableData: [],
  paginatedData: [],
  sortedData: [],
  currentPageCount: 0,      
  sortByEqual: () => {},
  sortIsMore: () => {},
  sortIsLess: () => {},
  sortByName: () => {},
  decreasePageCount: () => {},
  encreasePageCount: () => {}, 
  toggleIsSorted: () => {}
});

export const TableContextProvider = props => {
  const [data, setData] = useState([]);
  const [isSorted, setIsSorted] = useState(false)
  const [paginated, setPaginated] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPageCount, setCurrentPageCount] = useState(1);

  const fetchData = useCallback(async() => { 
    try {
      const response = await fetch('/api/get', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Problem with server");
      }      
      const rawData = await response.json();
      setData(rawData);
    } catch(err) {
      console.error(err);
    }      
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const definedPageCount = data.length % 5 === 0 ? data.length / 5 : Math.ceil(data.length / 5);
    setPageCount(definedPageCount);
    let paginatedArr = [];
    for (let i = 0; i <= definedPageCount - 1; i++) {
      let pageArr = data.slice(i * 5, i * 5 + 5);
      if (i === definedPageCount) {
        pageArr = data.slice(i * 5);
      }
      paginatedArr.push(pageArr);      
    }
    setPaginated(paginatedArr);
  }, [data]);
 
  useEffect(() => {
    if (!isSorted) {
      setSortedData(data);
    }
  }, [isSorted, data]);

  const toggleIsSorted = (bool) => {
    setIsSorted(bool);
  };

  const sortByEqual = (arr = data, category, amount) => {
    let sorted = arr.filter(el => +el[category] === +amount);
    setSortedData(sorted);
  }

  const sortIsMore = (arr = data, category, amount) => {
    const sorted = arr.filter(el => +el[category] > +amount);
    setSortedData(sorted);
  }

  const sortIsLess = (arr = data, category, amount) => {
    const sorted = arr.filter(el => +el[category] < +amount);
    setSortedData(sorted);
  }

  const sortByName = (arr = data, word) => {
    const sorted = arr.filter(el => el.name.toLowerCase().includes(word.toLowerCase()));
    setSortedData(sorted);
  }

  const decreasePageCount = () => {
    setCurrentPageCount(prevState => prevState > 1 ? prevState - 1 : 1);
  }

  const encreasePageCount = () => {
    setCurrentPageCount(prevState => prevState === pageCount ? prevState : prevState + 1);
  }

  console.log(isSorted);

  return <TableContext.Provider
    value={{
      rawTableData: data,
      sortedData: sortedData,
      paginatedData: paginated,
      currentPageCount: currentPageCount,      
      sortByEqual: sortByEqual,
      sortIsMore: sortIsMore,
      sortIsLess: sortIsLess,
      sortByName: sortByName,
      decreasePageCount: decreasePageCount,
      encreasePageCount: encreasePageCount,
      toggleIsSorted: toggleIsSorted
    }}
  >
    {props.children}
  </TableContext.Provider>
};

export default TableContext;