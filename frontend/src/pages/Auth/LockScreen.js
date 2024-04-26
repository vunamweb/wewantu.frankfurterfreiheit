import React from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Form, Input, Button, FormFeedback, InputGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//i18n
import { useTranslation } from 'react-i18next';

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import avatar1 from "../../assets/images/users/avatar-1.jpg";

function LockScreen(props) {

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    // validation
    const formik = useFormik({
        initialValues: {
            password: 'test'
        },
        validationSchema: Yup.object({
            password: Yup.string().required(t('t_please_enter_your_password'))
        }),
        onSubmit: values => {
            console.log(values)
        },
    });

    document.title = "Lockscreen | Chatvia React - Responsive Bootstrap 5 Chat App"


    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <div className="text-center mb-4">
                            <Link to="/" className="auth-logo mb-5 d-block">
                                <img src={logodark} alt="" height="30" className="logo logo-dark"/>
                                <img src={logolight} alt="" height="30" className="logo logo-light" />
                            </Link>

                            <h4>{t('t_lock_screen')}</h4> Lock screen
                            <p className="text-muted mb-4">{t('t_enter_your_password_to_unlock_thescreen!')}</p>
                            
                        </div>

                        <Card>
                            <CardBody className="p-4">
                                <div className="p-3">
                                    <div className="user-thumb text-center mb-4">
                                        <img src={avatar1} className="rounded-circle img-thumbnail avatar-lg" alt="thumbnail" />
                                        <h5 className="font-size-15 mt-3">{t('t_patricia_smith')}</h5>
                                    </div>
                                    <Form onSubmit={formik.handleSubmit}>

                                        <FormGroup className="mb-4">
                                            <Label className="form-label">{t('t_password')}</Label>
                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                    <span className="input-group-text border-light text-muted">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control form-control-lg bg-soft-light"
                                                    placeholder="Enter Password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                    invalid={formik.touched.password && formik.errors.password ? true : false}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                ) : null}
                                                
                                            </InputGroup>
                                        </FormGroup>

                                        <div className="d-grid">
                                            <Button color="primary" block className=" waves-effect waves-light" type="submit">Unlock</Button>
                                        </div>

                                    </Form>
                                </div>
                            </CardBody>
                        </Card>

                        <div className="mt-5 text-center">
                            <p>{t('t_not_you')} ? {t('t_return')} <Link to="login" className="font-weight-medium text-primary"> {t('t_signin')} </Link> </p>
                            <p>© {new Date().getFullYear()} {t('t_chatvia')}. {t('t_crafted_with')} <i className="mdi mdi-heart text-danger"></i> {t('t_by_themesbrand')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </React.Fragment>
    );
}

export default LockScreen;