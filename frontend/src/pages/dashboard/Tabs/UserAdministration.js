import React, { useEffect, useState } from 'react';
import { Input, FormFeedback, InputGroup } from 'reactstrap';
import { Button, Modal, Pagination, Select } from "antd";
import { Link, UNSAFE_LocationContext } from "react-router-dom";
import { Field, FieldArray, Formik, useFormik, Form } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';
import { getAllUser, getLoggedInUser, setAllUser } from '../../../helpers/authUtils';
import { toast } from 'react-toastify';
import CompanyVCard from '../Component/CompanyVCard';
import config from '../../../config';
import AddCompany from '../Modal/AddCompany';
import { useSelector } from 'react-redux';

const UserAdministration = (props) => {

    const [loadlang, setloadlang] = useState(true);
    const [professions, setprofessions] = useState([]);
    const [jobs, setjobs] = useState([]);
    const [lang, setlang] = useState([]);
    const { t, i18n } = useTranslation();
    const [rowStatus, setRowStatus] = useState({});
    const [userData, setUserData] = useState([]);
    const [isOpenVCard, setIsOpenVCard] = useState(false);
    const [isOpenAddCompany, setIsOpenAddCompany] = useState(false);
    const [userForEdit, setUserForEdit] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const userSettingActiveTab = useSelector(state => state.Layout.userSettingActiveTab);

    const admin = getLoggedInUser()[0];

    // const users = props.users;

    useEffect(() => {
        if (userSettingActiveTab == "tab2") {
            let data = {page: currentPage};
            new APIClient().create("alluser", data).then(res => {
                if (res && res.data.length > 0) {
                    let users = res.data;
                    setTotalItems(res.total);
                    if (users && users.length > 0) {
                        let usersMap = [...users];
                        // usersMap = usersMap.filter(user => user.firebase_token == null);
                        usersMap.map((user) => {
                            user.buy_credit = (user.buy_credit ? true : false);
                            user.add_job = (user.add_job ? true : false);
                            user.use_lead = (user.use_lead ? true : false);
                            user.password = "";
                            user.isReadonly = true;
                            if (user.profilePicture) {
                                user.profilePicture = config.API_BASE_URL + "/" + user.profilePicture;
                            }
                            else {
                                user.profilePicture = process.env.PUBLIC_URL + "/img/avatar.png";
                            }
                        });
                        setUserData(usersMap);
                    }
                }
            })

        }

    }, [userSettingActiveTab,currentPage]);

    const handleEditUser = (index, edit) => {
        let usersUpd = [...userData];

        usersUpd[index].isReadonly = (edit ? false : true);
        setUserData(usersUpd);
    }

    const handleOpenCompanyVCard = (index, edit) => {
        setUserForEdit(userData[index]);
        setIsOpenVCard(true);
    }


    const handleUpdateUser = (values, index) => {
        const dataPut = {
            user_id: values.user_id,
            // admin: values.admin,
            buy_credit: values.buy_credit,
            add_job: values.add_job,
            use_lead: values.use_lead
        }
        new APIClient().put("user", dataPut).then((res) => {
            toast.success("Update successfully");
        })

        let usersUpd = [...userData];
        usersUpd[index].isReadonly = true;
        setUserData(usersUpd);

        //update localstore
        // let usersStoreUpd = [...users];
        // usersStoreUpd.map((user) => {
        //     if (user.user_id == values.user_id) {
        //         user.buy_credit = values.buy_credit;
        //         user.add_job = values.add_job;
        //         user.use_lead = values.use_lead;
        //     }
        // });
        // setAllUser(usersStoreUpd);
    }

    const handleAddCompany = () => {
        setIsOpenAddCompany(true);
    }

    const currentLang = i18n.language;

    if (!userData.length || !userData) {
        return null;
    }


    document.title = "user administration | WEWANTU"

    return (
        <React.Fragment>
            <div className="main_job">
                <div className="container-fluid px-0 main">
                    <div className="row useradmin">
                        <div className='row setting-title'>
                           <span className='col-md-10'> {t("t_user_administration").toUpperCase()}</span>
                            <div className='col-md'><button className='btn btn-sm btn-primary' onClick={handleAddCompany}>{t("t_add_account").toUpperCase()}</button></div>
                        </div>

                        {userData.map((user, index) => (
                            <div >
                                <Formik
                                    key={user.user_id}
                                    initialValues={user}
                                    onSubmit={(values) => {
                                        handleUpdateUser(values, index);
                                    }}
                                >
                                    <Form id={user.user_id}>
                                        <div className='row'>
                                            <div className="col-md-6 useradmin-left">

                                                <div className="row line1">
                                                    <div className="col-md-2">
                                                        <img src={user.profilePicture} className="avatar" alt="avatar" /> <br />
                                                    </div>
                                                    <div className="col-md-5">
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            placeholder={t("t_prename").toUpperCase()}
                                                            name="prename"
                                                            disabled={user.isReadonly}
                                                        />
                                                    </div>
                                                    <div className="col-md-5">
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            placeholder={t("t_mail").toUpperCase()}
                                                            name="mail"
                                                            disabled={user.isReadonly}
                                                        />
                                                        <Field
                                                            type="password"
                                                            className="form-control"
                                                            placeholder={t("t_password").toUpperCase()}
                                                            name="password"
                                                            disabled={user.isReadonly}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 useradmin-right">
                                                <div className='row line1'>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="form-check">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    name="buy_credit"
                                                                    disabled={user.isReadonly}
                                                                />
                                                                <label className="form-check-label" for="night_shift">
                                                                    {t("t_buy_credits")}
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    name="add_job"
                                                                    disabled={user.isReadonly}
                                                                />
                                                                <label className="form-check-label" for="night_shift">
                                                                    {t("t_add_new_job").toUpperCase()}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">

                                                            <div className="form-check">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    name="use_lead"
                                                                    disabled={user.isReadonly}
                                                                />
                                                                <label className="form-check-label" for="weekend_work">{t("t_user_lead").toUpperCase()}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-2 useradmin-right'>
                                                {(user.isReadonly) && <><button type='button' className='btn btn-sm btn-primary' onClick={() => { handleEditUser(index, true); }}><img src={`${process.env.PUBLIC_URL}/img/edit.svg`} alt="EDIT" /></button></>}
                                                {(user.userType == 1) && <button type='button' className='btn-primary btn-sm btn ml-5' onClick={() => { handleOpenCompanyVCard(index, true); }}>Edit V-Card</button>}
                                                {(!user.isReadonly) && <button type='submit' className='btn btn-primary btn-sm form-control'>{t("t_save").toUpperCase()}</button>}
                                                {(!user.isReadonly) && <button type='button' onClick={() => { handleEditUser(index, false) }} className='btn btn-danger btn-sm form-control'>{t("t_cancel").toUpperCase()}</button>}
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        ))}
                        <Pagination 
                            current={currentPage}
                            total={totalItems}
                            pageSize={20}
                            onChange={(page) => { setCurrentPage(page);}}
                        />
                    </div>
                </div>
                <Modal open={isOpenVCard} width={1000} onOk={() => { setIsOpenVCard(false) }} onCancel={() => setIsOpenVCard(false)}>
                    {(userForEdit != null) && <CompanyVCard user={userForEdit} />}
                </Modal>
                <Modal open={isOpenAddCompany} width={1000} okButtonProps={{ style: { display: 'none' } }} onCancel={() => { setIsOpenAddCompany(false) }}>
                    <AddCompany onRegisterSuccess={() => {setIsOpenAddCompany(false)}} />
                </Modal>
            </div>
        </React.Fragment>
    );
}



export default UserAdministration;