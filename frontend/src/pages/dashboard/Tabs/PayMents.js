import React, { useEffect,useState } from 'react';
import {  Input, FormFeedback, InputGroup,Form } from 'reactstrap';
import { Select } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';

const PayMents = (props) => {

    const [loadlang, setloadlang] = useState(true);
    const [professions, setprofessions] = useState([]);
    const [jobs, setjobs] = useState([]);
    const [lang, setlang] = useState([]);
    const { t, i18n } = useTranslation();

    
    const currentLang =  i18n.language;
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            jobdecription:'',
            jobid:'',
            plz:''
        },
        validationSchema: Yup.object({
            jobdecription: Yup.string().required(t('t_enter_proper_jobdecription')),
            jobid: Yup.string().required(t('t_enter_proper_jobid')),
            plz: Yup.string().required(t('t_enter_proper_plz')),
        }),
        onSubmit: values => {
            console.log(values);
         //  await new ApiLevel().post()
        },
    });

    

        document.title = "payments | WEWANTU"
       
        return (
            <React.Fragment>
                
                
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
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#" alt="">ACCOUNT SETTING</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">USER ADMINISTRATION</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">COMPANY V-CARD</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">PAYMENTS/INVOICES</Link>
                                        </li>		
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">HELP CENTER</Link>
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
                    <Form
                        
                        id="add_job"
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            // return false;
                            
                        }}
                    >
                        <div className="row payments">
                        <div className='row payments-title'>BILLING ADDRESS</div>
                        <div className="col-md-4">
                            <div className="row line1">
                                <input type="text" id="company" name="company" className="form-control" required placeholder="WAYNE ENTERPRISES" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                            </div>
                            <div className="row line1">
                                <input type="text" id="company" name="company" className="form-control" required placeholder="BRUCE WAYNE" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row line1">
                                <input type="text" id="company" name="company" className="form-control" required placeholder="WAYNE MANOR" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                            </div>
                            <div className="row line1">
                                <input type="text" id="company" name="company" className="form-control" required placeholder="SOMERSET / 10001 GOTHAM" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row line1">
                                <input type="text" id="company" name="company" className="form-control" required placeholder="ACCOUNTING DEPARTMENT" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                            </div>
                            <div className="row line1">
                                <input type="text" id="company" name="company" className="form-control" required placeholder="INVOICES@WAYNE.COM" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                            </div>
                        </div>
                        </div>
                    </Form>
                    <div className="row invoice">
                        <div className='row payments-title'>INVOICE HISTORY</div>
                            <span>Here you will find all invoices and refunds for your Premium subscriptions and paid services.</span>
                        <div className='row details'>    
                            <div className="col-md-2">
                                5. Juli 2023 <br />
                                1064053599
                            </div>
                            <div className="col-md-2">
                                Premiumpaket <br />
                                Business Unilimited
                            </div>
                            <div className="col-md-2">
                                classic
                            </div>
                            <div className="col-md-2">
                                i@frank
                            </div>
                            <div className="col-md-2">
                                Bezahlt
                            </div>
                            <div className="col-md-2">
                                108,46$
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }



export default PayMents;