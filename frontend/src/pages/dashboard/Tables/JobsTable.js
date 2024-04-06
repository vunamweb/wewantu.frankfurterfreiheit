import React from 'react';
import {  Modal } from 'antd';
import AddJob from '../Tabs/AddJob';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useState } from "react";
import { APIClient } from '../../../helpers/apiClient';


 function JobsTable(props){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [job_search_profile_id, setjob_search_profile_id] = useState('');
    const [curindex, setcurindex] = useState('');    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [tableData, setTableData] = useState(props.jobData);
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) * (sortOrder === "asc" ? 1 : -1)
          );
         });
         setTableData(sorted);
        }
       };
    const tableRowRemove = (index,job_search_profile_id) => {
        
        const dataRow = [...tableData];
        //alert('Remove '+dataRow[index].job_id);
        new APIClient().delete('job_search_profile/'+job_search_profile_id).then(val=>{
            //console.log(val);
            dataRow.splice(index, 1);
            setTableData(dataRow);
        })
      };
    const tableRowEdit = (index) => {
        
        const dataRow = [...tableData];
        setcurindex(index);
        setjob_search_profile_id(dataRow[index].job_search_profile_id)
        setIsModalOpen(true);
      };
    const updateRowEdit = (row) => {
        
        const dataRow = [...tableData];
        dataRow[curindex]=row;
        setTableData(dataRow);
      };
      
    const AddRow = (row) => {
        
        const dataRow = [...tableData];
        console.log(row)
        //dataRow.push(row);
        //console.log(dataRow)
        //setTableData(dataRow);
      };
    const columns = [
        { label: "JOB ID", accessor: "job_id", sortable: true },
        { label: "JOB DESCRIPTION", accessor: "job_decription", sortable: true },
        { label: "CATEGORY", accessor: "category", sortable: false },
        { label: "REQUESTED", accessor: "requested", sortable: false },
        { label: "MESSAGES", accessor: "messages", sortable: false },
       ];
       
       
       /** 
       const DisplayData=props.jobData.length && props.jobData.map(
        (info)=>{
            return(                
                <tr>
                    <td>{info.job_id}</td>
                    <td>{info.job_decription}</td>
                    <td>{info.profession.profession}</td>
                    <td>{info.requested ? info.requested : 0}</td>
                    {info.messages > 0 ? <td style={{color:"red"}}>{info.messages}</td> : <td>0</td>}
                    <td>
                        <Link href="#"><img src={`${process.env.PUBLIC_URL}/img/edit.svg`} alt="EDIT" /></Link>
                        <Link href="#"><img src={`${process.env.PUBLIC_URL}/img/print.svg`} alt="PRINT" /></Link>
                        <Link href="#"><img src={`${process.env.PUBLIC_URL}/img/del.svg`} alt="DELETE" /></Link>
                    </td>
                </tr>                
            )
        }
    )
*/
    
 
    return(
        <React.Fragment>
            <table className="table">
                <TableHead columns={columns} handleSorting={handleSorting}/>
                <TableBody columns={columns} tableName='JobsTable' tableRowEdit={tableRowEdit} tableRowRemove={tableRowRemove} tableData={tableData} />
            </table>

            <Modal open={isModalOpen} onCancel={handleCancel} width={1000} footer=" ">
                <AddJob action="edit" job_search_profile_id={job_search_profile_id} setIsModalOpen={setIsModalOpen} AddRow={AddRow} updateRowEdit={updateRowEdit}/>
            </Modal>





            {/**<table className="table">
                <thead>
                    <tr>
                        <td className="table-light">JOB ID</td>
                        <td className="table-light">JOB DESCRIPTION</td>
                        <td className="table-light">CATEGORY</td>
                        <td className="table-light">REQUESTED</td>
                        <td className="table-light">MESSAGES</td>
                        <td className="table-light">EDIT</td>
                    </tr>
                </thead>
                <tbody>
                   {DisplayData}
                </tbody>
            </table> */}
            
        </React.Fragment>
        
    )
 }
 
 export default JobsTable;