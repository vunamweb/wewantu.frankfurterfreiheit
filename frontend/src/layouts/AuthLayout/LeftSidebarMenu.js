import React from 'react';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";

import { setActiveTab } from "../../redux/actions";

//Import Images
import logo from "../../assets/images/logo.svg"


function LeftSidebarMenu(props) {
    
      
      

    


    const toggleTab = tab => {
        props.setActiveTab(tab)
    }

    const activeTab = props.activeTab;
    /* changes language according to clicked language menu item */
    

    return (
        <React.Fragment>
            <div className="side-menu-searchcenter col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-wewantu-searchcenter">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 text-white min-vh-100">
                {/* LOGO */}
                <div className="navbar-brand-box flex-lg-column">
                    <Link to="/" className="logo d-flex align-items-center pb-2 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline" />
                        <div className="row">
                            <div className="col-md logo-searchcenter"><Link href="/"><img src={logo} alt=''/></Link></div>
                            <div className="col-md name-searchcenter">WEWANTU</div>
                        </div>
                        {/* <span className="logo-sm">
                            <img src={logo} alt="logo" height="30" />
                        </span> */}
                    </Link>
                    {/* <span className='name p-3'>WEWANTU</span> */}
                </div>
                {/* end navbar-brand-box  */}

                {/* Start side-menu nav */}
                {/* <div className="flex-lg-column my-auto"> */}
                <div>
                    <Nav id='menu' className="nav-pills-searchcenter nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" role="tablist">
                        <NavItem id="jobs" className="nav-item">
                            <NavLink className={classnames({ active: activeTab === 'jobs' }) + " mb-2"} onClick={() => { toggleTab('jobs'); }}>
                                CURRENT ENQUIRIES
                            </NavLink>
                        </NavItem>
                        <NavItem id="addnewjob">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'addnewjob' }) + " mb-2"} onClick={() => { toggleTab('addnewjob'); }}>
                            ADD NEW JOB
                            </NavLink>
                        </NavItem>
                        
                        <NavItem id="addnewcategory">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'addnewcategory' }) + " mb-2"} onClick={() => { toggleTab('addnewcategory'); }}>
                            ADD NEW CATEGORY
                            </NavLink>
                        </NavItem>
                        <NavItem id="searchcenter">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'searchcenter' }) + " mb-2"} onClick={() => { toggleTab('searchcenter'); }}>
                            SEARCH CENTER
                            </NavLink>
                        </NavItem>
                        <NavItem id="watchlist">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'watchlist' }) + " mb-2"} onClick={() => { toggleTab('watchlist'); }}>
                            WATCHLIST
                            </NavLink>
                        </NavItem>
                        <NavItem id="mess">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'mess' }) + " mb-2"} onClick={() => { toggleTab('mess'); }}>
                            MASSAGE CENTER
                            </NavLink>
                        </NavItem>
                        <NavItem id="credits">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'credits' }) + " mb-2"} onClick={() => { toggleTab('credits'); }}>
                            CREDITS
                            </NavLink>
                        </NavItem>
                        <NavItem id="subcribe">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'subcribe' }) + " mb-2"} onClick={() => { toggleTab('subcribe'); }}>
                            SUBCRIBE
                            </NavLink>
                        </NavItem>
                        <NavItem id="useraccount">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'useraccount' }) + " mb-2"} onClick={() => { toggleTab('useraccount'); }}>
                            USER ACCOUNT
                            </NavLink>
                        </NavItem>
                        <NavItem id="accountsetting">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'accountsetting' }) + " mb-2"} onClick={() => { toggleTab('accountsetting'); }}>
                            ACCOUNT SETTING
                            </NavLink>
                        </NavItem>
                        <NavItem id="useradministration">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'useradministration' }) + " mb-2"} onClick={() => { toggleTab('useradministration'); }}>
                            USER ADMINISTRATION
                            </NavLink>
                        </NavItem>
                        <NavItem id="payments">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'payments' }) + " mb-2"} onClick={() => { toggleTab('payments'); }}>
                            PAYMENTS
                            </NavLink>
                        </NavItem>
                        <NavItem id="wewantu">
                            <NavLink href='/home#main_werist' id="pills-user-tab" className={classnames({ active: activeTab === 'wewantu' }) + " mb-2"} onClick={() => { toggleTab('wewantu'); }}>
                            WHAT’S WEWANTU
                            </NavLink>
                        </NavItem>
                        <NavItem id="investorrelations">
                            <NavLink href='/home#main_werist' id="pills-user-tab" className={classnames({ active: activeTab === 'investorrelations' }) + " mb-2"} onClick={() => { toggleTab('investorrelations'); }}>
                            INVESTOR RELATIONS
                            </NavLink>
                        </NavItem>
                        <NavItem id="theapp">
                            <NavLink href='/home#main_werist' id="pills-user-tab" className={classnames({ active: activeTab === 'theapp' }) + " mb-2"} onClick={() => { toggleTab('theapp'); }}>
                            THE APP
                            </NavLink>
                        </NavItem>
                        <NavItem id="impressum">
                            <NavLink href='/home#main_werist' id="pills-user-tab" className={classnames({ active: activeTab === 'impressum' }) + " mb-2"} onClick={() => { toggleTab('impressum'); }}>
                            IMPRESSUM
                            </NavLink>
                        </NavItem>
                        <NavItem id="datenschutz">
                            <NavLink href='/home#main_werist' id="pills-user-tab" className={classnames({ active: activeTab === 'datenschutz' }) + " mb-2"} onClick={() => { toggleTab('datenschutz'); }}>
                            DATENSCHUTZ
                            </NavLink>
                        </NavItem>
                        <NavItem id="wewantuug">
                            <NavLink id="pills-user-tab" className={classnames({ active: activeTab === 'wewantuug' }) + " mb-2"} onClick={() => { toggleTab('wewantuug'); }}>
                            © WEWANTU UG
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                {/* end side-menu nav */}

                
                {/* Side menu user */}
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
})(LeftSidebarMenu);