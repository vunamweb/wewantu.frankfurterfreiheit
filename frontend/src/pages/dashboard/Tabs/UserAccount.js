import React, { useEffect,useState } from 'react';
import {  Input, FormFeedback, InputGroup,Form } from 'reactstrap';
import { Select } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';

const UserAccount = (props) => {

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
            jobdecription: Yup.string().required('Enter proper jobdecription'),
            jobid: Yup.string().required('Enter proper jobid'),
            plz: Yup.string().required('Enter proper plz'),
        }),
        onSubmit: values => {
            console.log(values);
         //  await new ApiLevel().post()
        },
    });

    

        document.title = "user acount | WEWANTU"
       
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
                        
                        <span>COMPANY V-CARD</span>
                        <div className="row">
                        <div className="col-md-4 content">
                            <div className="col-md-1"></div>
                            <div className="col-md-11">
                                
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 content">
                            <div className="col-md-12">
                                
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3 content">
                            <div className='logo'>
                                <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} className="avatar" alt="avatar" /> <br />
                                <span>LOGO</span>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <textarea className="form-control" id="company" rows="10" ></textarea>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                    </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }



export default UserAccount;