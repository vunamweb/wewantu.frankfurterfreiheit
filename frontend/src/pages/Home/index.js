import React from 'react';

import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";
import MainMenu from "../../layouts/MainMenu";

import { useTranslation } from "react-i18next";

function Index(props) {
    const [checked, ] = React.useState(true);
    const { t } = useTranslation();
    // validation
    
    document.title = "Home | WEWANTU"
    return (
        <React.Fragment>
            <MainMenu data="" />
            <section className='banner'>
                <div className='carousel-inner'>
                    <div className="carousel-item active">
                        <img src={`${process.env.PUBLIC_URL}/img/banner.svg`} alt="banner" className="d-block" width="100%"/>
                        <div className="carousel-caption d-flex justify-content-center">
                            <div className="align-items-center justify-content-center">
                                <video src={`${process.env.PUBLIC_URL}/img/Wewantu_Animation.mp4`} width="55%" autoPlay={true} loop={true} muted playsInline={true} style={{opacity:'0.5'}} />
                            </div>
                        </div>
                        <div className="main_wewantu">
                            <div className="container-fluid px-0 wewantu">
                                <div className="row g-0">
                                    <div className="col-md-2 werist-l"></div>
                                    <div className="col-md-5 werist  center-block text-center">
                                        <div className="title_home">{t("wewantu").toUpperCase()}</div>
                                    </div>
                                    <div className="col-md werist-r"></div>                         
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="main_werist" id="main_werist">
                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-md-1 werist-l"></div>
                        <div className="col-md-6 werist  center-block text-center">
                            <div className="title_home">{t("t_who_ is_this").toUpperCase()}</div>
                        </div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>
                {/* <div className="container-fluid">
                    <div className="row g-0" style={{marginTop:'100px'}}>
                        <div className="col-md-1"></div>
                        <div className="col-md-5 line">
                        {
                            Headline.map((data)=>{
                                
                                    
                                    <><div className="title_v2_home">{data.title}</div>
                                    <p className="content">{data.text}</p>
                                    <div className="row g-0">
                                        <div className="col-md center-block text-center">
                                            <img src={data.img} alt=''/>
                                        </div>
                                    </div></>
                                
                            })
                        }
                        </div>
                        
                        <div className="col-md-5 liner">
                            
                            

                            
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div> */}
                <div className="container-fluid">
                    <div className="row g-0" style={{marginTop:'100px'}}>
                        <div className="col-md-1"></div>
                        <div className="col-md-5 line">
                        <div className="title_v2_home">DER HEALDINE</div>
                            <p className="content">Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses
                            getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war,
                            als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus
                            unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren
                            Ungeziefer verwandelt. Und es war ihnen wie eine Bestätigung ihrer neuen
                            Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich
                            erhob und ihren jungen Körper dehnte.</p>
                            <div className="row g-0">
                                <div className="col-md center-block text-center">
                                    <img src={`${process.env.PUBLIC_URL}/img/pc.svg`} alt=''/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 liner">
                            <div className="title_v2_home">DIE APP</div>
                            <p className="content">Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses
                            getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war,
                            als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus
                            unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren
                            Ungeziefer verwandelt. Und es war ihnen wie eine Bestätigung ihrer neuen
                            Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich
                            erhob und ihren jungen Körper dehnte.</p>

                            <div className="row g-0">
                                <div className="col carousel">
                                    <input type="radio" name="position"  />
                                    <input type="radio" name="position"  />
                                    <input type="radio" name="position" defaultChecked={checked}/>
                                    <input type="radio" name="position" />
                                    <input type="radio" name="position"  />
                                    <main id="carousel">
                                        <div className="item" id="item1"><img src={`${process.env.PUBLIC_URL}/img/die_app_l.svg`} alt=''/></div>
                                        <div className="item" id="item2"><img src={`${process.env.PUBLIC_URL}/img/die_app_l.svg`} alt=''/></div>
                                        <div className="item" id="item3"><img src={`${process.env.PUBLIC_URL}/img/die_app_1.svg`} alt=''/></div>
                                        <div className="item" id="item4"><img src={`${process.env.PUBLIC_URL}/img/die_app_r.svg`} alt=''/></div>
                                        <div className="item" id="item5"><img src={`${process.env.PUBLIC_URL}/img/die_app_r.svg`} alt=''/></div>
                                    </main>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </section>
            <section className="main_checklist">
                <div className="container-fluid px-0 content">
                    <div className="row g-0">
                        <div className="col-md-1"></div>
                        <div className="col-md-5 line">
                            <img src={`${process.env.PUBLIC_URL}/img/check.svg`} className="check" alt=''/>
                            <p>Vorteil 1 Vorteil 1 Vorteil 1</p>
                            <p>Vorteil 1Vorteil 1Vorteil 1</p>

                            <img src={`${process.env.PUBLIC_URL}/img/check.svg`} className="check" alt=''/>
                            <p>Vorteil 1 Vorteil 1 Vorteil 1</p>
                            <p>Vorteil 1Vorteil 1Vorteil 1</p>

                            <img src={`${process.env.PUBLIC_URL}/img/check.svg`} className="check" alt=''/>
                            <p>Vorteil 1 Vorteil 1 Vorteil 1</p>
                            <p>Vorteil 1Vorteil 1Vorteil 1</p>

                        </div>
                        <div className="col-md-5">
                            <img src={`${process.env.PUBLIC_URL}/img/check.svg`} className="check" alt=''/>
                            <p>Vorteil 1 Vorteil 1 Vorteil 1</p>
                            <p>Vorteil 1Vorteil 1Vorteil 1</p>

                            <img src={`${process.env.PUBLIC_URL}/img/check.svg`} className="check" alt=''/>
                            <p>Vorteil 1 Vorteil 1 Vorteil 1</p>
                            <p>Vorteil 1Vorteil 1Vorteil 1</p>

                            <img src={`${process.env.PUBLIC_URL}/img/check.svg`} className="check" alt=''/>
                            <p>Vorteil 1 Vorteil 1 Vorteil 1</p>
                            <p>Vorteil 1Vorteil 1Vorteil 1</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="main_video">
                <div className="container-fluid px-0 line">
                    <div className="row g-0">
                        <div className="col-md-2 werist-l"></div>
                        <div className="col-md-5 werist  center-block text-center"><div className="title">{t("wewantu").toUpperCase()}</div></div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>
                
                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-md-1 werist-l"></div>
                        <div className="col-md-5 werist  center-block text-center"><div className="title">{t("t_connect").toUpperCase()}</div></div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>
                <div className="container-fluid px-0 content">
                    <div className="row g-0">
                        <div className="col-md center-block text-center">
                            <video width="50%" height="100%" controls>
                                <source src={`${process.env.PUBLIC_URL}/img/Wewantu_Animation.mp4`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </section>
            <section className="main_intro_app">        
                <div className="container-fluid px-0 content">
                    <div className="row g-0">
                        <div className="col-md center-block text-center">
                            <div>{t("t_download_the_wewantu_app_now").toUpperCase()}</div>
                            <div>{t("t_and_start_directly").toUpperCase()}</div>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md center-block text-center">
                            <Link to="#"><img src={`${process.env.PUBLIC_URL}/img/appstore.svg`} alt=''/></Link> 
                            <Link to="#"><img src={`${process.env.PUBLIC_URL}/img/chplay.svg`} alt=''/></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="main_contact" id="main_contact">
                <div className="container-fluid px-0 line">
                    <div className="row g-0">
                        <div className="col-md-1 werist-l"></div>
                        <div className="col-md-5 werist center-block text-center"><div className="title">INVESTOR</div></div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>
                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-md-2 werist-l"></div>
                        <div className="col-md-5 werist  center-block text-center"><div className="title">RELATIONS</div></div>
                        <div className="col-md werist-r"></div>
                    </div>
                </div>
                <div className="container-fluid px-0 content">
                    <div className="row g-0">
                        <div className="col-md-1"></div>
                        <div className="col-md-4 text">
                            <p>Jemand musste Josef K. verleumdet haben, denn ohne dass er
                            etwas Böses getan hätte, wurde er eines Morgens verhaftet.
                            »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn
                            überleben. Als Gregor Samsa eines Morgens aus unruhigen
                            Träumen erwachte, fand er sich in seinem Bett zu einem
                            ungeheueren Ungeziefer verwandelt. Und es war ihnen wie
                            eine Bestätigung ihrer neuen Träume und guten Absichten, als
                            am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren
                            jungen Körper dehnte.</p>
                            <p>»Es ist ein eigentümlicher Apparat«, sagte der Offizier zu dem
                            Forschungsreisenden und überblickte mit einem
                            gewissermaßen bewundernden Blick den ihm doch
                            wohlbekannten Apparat. Sie hätten noch ins Boot springen
                            können, aber der Reisende hob ein schweres, geknotetes Tau
                            vom Boden, drohte ihnen damit und hielt sie dadurch von dem
                            Sprunge ab. In den letzten Jahrzehnten ist das Interesse an
                            Hungerkünstlern sehr zurückgegangen. Aber sie überwanden
                            sich, umdrängten den Käfig und wollten sich gar nicht</p>
                            <p>fortrühren. Jemand musste Josef K. verleumdet haben, denn
                            ohne dass er etwas Böses getan hätte, wurde er eines Morgens
                            verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham
                            ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen
                            Träumen erwachte, fand er sich in seinem Bett zu einem 
                            </p>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md">
                            <p className="title_v3">{t("t_contact_us").toUpperCase()}:</p>
                            <form id="contact-form" name="contact-form" action="#" method="POST">
                                <div className="row">
                                    <div className="col-md">
                                        <div className="md-form mb-0">
                                            <input type="text" id="company" name="company" className="form-control" placeholder={t("name_company").toUpperCase()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <div className="md-form mb-0">
                                            <input type="text" id="name" name="name" className="form-control" placeholder="NAME" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <div className="md-form mb-0">
                                            <input type="text" id="subject" name="subject" className="form-control" placeholder="SUBJECT" />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <div className="md-form">
                                            <textarea type="text" id="messages" name="messages" rows="8" className="form-control md-textarea" placeholder={t("messages").toUpperCase()}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </section>
            <section className="main_team" id="main_team">        
                <div className="container-fluid px-0 content">
                    <div className="row g-0">
                        <div className="col-md center-block text-center">
                            <p className="title_v2_home">{t("t_the_wewantu_founder_team").toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-2"></div>
                        <div className="col-md text-center">
                            <img src={`${process.env.PUBLIC_URL}/img/p1.png`} className="imgteam" alt=''/> 
                            <p>VORNAME, NAME </p>
                            <p>E-MAIL </p>
                            <p><a href="#" className="email"> zum Kurzprofil</a></p>
                        </div>
                        <div className="col-md center-block text-center">
                            <img src={`${process.env.PUBLIC_URL}/img/p2.png`} className="imgteam" alt=''/> 
                            <p>VORNAME, NAME </p>
                            <p>E-MAIL </p>
                            <p><a href="#" className="email">  zum Kurzprofil</a></p>
                        </div>                
                        <div className="col-md center-block text-center">
                            <img src={`${process.env.PUBLIC_URL}/img/p3.png`} className="imgteam" alt=''/> 
                            <p>VORNAME, NAME </p>
                            <p>E-MAIL </p>
                            <p><a href="#" className="email">  zum Kurzprofil</a></p>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-2"></div>
                        <div className="col-md center-block text-center">
                            <img src={`${process.env.PUBLIC_URL}/img/p4.png`} className="imgteam"/> 
                            <p>VORNAME, NAME </p>
                            <p>E-MAIL </p>
                            <p><a href="#" className="email">  zum Kurzprofil</a></p>
                        </div>
                        <div className="col-md center-block text-center">
                            <img src={`${process.env.PUBLIC_URL}/img/p5.png`} className="imgteam"/> 
                            <p>VORNAME, NAME </p>
                            <p>E-MAIL </p>
                            <p><a href="#" className="email">  zum Kurzprofil</a></p>
                        </div>                
                        <div className="col-md center-block text-center">
                            <img src={`${process.env.PUBLIC_URL}/img/p6.png`} className="imgteam"/> 
                            <p>VORNAME, NAME </p>
                            <p>E-MAIL </p>
                            <p><a href="#" className="email">  zum Kurzprofil</a></p>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </section>
            <Footer />
        </React.Fragment>
    );
}

export default Index;