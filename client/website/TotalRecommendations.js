import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

export default function TotalRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("http://localhost:4000/api/createrecommendation")
      .then((response) => response.json())
      .then((data) => setRecommendations(data.Recommendations))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Title", accessor: (row) => row.title },
      {
        Header: "Description",
        accessor: (row) => row.description,
      },
      {
        Header: "Region",
        accessor: (row) => row.region,
      },
      {
        Header: "Location",
        accessor: (row) => row.location,
      },
      {
        Header: "Cost",
        accessor: (row) => row.cost,
      },
      {
        Header: "Currency",
        accessor: (row) => row.currency,
      },
    ],
    []
  );

  // ...

  // Create an instance of useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: recommendations });

  return (
    <div className="d-flex justify-content-center flex-column p-5">
      <h1 className="text-center fw-bold mb-3 text-decoration-underline">
        Total Recommendations : {recommendations?.length}
      </h1>
      <table {...getTableProps()} style={{ border: "1px solid black" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ border: "1px solid gray" }}
                  className="p-2 text-center bg-dark text-light"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ border: "1px solid black" }}
                    className="py-1 px-2 text-center"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
