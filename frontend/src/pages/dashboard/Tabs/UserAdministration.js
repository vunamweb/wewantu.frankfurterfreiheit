import React, { useEffect,useState } from 'react';
import {  Input, FormFeedback, InputGroup,Form } from 'reactstrap';
import { Select } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';

const UserAdministration = (props) => {

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

    

        document.title = "user administration | WEWANTU"
       
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
                        <div className="row useradmin">
                        <div className='row setting-title'>USER ADMINISTRATION</div>
                        <div className="col-md-6 useradmin-left">
                            <div className="row line1">
                                <div className="col-md-2">
                                    <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} className="avatar" alt="avatar" /> <br />
                                </div>
                                <div className="col-md-5"><input type="text" id="company" name="company" className="form-control" required placeholder="BRUCE WAYNE" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                <div className="col-md-5">
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="BRUCE.WAYNE@WAYNE…." oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /> <br />
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="*******" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                                </div>
                            </div>
                            <div className="row line1">
                                <div className="col-md-2">
                                    <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} className="avatar" alt="avatar" /> <br />
                                </div>
                                <div className="col-md-5"><input type="text" id="company" name="company" className="form-control" required placeholder="LUCIUS FOX" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                <div className="col-md-5">
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="LUCIUS.FOX@WAYNE…." oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /> <br />
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="*******" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                                </div>
                            </div>
                            <div className="row line1">
                                <div className="col-md-2">
                                    <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} className="avatar" alt="avatar" /> <br />
                                </div>
                                <div className="col-md-5"><input type="text" id="company" name="company" className="form-control" required placeholder="ALFRED PENNYWORTH" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                <div className="col-md-5">
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="ALFRED@WAYNE…." oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /> <br />
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="*******" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                                </div>
                            </div>
                            <div className="row line1">
                                <div className="col-md-2">
                                    <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} className="avatar" alt="avatar" /> <br />
                                </div>
                                <div className="col-md-5"><input type="text" id="company" name="company" className="form-control" required placeholder="USERNAME" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                                <div className="col-md-5">
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="USER E-MAIL" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /> <br />
                                    <input type="text" id="company" name="company" className="form-control" required placeholder="*******" oninvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 useradmin-right">
                            <div className='row line1'>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">ADMIN</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">INVITE USER</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            BUY CREDITS
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">SET USER AUTHORISATIONS</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            CREATE JOB/PROJECT
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">USE LEAD</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row line1'>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">ADMIN</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">INVITE USER</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            BUY CREDITS
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">SET USER AUTHORISATIONS</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            CREATE JOB/PROJECT
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">USE LEAD</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row line1'>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">ADMIN</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">INVITE USER</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            BUY CREDITS
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">SET USER AUTHORISATIONS</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            CREATE JOB/PROJECT
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">USE LEAD</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row line1'>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">ADMIN</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">INVITE USER</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            BUY CREDITS
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">SET USER AUTHORISATIONS</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="night_shift" required />
                                            <label className="form-check-label" for="night_shift">
                                            CREATE JOB/PROJECT
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="weekend_work" required />
                                            <label className="form-check-label" for="weekend_work">USE LEAD</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-1"></div>
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
                        </div> */}
                        </div>
                    </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }



export default UserAdministration;