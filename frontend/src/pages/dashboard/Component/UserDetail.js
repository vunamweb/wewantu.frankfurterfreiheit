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


function UserDetail({ isModalOpen, user, index, handleCancelDetail, handleWLClick, handleBlockClick, setActiveTab, isWatchlist }) {
    // const job_search_profile = job_search_profile
    const currentUser = user;
    const currentIndex = index;

    const language = useSelector(state => state.Layout.language);

    const admin = getLoggedInUser()[0];
    const [form2] = Form.useForm();
    const toggleTab = tab => {
        setActiveTab(tab)
        handleCancelDetail()
    }
    const { t } = useTranslation();
    const [tableData, settableData] = useState([]);
    const [loading,setLoading] = useState(true);

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
            new APIClient().get('user/' + admin.user_id + '/user_template').then(res => {
                if (res) {
                    let tmp = currentUser.user.prename + ' ' + currentUser.user.lastname + ',\r' + res[0].description;
                    form2.setFieldsValue({
                        message: tmp,
                        job_search_profile_id: currentUser.job_search_profile_id,
                        user_id: admin.user_id
                    });
                }
            });
        }

    }, [currentUser,isModalOpen])

    useEffect(() => {
        setLoading(true);
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
                setLoading(false);
            }
        }

        fecthData();

    }, [currentUser,isModalOpen])

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
            return (<><span>{val.language.language}</span><br /></>)
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
                {(loading) && <div className='loader'></div>}
                {(!loading) &&
                    <Swiper
                        scrollbar={{
                            hide: true,
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                    >

                        {tableData && tableData.map((item, idx) => {
                            let hobbiesList, hobbies = '';

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
                                        <div className="col-md-2 pleft">
                                            <Avatar className='avatar' size={80}>{(item.user.prename.slice(0, 1)).toUpperCase()}{(item.user.lastname.slice(0, 1)).toUpperCase()}</Avatar>
                                            <div className="name">{item.user.prename} {item.user.lastname}</div>
                                            <div className='popup-infor' style={{ "paddingTop": "%5" }}><img src="assets/img/year.svg" alt='' />{item.address[0].year_birthday}</div>
                                            <div className='popup-infor'><img src="assets/img/location.svg" alt='' />{item.address[0].city} {item.address[0].country ? ',' + item.address[0].country : ''}</div>

                                            <RatingStar user_id={item.user.user_id} />

                                            {(handleWLClick) &&  // chỉ hiển thị với detail từ search center
                                            <div className="modal-footer">
                                                <button disabled={isWatchlist} type="button" className="btn btn-primary btn-sm button-search" onClick={() => { blockwatclist() }}><span className='profile-search'>{t('t_dont_show_again').toUpperCase()}</span></button>
                                                <button disabled={isWatchlist} type="primary" className="btn btn-primary btn-sm button-search" onClick={() => { addwatclist() }}><span className='profile-search'>{t('t_add_to_watchlist').toUpperCase()}</span></button>
                                                <button type="button" className="btn btn-primary btn-sm button-search" onClick={() => { toggleTab('credits') }}><span className='profile-search'>{t('t_get_lead_for_x_credit').toUpperCase()}</span></button>
                                            </div>
                                            }

                                        </div>
                                        <div className="col-md-10 about-1">
                                            <div className="row" style={{ "paddingTop": "2%" }}>
                                                {/* <div className='popup-infor-1'>
                                                    <img src="assets/img/location.svg" alt='' /> {item.address[0].house_number} {item.address[0].street} {item.address[0].state} {item.address[0].city} {item.plz_at_job_location} {item.address[0].postal_code}
                                                    </div> */}
                                                <span>{t('t_job_profile')}</span><br /><br />
                                                {
                                                    item.profiles.map((item, index) => {
                                                        item.job_id = (item.job_id != undefined) ? item.job_id : 0;

                                                        let jobLabel = getNameJobFromId(item.job_id);
                                                        let ambition = "";
                                                        if (item.ambitions) {
                                                            let ambitions = JSON.parse(item.ambitions.ambition);
                                                            ambition = ambitions[language];
                                                        }
                                                        return (
                                                            <div class="row">

                                                                <div className="col-md-3">
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
                                                                <div className="col-md-9">
                                                                    <span>{
                                                                        jobLabel}</span><br />
                                                                    <span>{item.max_distance} km PLZ {item.postalcode}</span><br />
                                                                    <span>{item.desired_salary * 500}</span><br />
                                                                    <span>{item.desired_weekly_hours}</span><br />
                                                                    <span>{item.desired_working_days_per_week}</span><br />
                                                                    <span>{item.desired_holiday_days_per_year}</span><br />
                                                                    <span>{item.desired_work_at_home.value}</span><br />
                                                                    <span>{item.desired_work_at_weekend.value}</span><br />
                                                                    <span>{item.desired_work_at_night.value}</span><br />
                                                                    <span>{ambition}</span><br />

                                                                </div>

                                                                <hr />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="row" style={{ "paddingTop": "2%" }}>
                                                <div className="col-md-3">
                                                    <span>{t('t_place_of_residence')}</span><br />
                                                    <span>{t('t_language_knowledge')}</span><br />
                                                    {
                                                        item.languages !== null ? renderlang(item.languages) : ''
                                                    }
                                                    {rendereducational_stageskey(item.educational_stages)}
                                                    <span>{t("t_driver_s_license")}</span><br />
                                                    <span>{t('t_passenger_transport')}</span><br />
                                                    <span>{t('t_hobbies')}</span><br />
                                                </div>
                                                <div className="col-md-9">
                                                    <span>{item.address[0].house_number} {item.address[0].street} {item.address[0].state} {item.address[0].city}{item.address[0].country ? ', ' + item.address[0].country : ''}</span><br /><br />
                                                    {
                                                        item.languages !== null ? rendervalue(item.languages) : ''
                                                    }
                                                    {rendereducational_stagesvalue(item.educational_stages)}
                                                    <span>{renderdriver_licenses(item.driver_licenses)}</span><br />
                                                    <span>{item.user.passenger_transport === 0 ? t('that_s_obvious') : t('people_what')}</span><br />
                                                    <span>{hobbies}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                        )}
                    </Swiper>
                }
            </Modal>
        </React.Fragment>
    );
}

export default UserDetail;