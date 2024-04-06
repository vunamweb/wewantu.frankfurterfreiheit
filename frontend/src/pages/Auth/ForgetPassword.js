import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

//Import formik validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import actions and helpers
import { forgetPassword, apiError } from '../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';

import Footer from "../../layouts/Footer";
import MainMenu from "../../layouts/MainMenu";

/**
 * Forget Password component
 * @param {*} props 
 */
const ForgetPassword = (props) => {

    const clearError = () => {
        props.apiError("");
    }

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    useEffect(clearError);

    // validation
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            props.forgetPassword(values.email);
        },
    });

    if (localStorage.getItem("authUser")) {
        return <Navigate to="/" />;
    }

    document.title = "Forgot Password | Chatvia React - Responsive Bootstrap 5 Chat App"


    return (
        <React.Fragment>
            <MainMenu />
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <div className="text-center mb-4">
                                

                                <h4>{t('Reset Password')}</h4>
                                <p className="text-muted mb-4">{t('Reset Password.')}</p>

                            </div>

                            <Card>
                                <CardBody className="p-4">
                                    <div className="p-3">
                                        {
                                            props.error && <Alert variant="danger">{props.error}</Alert>
                                        }
                                        {
                                            props.passwordResetStatus ? <Alert variant="success" className="text-center mb-4">{props.passwordResetStatus}</Alert>
                                                : <Alert variant="success" className="text-center mb-4">{t('Enter your Email and instructions will be sent to you')}!</Alert>
                                        }
                                        <Form onSubmit={formik.handleSubmit}>

                                            <FormGroup className="mb-4">
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <Input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter Email"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                        invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </FormGroup>

                                            <div className="d-grid">
                                                <Button color="primary" block className="waves-effect waves-light" type="submit">{t('Reset')}</Button>
                                            </div>

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error, passwordResetStatus } = state.Auth;
    return { user, loading, error, passwordResetStatus };
};

export default connect(mapStateToProps, { forgetPassword, apiError })(ForgetPassword);