import React, { useEffect, useState } from 'react';
import { Input, FormFeedback, InputGroup, Form } from 'reactstrap';
import { Button, Modal, Select, Tabs, Upload } from "antd";
import { Link } from "react-router-dom";
import { Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';
import { getAllUser, getLoggedInUser, setLoggedInUser } from '../../../helpers/authUtils';
import { useSelector } from 'react-redux';
import config from '../../../config';
import UserAdministration from './UserAdministration';
import { toast } from 'react-toastify';

const UserAccount = (props) => {

    const admin = getLoggedInUser()[0];

    const { t, i18n } = useTranslation();
    const [imageUrl, setImageUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('tab1');
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState(admin);
    const [isOpenModalVerifyCode, setIsOpenModalVerifyCode] = useState(false);
    const [verifyCode, setVerifyCode] = useState("");
    const [verifyCodeId, setVerifyCodeId] = useState("");

    const users = getAllUser();

    const language = useSelector(state => state.Layout.language);

    const urlApiUpload = config.API_URL + "upload";

    const uploadButton = () => {
        return (
            <div>
                {/* {loading ? <div className='loader' /> : null} */}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
    };

    const handleChangeFile = (e) => {
        console.log(e);
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const currentLang = i18n.language;
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: admin,
        validationSchema: Yup.object({

        }),
        onSubmit: (values) => {
            handleSubmitForm(values);
        },
    });

    const formik1 = useFormik({
        enableReinitialize: true,
        initialValues: {
            user_id: admin.user_id,
            mail: admin.mail,
            password: "",
            mobile_phone_number: admin.mobile_phone_number
        },
        onSubmit: (values) => {
            handleSubmitEmailChange(values);
        },
    });

    const handleSubmitForm = (values) => {
        var dataPut = {
            user_id: values.user_id,
            prename: values.prename,
            lastname: values.lastname,
            // country: values.country
        }

        new APIClient().put("user", dataPut).then((res) => {
            admin.prename = values.prename;
            admin.lastname = values.lastname;

            setLoggedInUser(admin);

            toast.success("Update successfully");
        });

    }

    const handleSubmitEmailChange = (values) => {
        setFormData(values);
        sendVerifyCode();
    }

    const onCancelModalVerifyCode = () => {
        setIsOpenModalVerifyCode(false);
    }

    const onOkModalVerifyCode = () => {
        checkVerifyCode();
    }
    //send verify code
    const sendVerifyCode = () => {
        const dataPost = {
            user_id: admin.user_id,
            action: "change_email_password",
        }
        setIsOpenModalVerifyCode(true);
        new APIClient().create("user_verify_code", dataPost).then(res => {
            if (res.verify_code_id) {
                setVerifyCodeId(res.verify_code_id);
            }
        })
    }

    //check verify code
    const checkVerifyCode = () => {
        const dataPost = {
            user_id: admin.user_id,
            verify_id: verifyCodeId,
            verify_code: verifyCode
        }
        new APIClient().create("user/verifycode", dataPost).then(res => {
            if (res.check) {
                //save data
                new APIClient().put("user", formData).then(res => {
                    //set logged in user
                    admin.mail = formData.mail;
                    admin.mobile_phone_number = formData.mobile_phone_number;
                    setLoggedInUser(admin);

                    //reset form
                    setVerifyCode("");
                    setIsOpenModalVerifyCode(false);

                    //notification
                    toast.success("Update successfully");
                })
            }
        })
    }

    const hanleChangeVerifyCode = (event) => {
        setVerifyCode(event.target.value);
    }

    useEffect(() => {
        setImageUrl(process.env.PUBLIC_URL + "/img/avatar.png");
        new APIClient().get('countries').then(res => {
            if (res.length > 0) {
                let countryList = [];
                res.forEach(country => {
                    if (country.language === language) {
                        countryList.push(country);
                    }
                });
                setCountries(countryList);
            }
        });
    }, [language])


    document.title = "user acount | WEWANTU"

    return (
        <React.Fragment>

            {/* <div className='main_job'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div> */}
            <div className="main_job">
                <div className='row g-3'>

                    <div className="container-fluid px-0">
                        {/* <div className="row"> */}
                        <div className="col-md">
                            <nav className="navbar navbar-expand-sm navbar-light">
                                <div className="container-fluid title-useracc">
                                    <span className="title">USER ACCOUNT</span>
                                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                        <ul className="navbar-nav ms-auto">
                                            <li className="nav-item" >
                                                <Link className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabChange('tab1')} href="#" alt="">ACCOUNT SETTING</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabChange('tab2')} href="#">USER ADMINISTRATION</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabChange('tab3')} href="#">COMPANY V-CARD</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link ${activeTab === 'tab4' ? 'active' : ''}`} onClick={() => handleTabChange('tab4')} href="#">PAYMENTS/INVOICES</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link ${activeTab === 'tab5' ? 'active' : ''}`} onClick={() => handleTabChange('tab5')} href="#">HELP CENTER</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                <div className="container-fluid px-0 main">
                    <div className='tab-content'>
                        <div className={`tab-pane ${activeTab === 'tab1' ? 'active' : ''}`}>
                            <div className='row'>
                                <Formik enableReinitialize={true} initialValues={admin}>
                                    <Form className="col-md-6 account-setting-left" onSubmit={(e) => {
                                        e.preventDefault();
                                        formik.handleSubmit();
                                        // return false;
                                    }}>
                                        <div className="">
                                            <div className="row line1">
                                                <div className='row setting-title'>ACCOUNT DETAILS</div>
                                                <div className="col-md-9">
                                                    <div className="row">
                                                        <div className="col-md">
                                                            {/* <Field type="text" name="prename" className="form-control" required placeholder="FIRST NAME" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /> */}
                                                            <Input
                                                                type="text"
                                                                name="prename"
                                                                className="form-control"
                                                                placeholder={t('t_prename').toUpperCase()}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.prename}
                                                            // invalid={formik.touched.password && formik.errors.password ? true : false}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md">
                                                            <Input
                                                                type="text"
                                                                name="lastname"
                                                                className="form-control"
                                                                required
                                                                placeholder={t('t_lastname').toUpperCase()}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.lastname}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className='col-md'>
                                                            <Input
                                                                type='select'
                                                                className="form-select form-control"
                                                                name='country'
                                                                value={formik.values.country}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            >
                                                                <option selected disabled value="">{t('t_country').toUpperCase()}</option>
                                                                {
                                                                    countries.map((country) => <option value={country.country_code}>{country.country}</option>)
                                                                }
                                                            </Input>
                                                        </div>
                                                    </div>
                                                    <div className="row g-3">
                                                        <div className="col-md">
                                                            <button type="submit" className="btn btn-primary form-control btn-sm">{t('save').toUpperCase()}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <span>PROFILE PICTURE</span>
                                                    <Upload
                                                        name="avatar"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        // action={urlApiUpload} // Thay đổi đường dẫn API upload hình của bạn
                                                        onChange={handleChangeFile}
                                                    >
                                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                                    </Upload>
                                                    <br />
                                                </div>

                                            </div>
                                            <div className="row line1">
                                                <div className='row setting-title'>E-MAIL SETTINGS</div> <br />
                                                <div className='row'>Specify which emails you would like to receive from us.</div>
                                                {/* <button className="btn btn-primary form-control " id="managesetting" >MANAGE SETTINGS</button> */}
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                                <Formik enableReinitialize={true} initialValues={formik1.initialValues} >
                                    <Form className="col-md-6 account-setting-right" onSubmit={(e) => {
                                        e.preventDefault();
                                        console.log(e);
                                        formik1.handleSubmit();
                                    }} >
                                        <div className="">
                                            <div className='row line1'>
                                                <div className='row setting-title'>REGISTRATION INFORMATION</div>
                                                <div className="col-md-12">

                                                    <div className="row">
                                                        <div className="col-md">
                                                            <Input
                                                                type="text"
                                                                name="mail"
                                                                className="form-control"
                                                                required placeholder={t('t_mail').toUpperCase()}
                                                                onChange={formik1.handleChange}
                                                                onBlur={formik1.handleBlur}
                                                                value={formik1.values.mail}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md">
                                                            {/* <Field type="text" name="password" className="form-control" required placeholder="PASSWORD" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /> */}
                                                            <Input
                                                                type="password"
                                                                name="password"
                                                                className="form-control"
                                                                placeholder={t('t_password').toUpperCase()}
                                                                onChange={formik1.handleChange}
                                                                onBlur={formik1.handleBlur}
                                                                value={formik1.values.password}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md">
                                                            <Input
                                                                type="text"
                                                                name="mobile_phone_number"
                                                                className="form-control"
                                                                required placeholder={t('t_phone').toUpperCase()}
                                                                onChange={formik1.handleChange}
                                                                onBlur={formik1.handleBlur}
                                                                value={formik1.values.mobile_phone_number}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md">
                                                        <button type="submit" className="btn btn-primary form-control btn-sm">{t('save').toUpperCase()}</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row line1'>
                                                <div className='row setting-title'>PRIVACY SETTINGS</div>
                                                <div className='row'>Manage your cookie and privacy settings. Learn more</div>
                                                {/* <button className="btn btn-primary form-control" id="managesetting" type="submit">MANAGE SETTINGS</button> */}
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                        <div className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`}>
                            <UserAdministration users = {users} />
                        </div>
                        <div className={`tab-pane ${activeTab === 'tab3' ? 'active' : ''}`}>COMPANY V-CARD</div>
                        <div className={`tab-pane ${activeTab === 'tab4' ? 'active' : ''}`}>PAYMENTS/INVOICES</div>
                        <div className={`tab-pane ${activeTab === 'tab5' ? 'active' : ''}`}>HELP CENTER</div>
                    </div>
                </div>
            </div>
            <Modal onCancel={onCancelModalVerifyCode} onOk={onOkModalVerifyCode} title="Confirm" open={isOpenModalVerifyCode}>
                <p>We have sent a confirmation code to your registration email, please check your email and re-enter here</p>
                <Input type='text' className='form-control' name='verify_code' value={verifyCode} required onChange={hanleChangeVerifyCode}>

                </Input>
            </Modal>
        </React.Fragment>
    );
}



export default UserAccount;