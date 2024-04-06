import { Link } from 'react-router-dom'
import {  Popconfirm } from 'antd';

const TableBody = ({ tableName,tableData, columns,tableRowEdit ,tableRowRemove }) => {
    return (
     <tbody>
      {tableData.map((data,index) => {
        if(tableName === 'CategoryTable') {
            return (
                <tr key={data.profession_id}>
                 {columns.map(({ accessor }) => {
                  const tData = data[accessor] ? data[accessor] : "0";
                  return <td key={accessor}>{tData}</td>;
                 })}
                    
                    <td>
                        <Popconfirm
                            title="Delete Category"
                            description={"Are you sure to delete this Category ID "+ data.profession}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => tableRowRemove(index,data.profession_id)}
                        >
                            <Link><img src={`${process.env.PUBLIC_URL}/img/del.svg`} alt="DELETE" /></Link>
                        </Popconfirm>
                    </td>
                </tr>

               );
        }
        if(tableName === 'JobsTable') {
            return (
                <tr key={data.job_search_profile_id}>
                 {columns.map(({ accessor }) => {
                  const tData = data[accessor] ? data[accessor] : "0";
                  return <td key={accessor}>{tData}</td>;
                 })}
                
                    <td>
                        <Link href="#" onClick={()=>tableRowEdit(index)}><img src={`${process.env.PUBLIC_URL}/img/edit.svg`} alt="EDIT" /></Link>
                        <Link className='m-1'><img src={`${process.env.PUBLIC_URL}/img/print.svg`} alt="PRINT" /></Link>
                        
                        <Popconfirm
                            title="Delete Job ID"
                            description={"Are you sure to delete this Job ID "+ data.job_id}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => tableRowRemove(index,data.job_search_profile_id)}
                        >
                            <Link><img src={`${process.env.PUBLIC_URL}/img/del.svg`} alt="DELETE" /></Link>
                        </Popconfirm>
                    </td>
                </tr>
               );
        }

       return (
        <tr key={data.job_search_profile_id}>
         {columns.map(({ accessor }) => {
          const tData = data[accessor] ? data[accessor] : "0";
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      
      
      
      
      })}
     </tbody>
    );
   };
   
   export default TableBody;