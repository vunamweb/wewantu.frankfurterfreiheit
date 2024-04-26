import React, { useCallback, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, InputGroup } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import withRouter from "../../components/withRouter";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Footer from "../../layouts/Footer";
import MainMenu from "../../layouts/MainMenu";

//i18n
import { useTranslation } from 'react-i18next';

//redux store
import { loginUser, apiError } from '../../redux/actions';


/**
 * Login component
 * @param {*} props 
 */
const Login = (props) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(true);
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const clearError = useCallback(() => {
       dispatch(apiError(""));
    },[dispatch])

    useEffect(() => {
        clearError();
    }, [clearError])

    // validation
    const formik = useFormik({
        initialValues: {
            email: 'admin@wewantu.com',
            password: '12345'
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('t_please_enter_your_username')),
            password: Yup.string().required(t('t_please_enter_your_password'))
        }),
        onSubmit: values => {
            props.loginUser(values.email, values.password, props.router.navigate);
        },
    });
    
    if (localStorage.getItem("authUser")) {
        return <Navigate to="/" />;
    }

    document.title = "Login | WEWANTU"

    return (
        <React.Fragment>

            <MainMenu />
            <section className="login_banner">
                <div className="container-fluid px-0 line">
                    <div className="row g-0">
                        <div className="col-md title center-block text-center">{t("t_wewantu").toUpperCase()}</div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md description">
                            <p>{t("t_the_description_for").toUpperCase()}</p>
                            <p>{t("t_for_the_description").toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md text">
                            <p>Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan</p>
                            <p>hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die</p>                        
                            <p>Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="login">
                <div className="container-fluid px-0 line">
                <div className="row g-0">
                    <div className="col-md-4 werist-l"></div>
                    <div className="col-md-4 werist center-block text-center"><div className="title">REGISTER</div></div>
                    <div className="col-md werist-r"></div>
                </div>
                </div>
                <div className="container-fluid px-0 line">
                    <div className="row g-0">
                        <div className="col-md-1 werist-l"></div>
                        <div className="col-md-5 werist center-block text-center"><div className="title">{t("t_to_the_login").toUpperCase()}</div></div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>
                
                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-md-2 werist-l"></div>
                        <div className="col-md-8 werist  center-block text-center"><div className="title">{t("t_to_the_wewantu_app").toUpperCase()}</div></div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            

                            <Card>
                                <CardBody className="p-4">
                                    {
                                        props.error && <Alert color="danger">{props.error}</Alert>
                                    }
                                    <div className="text-center mb-4">                                
                                        <p className='title_v3'><Link to="/register">{t('t_register_now')}</Link></p>
                                    </div>
                                    <div className="p-3">

                                        <Form onSubmit={formik.handleSubmit}>

                                            <div className="mb-3">
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <Input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                        invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                            <FormGroup className="mb-4">
                                                
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
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
                                                <Button color="primary" block className=" waves-effect waves-light" type="submit">{t("t_login").toUpperCase()}</Button>
                                            </div>

                                            <div className="text-center mt-5">
                                                    <Link to="/forget-password" className="text-muted font-size-13">{t('t_passwort_vergessen')}</Link>
                                            </div>

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="login_werist">
                <div className="container-fluid">
                    <div className="row g-0">
                        <div className="col-md-1"></div>
                        <div className="col-md-5 content">
                            <div className="title_v2">{t('download_now_and_get_started').toUpperCase()}</div>
                            <p>Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses
                    getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war,
                    als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus
                    unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren
                    Ungeziefer verwandelt. Und es war ihnen wie eine Bestätigung ihrer neuen
                    Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich
                    erhob und ihren jungen Körper dehnte.</p>
                            <div className="row g-0">
                                <div className="col-md-6">
                                    <img src={`${process.env.PUBLIC_URL}/img/login_appstore.svg`} height="60px"/>
                                    <br />
                                    <img src={`${process.env.PUBLIC_URL}/img/qr_store.svg`} height="50px"/>
                                </div>
                                <div className="col-md-6">
                                    <img src={`${process.env.PUBLIC_URL}/img/login_chplay.svg`} height="60px"/> 
                                    <br />
                                    <img src={`${process.env.PUBLIC_URL}/img/qr_chplay.svg`} height="50px"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 liner">
                            <div className="row g-0">
                                <div className="col carousel">
                                    <input type="radio" name="position"  />
                                    <input type="radio" name="position"  />
                                    <input type="radio" name="position" defaultChecked={checked} onChange={() => setChecked((state) => !state)} />
                                    <input type="radio" name="position" />
                                    <input type="radio" name="position"  />
                                    <main id="carousel">
                                        <div className="item" id="item1"><img src={`${process.env.PUBLIC_URL}/img/die_app_l.svg`} /></div>
                                        <div className="item" id="item2"><img src={`${process.env.PUBLIC_URL}/img/die_app_l.svg`} /></div>
                                        <div className="item" id="item3"><img src={`${process.env.PUBLIC_URL}/img/die_app_1.svg`} /></div>
                                        <div className="item" id="item4"><img src={`${process.env.PUBLIC_URL}/img/die_app_r.svg`} /></div>
                                        <div className="item" id="item5"><img src={`${process.env.PUBLIC_URL}/img/die_app_r.svg`} /></div>
                                    </main>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </section>
            <Footer />
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { loginUser, apiError })(Login));