import React, { useState } from 'react';
import { Nav, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { connect} from "react-redux";

import { setActiveTab } from "../../redux/actions";

import { useTranslation } from "react-i18next";

//i18n
import i18n from '../../i18n';

// falgs
import { getLoggedInUser } from '../../helpers/authUtils';

function TopSidebarMenu(props) {
   
      
    //console.log(props);
   
    const [lng, setlng] = useState("German");
    const [userName, setuserName] = useState({});
    //const [name, setname] = useState("Admin");
    const { t } = useTranslation();
    const admin=getLoggedInUser()[0];
   

    /* changes language according to clicked language menu item */
    const changeLanguageAction = (lng) => {

        /* set the selected language to i18n */
        i18n.changeLanguage(lng);

        if (lng === "gr")
            setlng("German");
        else if (lng === "eng")
            setlng("English");
    }

    return (
        <React.Fragment>
            <div className="menuSearchCenter">
            <div className="d-flex justify-content-between navbar navbar-expand-sm navbar-light breakline">
                <div className="container-fluid ">
                <div className='p-3 morning'><span className="navbar-brand hello">GOOD MORNING {admin.prename} {admin.lastname}</span></div>
                <div className='d-flex'>
                    <Nav className='navbar navbar-expand topbar'>
                    
                    <li className="nav-item">
                        <NavLink>
                            {t("contact").toUpperCase()}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink href="/logout">
                        {t("logout").toUpperCase()}
                        </NavLink>
                    </li>
                    
                </Nav>
                <div className="lang p-3">
                    <Link onClick={() => changeLanguageAction('de')} className={(lng === 'German' ? 'active' : null)}>DE</Link>|<Link onClick={() => changeLanguageAction('en')} className={(lng === 'English' ? 'active' : null)}>EN</Link>
                </div>
                </div>
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
})(TopSidebarMenu);