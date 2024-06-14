import React, { useEffect, useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { t } from "i18next";
import { getLoggedInUser } from "../../../helpers/authUtils";
import { APIClient } from "../../../helpers/apiClient";

function PaymentsTable(props) {
    const admin = getLoggedInUser()[0];
    const [tableData,setTableData] = useState([]);
    const columns = [
        { label: t('t_payment_id').toUpperCase(), accessor: "payment_id", sortable: true },
        { label: t('t_time').toUpperCase(), accessor: "created", sortable: true },
        { label: t('t_user_pay').toUpperCase(), accessor: "user_pay", sortable: true },
        { label: t('t_amount').toUpperCase(), accessor: "amount", sortable: false },
        { label: t('t_credit_amount').toUpperCase(), accessor: "credit_amount", sortable: false },
        { label: t('t_package_name').toUpperCase(), accessor: "package_name", sortable: false },
        { label: t('t_status').toUpperCase(), accessor: "status", sortable: false },
    ];
    const handleSorting = () => {

    }

    const handleClickRow = () => {

    }

    //get payment list buy user
    useEffect(()=>{
        new APIClient().get("payments/"+admin.user_id).then((res) => {
            if (res.length>0){
                setTableData([]);
            }
        });
        
    },[admin]);
    
    return (
        <React.Fragment>
            <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>

                <table className="table">
                    <TableHead columns={columns} handleSorting={handleSorting} />
                    <TableBody columns={columns} tableName='PaymentsTable'
                        handleClickRow={handleClickRow}
                        tableData={tableData}
                    />
                </table>
            </div>
        </React.Fragment>
    );
}

export default PaymentsTable;