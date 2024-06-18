import React, { useEffect, useState } from 'react';
import { Input, FormFeedback, InputGroup, Form } from 'reactstrap';
import { Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';
import CreditsDisplay from '../Tables/CreditsTable';
import { setActiveTab } from "../../../redux/actions";
import { connect } from "react-redux";
import CreditPayment from '../Component/CreditPayment';
const Credits = (props) => {

    const [loadlang, setloadlang] = useState(true);
    const [professions, setprofessions] = useState([]);
    const [jobs, setjobs] = useState([]);
    const [lang, setlang] = useState([]);
    const { t, i18n } = useTranslation();
    const [isOpenCreditPayment, setIsCreditPayment] = useState(false);
    const [selectedCreditPackage, setSelectedCreditPackage] = useState(null);


    const currentLang = i18n.language;
    const toggleTab = tab => {
        props.setActiveTab(tab)
    }
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            jobdecription: '',
            jobid: '',
            plz: ''
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

    const handlePayment = (info) => {
        setSelectedCreditPackage(info);
        setIsCreditPayment(true);
    }

    document.title = "credits | WEWANTU"

    return (
        <React.Fragment>

            <div className="main_job">
                <div className='row g-3'>

                    <div className="container-fluid px-0">
                        {/* <div className="row"> */}
                        <div className="col-md">
                            <nav className="navbar navbar-expand-sm navbar-light">
                                <div className="container-fluid title-useracc">
                                    <span className="title">{t("t_credits").toUpperCase()}</span>
                                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                        <ul className="navbar-nav ms-auto">
                                            <li className="nav-item">
                                                <Link className="nav-link" href="#" alt="">{t("t_buy_credits").toUpperCase()}</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" href="#">{t("t_statistics").toUpperCase()}</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" href="#">{t("t_help_center").toUpperCase()}</Link>
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
                                <button className="btn btn-primary form-control" id="addcredit-grey" type="submit" onClick={() => { toggleTab('subcribe') }}>{t('t_subscribe').toUpperCase()}</button>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary form-control" id="addcredit" type="submit">{t('t_credits').toUpperCase()}</button>
                            </div>

                            <div className="col-md-8"></div>
                        </div>

                    </div>
                    <div className='row'>
                        <div className="col-md-1"></div>
                        <CreditsDisplay onBuy={handlePayment} />
                        {/* <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{position:'relative',height:'600px'}}>
                                    
                                </div> */}
                        <div className="col-md-1"></div>
                    </div>

                </div>
            </div>

           { isOpenCreditPayment &&  <CreditPayment creditPackage={selectedCreditPackage} isOpen={isOpenCreditPayment} onCloseModal={()=>{setIsCreditPayment(false)}}></CreditPayment> }

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
})(Credits);