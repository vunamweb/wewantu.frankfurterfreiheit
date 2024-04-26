import React, { useEffect,useState } from 'react';
import {  Input, FormFeedback, InputGroup,Form } from 'reactstrap';
import { Select } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';
import SubcribeDisplay from '../Tables/SubscribeTable';
import { setActiveTab } from "../../../redux/actions";
import { connect} from "react-redux";

const Subcribe = (props) => {

    const [loadlang, setloadlang] = useState(true);
    const [professions, setprofessions] = useState([]);
    const [jobs, setjobs] = useState([]);
    const [lang, setlang] = useState([]);
    const { t, i18n } = useTranslation();

    
    const currentLang =  i18n.language;
    const toggleTab = tab => {
        props.setActiveTab(tab)
    }
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

    

        document.title = "subcribe | WEWANTU"
       
        return (
            <React.Fragment>
                
                <div className="main_job">
                    <div className='row g-3'>
                        
                        <div className="container-fluid px-0">
                        {/* <div className="row"> */}
                            <div className="col-md">
                                <nav className="navbar navbar-expand-sm navbar-light">
                                <div className="container-fluid title-useracc">
                                    <span className="title">CREDITS</span>
                                  <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#" alt="">BUY CREDITS</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">STATISTIK</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">HELP-CENTER</Link>
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
                        <div className="credits-desc">
                            <span className="title">Wählen Sie Ihre perfekte Option!</span>
                            <p>Entscheiden Sie sich für bequeme Abonnements oder flexible Credit-Pakete.<br />
                            Jetzt Abonnieren oder Credits sichern und alle Funktionen nutzen.
                            </p>
                            <div className="row">
                                
                                <div className="col-md-2">
                                    <button className="btn btn-primary form-control" id="addcredit" type="submit">{t('t_subscribe').toUpperCase()}</button>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-primary form-control" id="addcredit-grey" type="submit" onClick={()=>{toggleTab('credits')}}>{t('t_credits').toUpperCase()}</button>
                                </div>
                                
                                <div className="col-md-8"></div>
                            </div>
                            
                        </div>
                        <div className='row'>
                            
                            <SubcribeDisplay />
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }


    const mapStatetoProps = state => {
        return {
            ...state.Layout
        };
    };
    
    export default connect(mapStatetoProps, {
        setActiveTab
    })(Subcribe);