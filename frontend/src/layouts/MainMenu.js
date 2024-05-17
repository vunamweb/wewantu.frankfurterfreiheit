import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HashLink } from '@xzar90/react-router-hash-link';

//i18n
import i18n from '../i18n';
import { useTranslation } from "react-i18next";
import { changeLanguage } from '../redux/actions';
import { useDispatch } from 'react-redux';

function MainMenu() {

    const [lng, setlng] = useState("German");
    const { t } = useTranslation();
    const dispatch =  useDispatch();

    const MenuData = [{
        id: 1,
        link: "/home",
        name: t("home").toUpperCase()
    },{
        id: 2,
        link: "/",
        name: t("t_about_wewantu").toUpperCase()
    },{
        id: 3,
        link: "/home#main_werist",
        name: t("t_the_app").toUpperCase()
    },{
        id: 4,
        link: "/home#main_contact",
        name: t("t_investor_relations").toUpperCase()
    },{
        id: 5,
        link: "/login",
        name: t("login").toUpperCase()
    },{
        id: 6,
        link: "/",
        name: t("contact").toUpperCase()
    },
    ]
    const changeLanguageAction = (lng) => {

        /* set the selected language to i18n */
        i18n.changeLanguage(lng);
        dispatch(changeLanguage(lng));
        if (lng === "de")
            setlng("German");
        else if (lng === "en")
            setlng("English");
    }

    return (
        <React.Fragment> 
            <section className="mainmenu-home">
                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-md">
                            <div className="logo"><a href="home"><img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt=''/></a></div>
                            <nav className="navbar navbar-expand-lg navbar-light home-bg-light">
                                <div className="container-fluid">
                                    <Link className="navbar-brand"></Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                          {
                                            MenuData.length && MenuData.map((data)=>
                                               
                                                    <li className="nav-item">
                                                        <HashLink className="nav-link active" smooth to={data.link}>{data.name}</HashLink>
                                                    </li> 
                                               
                                                
                                            ) 
                                          }
                                        </ul>
                                    </div>
                                </div>
                                
                            </nav>
                            <div className="lang">
                                <Link onClick={() => changeLanguageAction('de')} className={(lng === 'German' ? 'active' : null)}>DE</Link>|<Link onClick={() => changeLanguageAction('en')} className={(lng === 'English' ? 'active' : null)}>EN</Link>
                            </div>
                            
                        </div>
                        </div>
                    </div>
            </section>
        </React.Fragment>
    );
}


export default MainMenu;