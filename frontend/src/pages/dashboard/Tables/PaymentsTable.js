import React, { useEffect, useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { t } from "i18next";
import { getLoggedInUser } from "../../../helpers/authUtils";
import { APIClient } from "../../../helpers/apiClient";
import { useSelector } from "react-redux";

function PaymentsTable(props) {
    const admin = getLoggedInUser()[0];
    const userSettingActiveTab = useSelector(state => state.Layout.userSettingActiveTab);

    const [tableData,setTableData] = useState([]);
    const columns = [
        { label: t('t_payment_id').toUpperCase(), accessor: "payment_id", sortable: true },
        { label: t('t_time').toUpperCase(), accessor: "created", sortable: true },
        { label: t('t_user_pay').toUpperCase(), accessor: "user_id", sortable: true },
        { label: t('t_prices').toUpperCase(), accessor: "price", sortable: false },
        { label: t('t_credits').toUpperCase(), accessor: "credit", sortable: false },
        { label: t('t_package_name').toUpperCase(), accessor: "package", sortable: false },
        // { label: t('t_status').toUpperCase(), accessor: "status", sortable: false },
    ];
    const handleSorting = () => {

    }

    const handleClickRow = () => {

    }

    //get payment list buy user
    useEffect(()=>{
        if (userSettingActiveTab == "tab4"){
            let url = "paymentlist/"+admin.user_id;
            if (admin.userType == "0"){
                url = "paymentlist"
            }
            new APIClient().get(url).then((res) => {
                if (res.length>0){
                    setTableData(res);
                }
                else{
                    setTableData([res]);
                }
            });
        } 
    },[userSettingActiveTab]);
    
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