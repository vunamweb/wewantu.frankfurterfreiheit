import React, { useEffect, useState } from 'react';
import { Input, FormFeedback, InputGroup } from 'reactstrap';
import { Button, Select } from "antd";
import { Link, UNSAFE_LocationContext } from "react-router-dom";
import { Field, FieldArray, Formik, useFormik, Form } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';
import { getAllUser, getLoggedInUser } from '../../../helpers/authUtils';
import { toast } from 'react-toastify';

const UserAdministration = (props) => {

    const [loadlang, setloadlang] = useState(true);
    const [professions, setprofessions] = useState([]);
    const [jobs, setjobs] = useState([]);
    const [lang, setlang] = useState([]);
    const { t, i18n } = useTranslation();
    const [rowStatus, setRowStatus] = useState({});
    const [userData, setUserData] = useState([]);

    const admin = getLoggedInUser()[0];

    const users = props.users;



    useEffect(() => {

        if (users && users.length > 0) {
            let usersMap = [...users];
            usersMap.map((user) => {
                // let rowStatusUpd = { ...rowStatus };
                // rowStatusUpd[user.user_id] = true;
                // setRowStatus(rowStatusUpd);
                user.isReadonly = true;
            });
            setUserData(usersMap);
        }
    }, [users]);

    const handleEditUser = (index,edit) => {
        let usersUpd = [...userData];
        
        usersUpd[index].isReadonly = (edit?false:true);
        setUserData(usersUpd);
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
                        <div className='row setting-title'>USER ADMINISTRATION</div>

                        {userData.map((user, index) => (
                            <div key={user.user_id}>
                                <Formik
                                    initialValues={user}
                                    onSubmit={(values) => {
                                        handleUpdateUser(values, index);
                                    }}
                                >
                                    <Form>
                                        <div className='row'>
                                            <div className="col-md-6 useradmin-left">

                                                <div className="row line1">
                                                    <div className="col-md-2">
                                                        <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} className="avatar" alt="avatar" /> <br />
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
                                                            required
                                                            placeholder={t("t_password").toUpperCase()}
                                                            name="password"
                                                            disabled={user.isReadonly}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 useradmin-right">
                                                <div className='row line1'>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="form-check">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    name="admin"
                                                                    disabled={user.isReadonly}
                                                                />
                                                                <label className="form-check-label" for="weekend_work">ADMIN</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    name="buy_credit"
                                                                    disabled={user.isReadonly}
                                                                />
                                                                <label className="form-check-label" for="night_shift">
                                                                    BUY CREDITS
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
                                                                    name="add_job"
                                                                    disabled={user.isReadonly}
                                                                />
                                                                <label className="form-check-label" for="night_shift">
                                                                    CREATE JOB/PROJECT
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <Field
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    name="use_lead"
                                                                    disabled={user.isReadonly}
                                                                />
                                                                <label className="form-check-label" for="weekend_work">USE LEAD</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-1 useradmin-right'>
                                                {(user.isReadonly) && <Link href="#" onClick={() => { handleEditUser(index,true); }}><img src={`${process.env.PUBLIC_URL}/img/edit.svg`} alt="EDIT" /></Link>}
                                                {(!user.isReadonly) && <button type='submit' className='btn btn-primary btn-sm form-control'>{t("t_save").toUpperCase()}</button>}
                                                {(!user.isReadonly) && <button type='button' onClick={()=> {handleEditUser(index,false)}} className='btn btn-danger btn-sm form-control'>{t("t_cancel").toUpperCase()}</button>}
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </React.Fragment>
    );
}



export default UserAdministration;