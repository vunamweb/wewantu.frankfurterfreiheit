import { useState } from "react";
import tableData1 from "./data.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
 const [tableData] = useState(tableData1);

 const columns = [
  { label: "Full Name", accessor: "full_name" },
  { label: "Email", accessor: "email" },
  { label: "Gender", accessor: "gender" },
  { label: "Age", accessor: "age" },
  { label: "Start date", accessor: "start_date" },
 ];

 return (
  <>
   <table className="table">
    <TableHead columns={columns} />
    <TableBody columns={columns} tableData={tableData} />
   </table>
  </>
 );
};

export default Table;