import React, { useEffect, useState } from "react";
import "./TableBody.css";
import PaginationComponent from "../Paginatation/PaginationComponent";
import BatchData from "../BatchData/BatchData";

const TableBody = ({ batchData, data, filterByName, setBatchData }) => {
  data = data.slice(1);
  //console.log(data)
  const dataObjects = [];
  data.map((list) => {
    var obj = {
      name: list[1],
      batch: list[2],
      stock: list[3],
      deal: list[4],
      free: list[5],
      mrp: list[6],
      rate: list[7],
      exp: list[8],
    };
    dataObjects.push(obj);
    return null;
  });
  //console.log(dataObjects);

  const names = [];
  const groupByName = dataObjects.reduce((group, product) => {
    const { name } = product;
    group[name] = group[name] ?? [];
    group[name].push(product);
    if (!names.includes(name)) {
      names.push(name);
    }
    return group;
  }, {});
  // console.log(groupByName);
  // console.log(names);

  const filterData = (data) => {
    return data.toLowerCase()?.includes(filterByName.toLowerCase());
  };

  const [activePage, setActivePage] = useState(1);
  const indexOfLastRecord = activePage * 20;
  const indexOfFirstRecord = indexOfLastRecord - 20;
  console.log(indexOfFirstRecord, indexOfLastRecord);

  const [totalItemsCount, setTotalItemsCount] = useState(names.length);
  const filteredData = names.filter(filterData);
  useEffect(() => {
    setTotalItemsCount(filteredData.length);

    console.log("totalItemsCount", totalItemsCount);
  }, [totalItemsCount, filteredData]);

  const [batchValues, setBatchValues] = useState([]);

  const batchChangeHandler = (e) => {
    getBatchData(e.target.value);
    setBatchData(true);
  };
  const getBatchData = (selectChangeValue) => {
    Object.keys(groupByName).forEach(async function (key, index) {
      await groupByName[key].map((value) => {
        if (value.batch.toString() === selectChangeValue) {
          setBatchValues([]);
          setBatchValues((batchValues) => [...batchValues, value]);
        }

        return null;
      });
    });
  };
  console.log(batchValues);

  return (
    <>
      {totalItemsCount > 0 ? (
        <tbody id="table-body">
          {!batchData &&
            names
              .filter(filterData)
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((name, index) => {
                //console.log(groupByName[name]);
                const batch = [];
                const stock = [];
                const deal = [];
                const free = [];
                const mrp = [];
                const exp = [];
                const rate = [];
                groupByName[name].map((dataobj) => {
                  batch.push(dataobj.batch);
                  stock.push(dataobj.stock);
                  deal.push(dataobj.deal);
                  free.push(dataobj.free);
                  mrp.push(dataobj.mrp);
                  exp.push(dataobj.exp.toLocaleDateString());
                  rate.push(dataobj.rate);
                  return null;
                });

                var stock_sum = stock.reduce(function (x, y) {
                  return x + y;
                }, 0);

                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      {batch.length > 1 ? (
                        <select onChange={batchChangeHandler} id="batch">
                          <option value="All">All</option>
                          {batch.map((value, index) => {
                            return (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        batch[0]
                      )}
                    </td>

                    <td>{stock_sum}</td>
                    <td>{Math.min.apply(Math, deal)}</td>
                    <td>{Math.min.apply(Math, free)}</td>
                    <td>{Math.max.apply(Math, mrp)}</td>
                    <td>{Math.max.apply(Math, rate)}</td>
                    <td>{exp[0]}</td>
                  </tr>
                );
              })}
          {batchData && <BatchData batchValues={batchValues} />}
        </tbody>
      ) : (
        <div className="no-results">
          no results found with "
          <div className="no-results-text">{filterByName}</div>"
        </div>
      )}

      {totalItemsCount > 0 && !batchData ? (
        <PaginationComponent
          activePage={activePage}
          setActivePage={setActivePage}
          totalItemsCount={totalItemsCount}
        />
      ) : null}
    </>
  );
};

export default TableBody;
