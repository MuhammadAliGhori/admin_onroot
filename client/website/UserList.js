import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("http://localhost:4000/api/users/getusers")
      .then((response) => response.json())
      .then((data) => setUsers(data.data)) 
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  // Columns definition
  const columns = React.useMemo(
    () => [
    //   { Header: "ID", accessor: "_id" },
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Region", accessor: "region" },
      { Header: "Email", accessor: "email" },
      { Header: "Username", accessor: "username" },
    ],
    []
  );

  // Create an instance of useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users });

  return (
 <div className="d-flex justify-content-center p-5">
       <table {...getTableProps()} style={{ border: "1px solid black" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ border: "1px solid gray" }}
            className="p-2 text-center bg-dark text-light"  >
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
                className="py-1 px-2 text-center">
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
