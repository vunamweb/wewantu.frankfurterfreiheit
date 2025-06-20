import React, { useEffect, useState } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { Modal, Form, Avatar } from 'antd';

import { useTranslation } from 'react-i18next';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { APIClient } from '../../../helpers/apiClient';
import RatingStar from '../Component/RatingStar';
import { useSelector } from 'react-redux';
import config from '../../../config';


function UserDetail({ isModalOpen, user, index, handleCancelDetail, handleWLClick, handleBlockClick, setActiveTab, isWatchlist, onNext, onPrev }) {
    // const job_search_profile = job_search_profile
    const currentUser = user;
    const currentIndex = index;
    const [hasPayment, setHasPayment] = useState(true);
    const language = useSelector(state => state.Layout.language);

    const admin = getLoggedInUser()[0];
    const [form2] = Form.useForm();
    const toggleTab = tab => {
        setActiveTab(tab)
        handleCancelDetail()
    }
    const { t } = useTranslation();
    const [tableData, settableData] = useState([]);
    const [loadingDetail, setLoadingDetail] = useState(true);

    const addwatclist = (values) => {
        handleWLClick(currentUser, currentIndex)
    }

    const blockwatclist = (values) => {
        handleBlockClick(currentUser, currentIndex)
    }


    const getNameJobFromId = (id) => {
        let jobs = localStorage.getItem('job');

        try {
            jobs = JSON.parse(jobs);
        } catch (error) {
            jobs = [];
        }
        let name = null;

        jobs.map((item, index) => {
            if (item.value == id)
                name = item.label;
        })

        return name;
    }

    useEffect(() => {
        if (currentUser && currentUser.user) {
            // console.log(123);
            new APIClient().get('user/' + admin.user_id + '/user_template').then(res => {
                if (res.length > 0) {
                    let tmp = currentUser.user.prename + ' ' + currentUser.user.lastname; //+ ',\r' + res[0].description;
                    form2.setFieldsValue({
                        message: tmp,
                        job_search_profile_id: currentUser.job_search_profile_id,
                        user_id: admin.user_id
                    });
                }
            });

            if (admin.userType != 0)
                new APIClient().get('user/' + admin.user_id + '/user_payment').then(res => {
                    if (res.length > 0) {
                        let user_payment_list = res.filter((payment) => { return payment.user_id_payment == currentUser.user.user_id });
                        if (user_payment_list.length > 0) {
                            setHasPayment(true);
                        }
                        else {
                            setHasPayment(false);
                        }
                    } else {
                        setHasPayment(false);
                    }
                })
        }


    }, [currentUser, isModalOpen])

    useEffect(() => {
        setLoadingDetail(true);
        const fecthData = async () => {
            if (currentUser.user) {
                let data = { ...currentUser };

                if (!currentUser.address) {
                    let addresslist = await new APIClient().get('addresslist');
                    const addr = addresslist !== null && addresslist.filter(item => item.address_id !== null && item.address_id.includes(currentUser.user.address_id));
                    if (addr.length > 0)
                        data.address = addr;
                }
                if (!currentUser.company) {
                    let companylist = await new APIClient().get('companylist');
                    const company = companylist !== null && companylist.filter(item => item.company_id !== null && item.company_id.includes(currentUser.user.company_id))
                    if (company.length > 0)
                        data.company = company;
                }

                await new APIClient().get('user/' + currentUser.user.user_id + '/languages').then(val => val.length > 0 ? data.languages = val : data.languages = null)
                await new APIClient().get('user/' + currentUser.user.user_id + '/educational_stages').then(val => val.length > 0 ? data.educational_stages = val : data.educational_stages = null);
                await new APIClient().get('user/' + currentUser.user.user_id + '/driver_licenses').then(val => val.length > 0 ? data.driver_licenses = val : data.driver_licenses = null);

                settableData([data]);
                setLoadingDetail(false);
            }
        }

        fecthData();

    }, [currentUser, isModalOpen])

    const rendereducational_stageskey = (element) => {
        return typeof element !== 'undefined' && element !== null && element.map(val => {
            return (<><span>{val.educational_stage_type.educational_stage}</span><br /></>)
        })
    };

    const rendereducational_stagesvalue = (element) => {
        return typeof element !== 'undefined' && element !== null && element.map(val => {
            return (<><span>{val.institute}</span><br /></>)
        })
    };

    const renderdriver_licenses = (element) => {
        if (typeof element === 'undefined' || element === null)
            return (<><span>Emty</span></>)
        return typeof element !== 'undefined' && element !== null && element.map((val, index) => {
            if (index > 0)
                if (index === element.length - 1)
                    return (<><span>, {val.driver_license}</span></>)
                else
                    return (<><span>, {val.driver_license}</span></>)
            else
                return (<><span>{val.driver_license}</span></>)
        })

    };

    const renderlang = (lang) => {
        return typeof lang !== 'undefined' && lang.map(val => {
            let lang = val.language.language;
            if (language == "de") {
                lang = val.language.de;
            }
            return (<><span>{lang}</span><br /></>)
        })
    };

    const rendervalue = (lang) => {
        return typeof lang !== 'undefined' && lang.map(val => {
            switch (val.level) {
                case 1:
                    return (<><span>{t('business_fluent_in_spoken_and_written')}</span><br /></>);
                case 2:
                    return (<><span>{t('school_level')}</span><br /></>);
                case 3:
                    return (<><span>{t('Can_order_a_pizza')}</span><br /></>);
                default:
                    return (<><span>{t('mother_tongue')}</span><br /></>);
            }

        })
    };
    return (
        <React.Fragment>

            <Modal title={'Search for /in '} open={isModalOpen} onCancel={handleCancelDetail} width={1000} footer=" ">
                {(loadingDetail) && <div className='loader'></div>}
                {(!loadingDetail) &&
                    <Swiper
                        scrollbar={{
                            hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                    >
                        <div className='row'>
                            <div class="col-md-1">
                                <a href='javascript:void(0)'>
                                    PREV
                                </a>
                            </div>
                            <div className='col-md-10'>
                                {tableData && tableData.map((item, idx) => {
                                    let hobbiesList, hobbies = '';

                                    let fieldsHide = config.USER_FIELD_HIDE;

                                    let prename = (!hasPayment && fieldsHide.includes("prename")) ? "*****" : item.user.prename;
                                    let lastname = (!hasPayment && fieldsHide.includes("lastname")) ? "*****" : item.user.lastname;
                                    let city = (!hasPayment && fieldsHide.includes("city")) ? "*****" : item.address[0].city;
                                    let postal_code = (!hasPayment && fieldsHide.includes("postal_code")) ? "*****" : item.address[0].postal_code;
                                    let country = (!hasPayment && fieldsHide.includes("country")) ? "*****" : item.address[0].country;
                                    let year_birthday = (!hasPayment && fieldsHide.includes("year_birthday")) ? "*****" : item.address[0].year_birthday;

                                    try {
                                        hobbiesList = item.user.hobbies;
                                        hobbiesList = JSON.parse(hobbiesList);

                                        for (let i = 0; i < hobbiesList.length; i++) {
                                            if (i < hobbiesList.length - 1)
                                                hobbies = hobbies + hobbiesList[i] + ', ';
                                            else
                                                hobbies = hobbies + hobbiesList[i];
                                        }
                                    } catch (error) {
                                        hobbies = item.user.hobbies;
                                    }

                                    return (
                                        <SwiperSlide>
                                            <div className="row details">
                                                <div className='col-md-1'><a href='#' onClick={() => onPrev()}>PREV</a></div>
                                                <div className="col-md-3 pleft">
                                                    <Avatar className='avatar' size={80}>{(item.user.prename.slice(0, 1)).toUpperCase()}{(item.user.lastname.slice(0, 1)).toUpperCase()}</Avatar>
                                                    <div className="name">{prename} {lastname}</div>
                                                    <div className='popup-infor' style={{ "paddingTop": "%5" }}><img src="assets/img/year.svg" alt='' /><span style={{ "paddingLeft": "10px" }}>{year_birthday}</span></div>
                                                    <div className='popup-infor'><img src="assets/img/location.svg" alt='' /><span style={{ "paddingLeft": "10px" }}>{postal_code} {city} {country ? ',' + country : ''}</span></div>

                                                    <div class="rating"><RatingStar user_id={item.user.user_id} /></div>

                                                    {(handleWLClick) &&  // chỉ hiển thị với detail từ search center
                                                        <div className="modal-footer">
                                                            <button disabled={isWatchlist} type="button" className="btn btn-primary btn-sm button-search" onClick={() => { blockwatclist() }}><span className='profile-search'>{t('t_dont_show_again').toUpperCase()}</span></button>
                                                            <button disabled={isWatchlist} type="primary" className="btn btn-primary btn-sm button-search" onClick={() => { addwatclist() }}><span className='profile-search'>{t('t_add_to_watchlist').toUpperCase()}</span></button>
                                                            <button type="button" className="btn btn-primary btn-sm button-search" onClick={() => { toggleTab('credits') }}><span className='profile-search'>send E-Mail ? check Credit?</span></button>
                                                            <button type="button" className="hide btn btn-primary btn-sm button-search" onClick={() => { toggleTab('credits') }}><span className='profile-search'>{t('t_get_lead_for_x_credit').toUpperCase()}</span></button>
                                                        </div>
                                                    }

                                                </div>
                                                <div className="col-md-7 about-1">
                                                    <div className="row" style={{ "paddingTop": "2%" }}>
                                                        {/* <div className='popup-infor-1'>
                                                    <img src="assets/img/location.svg" alt='' /> {item.address[0].house_number} {item.address[0].street} {item.address[0].state} {item.address[0].city} {item.plz_at_job_location} {item.address[0].postal_code}
                                                    </div> */}
                                                        <span class="hide">{t('t_job_profile')}</span><br /><br />
                                                        {
                                                            item.profiles.map((item, index) => {
                                                                item.job_id = (item.job_id != undefined) ? item.job_id : 0;

                                                                let jobLabel = getNameJobFromId(item.job_id);
                                                                let ambition = "";
                                                                if (item.ambitions) {
                                                                    let ambitions = JSON.parse(item.ambitions.ambition);
                                                                    ambition = ambitions[language];
                                                                }
                                                                let salary = new Intl.NumberFormat('de-DE', {
                                                                    style: 'currency',
                                                                    currency: 'EUR'
                                                                }).format(item.desired_salary * 500);

                                                                return (
                                                                    <div class="row">

                                                                        <div className="col-md-4 gray">
                                                                            <span>{t('t_job_desire')}</span><br />
                                                                            <span>{t('t_location')}</span><br />
                                                                            <span>{t('t_salary_request')}</span><br />
                                                                            <span>{t('t_working_hours_week')}</span><br />
                                                                            <span>{t('t_days_week')}</span><br />
                                                                            <span>{t('t_holiday_days')}</span><br />
                                                                            <span>{t('t_home_office')}</span><br />
                                                                            <span>{t('t_working_on weekends')}</span><br />
                                                                            <span>{t('t_night_work')}</span><br />
                                                                            <span>{t('t_ambitions')}</span><br />
                                                                        </div>
                                                                        <div className="col-md-8 bold">
                                                                            <span>{jobLabel}</span><br />
                                                                            <span>{item.max_distance} km {t("t_distance_to")} {item.postalcode}</span><br />
                                                                            <span>{salary}</span><br />
                                                                            <span>{item.desired_weekly_hours} {t("t_hours")}</span><br />
                                                                            <span>{item.desired_working_days_per_week} {t("t_days")}</span><br />
                                                                            <span>{item.desired_holiday_days_per_year} {t("t_days")}</span><br />
                                                                            <span>{t(item.desired_work_at_home.value.toLowerCase())}</span><br />
                                                                            <span>{t(item.desired_work_at_weekend.value.toLowerCase())}</span><br />
                                                                            <span>{t(item.desired_work_at_night.value.toLowerCase())}</span><br />
                                                                            <span>{ambition}</span><br />

                                                                        </div>

                                                                        <hr />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="row" style={{ "paddingTop": "2%" }}>
                                                        <div className="row">
                                                            <div className='row'>
                                                                <div className='col-md-4 gray'><span>{t('t_place_of_residence')}</span></div>
                                                                <div className="col-md-8 bold"><span>{item.address[0].house_number} {item.address[0].street} {item.address[0].state} {item.address[0].city}{item.address[0].country ? ', ' + item.address[0].country : ''}</span></div>
                                                            </div>


                                                            <div className='row'>
                                                                <div className='col-md-4 gray'><span>{t('t_language_knowledge')}</span></div>
                                                                <div className="col-md-8 bold">
                                                                    {
                                                                        item.languages !== null ? renderlang(item.languages) : ''
                                                                    }
                                                                    {
                                                                        item.languages !== null ? rendervalue(item.languages) : ''
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-md-4 gray'>{rendereducational_stageskey(item.educational_stages)}</div>
                                                                <div className="col-md-8 bold">{rendereducational_stagesvalue(item.educational_stages)}</div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-md-4 gray'><span>{t("t_driver_s_license")}</span></div>
                                                                <div className="col-md-8 bold"><span>{renderdriver_licenses(item.driver_licenses)}</span></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-md-4 gray'><span>{t('t_passenger_transport')}</span></div>
                                                                <div className="col-md-8 bold"><span>{item.user.passenger_transport === 0 ? t('that_s_obvious') : t('people_what')}</span></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-md-4 gray'><span>{t('t_hobbies')}</span></div>
                                                                <div className="col-md-8 bold"> <span>{hobbies}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-1'><a href='#' onClick={() => onNext()} >NEXT</a></div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                                )}
                            </div>
                            <div class="col-md-1">
                                <a href='javascript:void(0)'>
                                    NEXT
                                </a>
                            </div>
                        </div>
                    </Swiper>
                }
            </Modal>
        </React.Fragment>
    );
}

export default UserDetail;
