import React, { createContext, useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import AddJob from '../Tabs/AddJob';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { APIClient } from '../../../helpers/apiClient';
import { getLoggedInUser, getProfessions, saveListApplicant } from '../../../helpers/authUtils';
import { useTranslation } from 'react-i18next';
import { setSearchFilterData } from '../../../redux/search/actions';
import { useDispatch } from 'react-redux';
import { setListUserProfile } from '../../../redux/actions';
import config from "../../../../src/config";
function JobsTable(props) {
    const admin = getLoggedInUser()[0];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpenadd, setIsModalOpenadd] = useState(false);
    const [job_search_profile_id, setjob_search_profile_id] = useState('');
    const [curindex, setcurindex] = useState('');
    const [loadlang, setloadlang] = useState(true);
    const { t } = useTranslation();
    const [tableData, settableData] = useState([]);
    const [categoryID, setCategoryID] = useState('all');
    const professions = getProfessions();

    const dispatch = useDispatch();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const DataContext = createContext();

    const handleCanceladd = () => {
        setIsModalOpenadd(false);
    };

    const toggleTab = (tab, data) => {

        dispatch(setSearchFilterData(data));
        props.setActiveTab(tab);
        //props.setSearch(search);
    }

    const handleClickRow = (data) => {
        dispatch(setSearchFilterData(data));
        props.setActiveTab("searchcenter");
    }

    useEffect(() => {
        if (loadlang) {
            const admin = getLoggedInUser()[0];
            /*new APIClient().get('list_job_search_profiles').then(res => {
                const dataBody=res && res.filter(val => val !==null && val.user.user_id !== admin.user_id && val.is_delete !==1).map(info=>{
                    
                   return {
                            job_search_profile_id:info.job_search_profile_id,
                            job_id:info.job_id !== null ? info.job_id : '',
                            job_decription:info.job_decription,
                            profession:info.profession.profession,
                            requested:info.requested,
                            messages:info.messages,
                            created_at:info.created_at
                        }
                    
                }).sort((a, b) => {
                    return (
                     a['created_at'].toString().localeCompare(b['created_at'].toString(), "en", {
                      numeric: true,
                     }) * (-1)
                    );
                   });
                   settableDataAllSearch(dataBody);
               // console.log(dataBody)
        })*/
            new APIClient().get('user/' + admin.user_id + '/job_search_profiles').then(res => {
                const dataBody = res && res.filter(val => val.is_delete !== 1).map(info => {
                    return {
                        job_search_profile_id: info.job_search_profile_id,
                        job_id: info.job_id,
                        job_decription: info.job_decription,
                        profession: info.profession.profession,
                        profession_id: info.profession.profession_id,
                        requested: info.requested,
                        messages: info.messages,
                        created_at: info.created_at
                    }
                }).sort((a, b) => {
                    return (
                        a['created_at'].toString().localeCompare(b['created_at'].toString(), "en", {
                            numeric: true,
                        }) * (-1)
                    );
                });
                settableData(dataBody);
                //handleSorting('job_decription','desc')

            })
            setloadlang(false)
        }

    }, [loadlang]);
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            settableData(sorted);
        }
    };
    const tableRowRemove = (index, job_search_profile_id) => {

        const dataRow = [...tableData];
        //alert('Remove '+dataRow[index].job_id);
        let datapost = {
            'job_search_profile_id': job_search_profile_id,
            'is_delete': 1,
        }
        new APIClient().delete('job_search_profile/' + job_search_profile_id + '', datapost).then(val => {
            dataRow.splice(index, 1);
            settableData(dataRow);
        })
    };

    const tableRowArchive = (index, job_search_profile_id) => {

        const dataRow = [...tableData];
        //alert('Remove '+dataRow[index].job_id);
        let datapost = {
            'job_search_profile_id': job_search_profile_id,
            'is_delete': 1,
        }
        new APIClient().put('job_search_profile', datapost).then(val => {
            dataRow.splice(index, 1);
            settableData(dataRow);
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
        dataRow[curindex] = row;
        settableData(dataRow);
    };

    const getfilterTableData = () => {
        let result = [];

        tableData.map((item, index) => {
            if (item.profession_id == categoryID || categoryID == 'all')
                result.push(item);
        })

        return result;
    }

    const AddRow = (row) => {
        localStorage.setItem('search_job_profile', JSON.stringify(row));
        /* console.log(row);
         const dataRow = [...tableData];
         dataRow.push(row)
         settableData(dataRow);*/
        const admin = getLoggedInUser()[0];
        new APIClient().get('user/' + admin.user_id + '/job_search_profiles').then(res => {
            const dataBody = res && res.map(info => {
                return {
                    job_search_profile_id: info.job_search_profile_id,
                    job_id: info.job_id,
                    job_decription: info.job_decription,
                    profession: info.profession.profession,
                    requested: info.requested,
                    messages: info.messages,
                    created_at: info.created_at
                }
            }).sort((a, b) => {
                return (
                    a['created_at'].toString().localeCompare(b['created_at'].toString(), "en", {
                        numeric: true,
                    }) * (-1)
                );
            });
            // get list applicant
            let data = {};
            data.user_id = admin.user_id;

            const urlListApplicant = config.API_URL + "list_applicant";

            setIsLoading(true);

            new APIClient().create(urlListApplicant, data).then(async list_applicant => {
                if (list_applicant) {
                    try {
                        await saveListApplicant(JSON.stringify(list_applicant));
                    } catch (error) {
                        console.log(error);
                        //list_applicant = [];
                    }

                    let companylist = await new APIClient().get('companylist');
                    let addresslist = await new APIClient().get('addresslist');

                    setIsLoading(false);

                    renData(addresslist, list_applicant, companylist);

                    settableData(dataBody);
                    setIsModalOpenadd(false);
                    toggleTab('searchcenter', row);
                }
            })

            // end
        })
        //window.location.reload();
    };

    const renData = (addresslist, searchJob, companylist) => {

        let newsearchJob = [...searchJob]

        newsearchJob.map((serJob, index) => {
            let addr = {};
            let company = {};
            addr = addresslist !== null && addresslist.filter(item => item.address_id !== null && item.address_id.includes(serJob.user.address_id));
            if (addr.length > 0)
                newsearchJob[index].address = addr;
            //let addr = addresslist !==null && addresslist.filter(item => item.address_id === );  
            company = companylist !== null && companylist.filter(item => item.company_id !== null && item.company_id.includes(serJob.user.company_id))
            if (company.length > 0)
                newsearchJob[index].company = company;
        });

        dispatch(setListUserProfile(newsearchJob));
    }

    const columns = [
        { label: t('t_job_id').toUpperCase(), accessor: "job_id", sortable: true },
        { label: t('t_job_description').toUpperCase(), accessor: "job_decription", sortable: true },
        { label: t('t_category').toUpperCase(), accessor: "profession", sortable: false },
        { label: t('t_requested').toUpperCase(), accessor: "requested", sortable: false },
        { label: t('t_messages').toUpperCase(), accessor: "messages", sortable: false },
    ];

    !loadlang && (<div className="loader"></div>)

    let filterTableData = getfilterTableData();
    //if(props.activeTab === 'jobs'){
    return (
        <React.Fragment>
            <div className="addjob">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-md">
                            <button className="text_addjobs" onClick={() => { setIsModalOpenadd(true) }} disabled={(admin.add_job || admin.userType == 0) ? false : true}>
                                <img src={`${process.env.PUBLIC_URL}/img/plus.svg`} alt='' /><span className='text'>{t('t_add_new_job').toUpperCase()}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_job">
                <div className='row title g-3'>
                    <span className="col-md-8">{t('t_current_enquiries').toUpperCase()}</span>
                    <Select
                        showSearch
                        id="category"
                        name="category"
                        className="form-control searchcenterselect title col-md"
                        placeholder={t('t_category').toUpperCase()}
                        onChange={setCategoryID}
                    >
                        <Select.Option value="all">All</Select.Option>
                        {professions !== null && professions.map((item) => (
                            <Select.Option value={item.profession_id}>{item.profession}</Select.Option>
                        ))}

                    </Select>
                </div>
                <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>

                    <table className="table">
                        <TableHead setCategoryID={setCategoryID} columns={columns} handleSorting={handleSorting} />
                        <TableBody columns={columns} tableName='JobsTable' handleClickRow={handleClickRow} tableRowEdit={tableRowEdit} tableRowRemove={tableRowRemove} tableRowArchive={tableRowArchive} tableData={filterTableData} tableDataadd={filterTableData} />
                    </table>

                    <Modal open={isModalOpen} onCancel={handleCancel} width={1000} footer=" ">
                        <AddJob isLoading={isLoading} action="edit" job_search_profile_id={job_search_profile_id} setIsModalOpen={setIsModalOpen} updateRowEdit={updateRowEdit} AddRow={AddRow} />
                    </Modal>
                    <Modal open={isModalOpenadd} onCancel={handleCanceladd} width={1000} footer=" ">
                        <AddJob isLoading={isLoading} setIsModalOpen={setIsModalOpen} updateRowEdit={updateRowEdit} AddRow={AddRow} />
                    </Modal>
                </div>
            </div>
        </React.Fragment>

    )
    /*}
    else{
     return (
         <Modal open={isModalOpenadd} onCancel={handleCancel} width={1000} footer=" ">
                         <AddJob setIsModalOpen={setIsModalOpen} updateRowEdit={updateRowEdit} addRow={AddRow}/>
         </Modal>
     )
     
    }*/

}

export default JobsTable;
