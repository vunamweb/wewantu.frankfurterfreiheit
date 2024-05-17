import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import withRouter from "../../components/withRouter";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Form, Input, Button, FormFeedback, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError, redirectToLogin, registerValidate } from '../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';

import { createSelector } from 'reselect';

import Footer from "../../layouts/Footer";
import MainMenu from "../../layouts/MainMenu";
import { APIClient } from '../../helpers/apiClient';
/**
 * Register component
 * @param {*} props 
 */
const Register = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadlang, setloadlang] = useState(true);
    const [countries, setCountries] = useState([]);
    const language = useSelector(state => state.Layout.language);
    

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    // validation
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            company: '',
            street: '',
            no: '',
            zip: '',
            city: '',
            country: '',
            salutation: '',
            titel: '',
            prename: '',
            lastname: '',
            username: '',
            mobile_phone_number: '',
            mail: '',
            password: ''
        },
        validationSchema: Yup.object({
            company: Yup.string().required('Enter proper company'),
            street: Yup.string().required('Enter proper street'),
            no: Yup.string().required('Enter proper no'),
            zip: Yup.string().required('Enter proper zip'),
            city: Yup.string().required('Enter proper city'),
            country: Yup.string().required('Enter proper country'),
            salutation: Yup.string().required('Enter proper salutation'),
            prename: Yup.string().required('Enter proper prename'),
            lastname: Yup.string().required('Enter proper lastname'),
            mobile_phone_number: Yup.string().required('Enter proper Phone'),
            mail: Yup.string().email('Enter proper mail').required('Enter proper mail'),
            password: Yup.string().required('Enter proper password')
        }),
        onSubmit: values => {
            // props.registerValidate(values);
            props.registerUser(values);
        },
    });

    const formContact = useFormik({
        enableReinitialize: true,

        initialValues: {
            company: '',
            name: '',
            phone: '',
            mail: '',
            messages:''
        },
        validationSchema: Yup.object({
            company: Yup.string().required('Enter proper company'),
            name: Yup.string().required('Enter proper name'),
            phone: Yup.string().required('Enter proper phone'),
            mail: Yup.string().required('Enter proper mail'),
            messages: Yup.string().required("Enter proper messages")
        }),
        onSubmit: (values,{ resetForm }) => { 
            resetForm();
        },
        
    });


    const selectAccount = createSelector(
        (state) => state.Auth,
        (account) => ({
            user: account.user,
            success: account.success,
            error: account.error,
            loading: account.loading
        })
    );

    const { user, success,error,loading } = useSelector(selectAccount);

    useEffect(() => {
        if (success) {
            props.redirectToLogin();
            setTimeout(() => navigate("/login"), 3000);
        }
    }, [dispatch, success, error, user, navigate]);

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);


    useEffect(() => {
        // if (loadlang) {
            new APIClient().get('countries').then(res => {
                if (res.length>0) {
                    let countryList = [];
                    res.forEach(country => {
                        if (country.language === language){
                            countryList.push(country);
                        }
                    });
                    setCountries(countryList);
                }

            });
            setloadlang(false);
        // }
    }, [loadlang,language]);

    document.title = "Register | WEWANTU"
    return (

        <React.Fragment>
            {loading && <div className="loader"></div> }
            <MainMenu />
            <section className="register">
                <div className="container-fluid px-0 main">
                    <Form
                        className="row g-0"
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            // return false;
                        }}
                    >

                        <div className="col-md-1"></div>
                        <div className="col-md-5 content">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className="title_v2">{t("t_REGISTER_NOW_AND_GET_STARTED")}</div>
                                    <p>{t("t_register_description")}</p>
                                    <div className="row">
                                        <div className="col-md">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    className="form-control"
                                                    placeholder={t('t_company').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.company}
                                                    invalid={formik.touched.company && formik.errors.company ? true : false}
                                                />
                                                {formik.touched.company && formik.errors.company ? (
                                                    <FormFeedback type="invalid">{formik.errors.company}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="street"
                                                    name="street"
                                                    className="form-control"
                                                    placeholder={t('t_street').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.street}
                                                    invalid={formik.touched.street && formik.errors.street ? true : false}
                                                />
                                                {formik.touched.street && formik.errors.street ? (
                                                    <FormFeedback type="invalid">{formik.errors.street}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                        <div className="col-md">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="no"
                                                    name="no"
                                                    className="form-control"
                                                    placeholder={t('t_no').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.no}
                                                    invalid={formik.touched.no && formik.errors.no ? true : false}
                                                />
                                                {formik.touched.no && formik.errors.no ? (
                                                    <FormFeedback type="invalid">{formik.errors.no}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="zip"
                                                    name="zip"
                                                    className="form-control"
                                                    placeholder={t('t_zip').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.zip}
                                                    invalid={formik.touched.zip && formik.errors.zip ? true : false}
                                                />
                                                {formik.touched.zip && formik.errors.zip ? (
                                                    <FormFeedback type="invalid">{formik.errors.zip}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-9">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder={t('t_city').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.city}
                                                    invalid={formik.touched.city && formik.errors.city ? true : false}
                                                />
                                                {formik.touched.city && formik.errors.city ? (
                                                    <FormFeedback type="invalid">{formik.errors.city}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="select"
                                                    id="country"
                                                    name="country"
                                                    className="form-control"
                                                    placeholder={t('t_country').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.country}
                                                    invalid={formik.touched.country && formik.errors.country ? true : false}
                                                >
                                                    <option selected disabled value="">{t('t_country').toUpperCase()}*</option>
                                                    {
                                                    countries.length && countries.map((item) =>
                                                        <option value={item.country_code}>{item.country}</option>
                                                    )}

                                                </Input>
                                                {formik.touched.country && formik.errors.country ? (
                                                    <FormFeedback type="invalid">{formik.errors.country}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                        <div className="col-md-5 center-block text-center content">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md">
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <video controls>
                                                    <source src="#" type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="select"
                                                    id="salutation"
                                                    name="salutation"
                                                    className="form-control"
                                                    placeholder={t('t_salutation').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.salutation}
                                                    invalid={formik.touched.salutation && formik.errors.salutation ? true : false}
                                                >
                                                    <option selected disabled value="">{t('t_salutation').toUpperCase()}*</option>
                                                    <option value="1">{t("mr")}</option>
                                                    <option value="2">{t("mrs")}</option>
                                                    <option value="3">{t("t_gender")}</option>
                                                </Input>
                                                {formik.touched.salutation && formik.errors.salutation ? (
                                                    <FormFeedback type="invalid">{formik.errors.salutation}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="titel"
                                                    name="titel"
                                                    className="form-control"
                                                    placeholder={t('t_titel').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.titel}
                                                >
                                                </Input>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="prename"
                                                    name="prename"
                                                    className="form-control"
                                                    placeholder={t('t_prename').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.prename}
                                                    invalid={formik.touched.prename && formik.errors.prename ? true : false}
                                                />
                                                {formik.touched.prename && formik.errors.prename ? (
                                                    <FormFeedback type="invalid">{formik.errors.prename}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="lastname"
                                                    name="lastname"
                                                    className="form-control"
                                                    placeholder={t('t_lastname').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.lastname}
                                                    invalid={formik.touched.lastname && formik.errors.lastname ? true : false}
                                                />
                                                {formik.touched.lastname && formik.errors.lastname ? (
                                                    <FormFeedback type="invalid">{formik.errors.lastname}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md">
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <Input
                                                    type="text"
                                                    id="mail"
                                                    name="mail"
                                                    className="form-control"
                                                    placeholder={t('t_mail').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.mail}
                                                    invalid={formik.touched.mail && formik.errors.mail ? true : false}
                                                />
                                                {formik.touched.mail && formik.errors.mail ? (
                                                    <FormFeedback type="invalid">{formik.errors.mail}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md">

                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <Input
                                                    type="text"
                                                    id="mobile_phone_number"
                                                    name="mobile_phone_number"
                                                    className="form-control"
                                                    placeholder={t('t_phone').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.mobile_phone_number}
                                                    invalid={formik.touched.mobile_phone_number && formik.errors.mobile_phone_number ? true : false}
                                                />
                                                {formik.touched.mobile_phone_number && formik.errors.mobile_phone_number ? (
                                                    <FormFeedback type="invalid">{formik.errors.mobile_phone_number}</FormFeedback>
                                                ) : null}

                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md">
                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder={t('t_password').toUpperCase()}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                    invalid={formik.touched.password && formik.errors.password ? true : false}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                ) : null}

                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 login">
                                        <Button color="primary" block className=" waves-effect waves-light" type="submit">{t('t_register').toUpperCase()}
                                        </Button>
                                        <div className="col-md">

                                            {success ? (
                                                <Alert color="success">
                                                    {t("t_register_successfully")}
                                                </Alert>
                                            ) : null}

                                            {error && error ? (
                                                <Alert color="danger">
                                                    <div>{error}</div>
                                                </Alert>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </div>
                        <div className="col-md"></div>


                    </Form>

                </div>

            </section>
            <section className="youneed">
                <div className="container-fluid px-0 line">
                    <div className="row g-0">
                        <div className="col" style={{ background: '#898166' }}><div className="title" style={{ color: '#898166' }}>z</div></div>
                    </div>
                </div>

                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-md-3 werist-l"></div>
                        <div className="col-md-7 werist  center-block text-center"><div className="title">{t("t_you_need_help").toUpperCase()}</div></div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>

            </section>
            <section className="getinfo">
                <div className="container-fluid px-0 main">
                    <Form className="row g-0" onSubmit={(e) => {
                            e.preventDefault();
                            formContact.handleSubmit();
                            // return false;
                        }} id="getinfo-from">
                        <div className="col-md-1"></div>
                        <div className="col-md-5 content">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className="title_v3">{t("t_GET_IN_TOUCH_WITH_US")}:</div>
                                    <div className="row">
                                        <div className="col-md"><input type="text" id="company" name="company" value={formContact.company} className="form-control" required placeholder={t("t_name_company").toUpperCase()} onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md"><input type="text" id="name" name="name" value={formContact.name} className="form-control" required placeholder={t("t_name").toUpperCase()} onInvalid="this.setCustomValidity('Please enter NAME')" oninput="setCustomValidity('')" /></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md"><input type="email" id="email" name="email" value={formContact.mail} className="form-control" required placeholder={t("t_mail").toUpperCase()}onInvalid="this.setCustomValidity('Please enter E-MAIL')" oninput="setCustomValidity('')" /></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md"><input type="tel" id="phone" name="phone" value={formContact.phone} className="form-control" required  placeholder={t("t_phone").toUpperCase()} onInvalid="this.setCustomValidity('Please enter TELEPHONE')" oninput="setCustomValidity('')" /></div>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button id="getinfo" className="btn btn-primary form-control" type="submit">{t("t_send").toUpperCase()}</button>
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>


                        </div>
                        <div className="col-md-5 center-block text-center content">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">

                                    {/* <div className="title_v3">{t("t_messages")}</div> */}
                                    <div className="row">
                                        <div className="col-md">
                                            <div className="md-form" >
                                                <textarea type="text" id="messages" name="messages" rows="9" value={formContact.messages} className="form-control md-textarea" placeholder={t("t_messages")}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>


                        </div>
                        <div className="col-md"></div>
                    </Form>
                </div>
            </section>
            <Footer />
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    // console.log(state.Auth);
    const { language } = state.Layout;
    const { user, loading,success, error } = state.Auth;
    return { user, loading,success, error, language };
};

export default withRouter(connect(mapStateToProps, { registerUser, registerValidate, apiError })(Register));