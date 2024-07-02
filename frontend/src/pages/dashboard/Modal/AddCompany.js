import { connect, useSelector } from 'react-redux';
import { Alert, Form, Input, Button, FormFeedback, InputGroup } from 'reactstrap';
import { registerUser } from '../../../redux/actions';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import * as Yup from 'yup';
import { APIClient } from '../../../helpers/apiClient';
import { createSelector } from 'reselect';
import { getLoggedInUser } from '../../../helpers/authUtils';

function AddCompany(props) {
    const language = useSelector(state => state.Layout.language);
    const [countries, setCountries] = useState([]);
    const admin = getLoggedInUser()[0];

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
            password: '',
            parent_user_id: admin.user_id
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

    const selectAccount = createSelector(
        (state) => state.Auth,
        (account) => ({
            user: account.user,
            success: account.success,
            error: account.error,
            loading: account.loading
        })
    );
    const { user, success, error, loading } = useSelector(selectAccount);

    useEffect(() => {
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
    }, [language]);

    return (
        <>
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
        </>
    );
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, { registerUser })(AddCompany);