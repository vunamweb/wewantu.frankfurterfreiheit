import React, { useState, useEffect } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { Avatar } from 'antd';

import { connect } from "react-redux";
import { setActiveTab } from "../../../redux/actions";
import SerchCenterModal from '../Modal/SerchCenterModal';
import SerchCenterWachlistModal from '../Modal/SerchCenterWachlistModal';
import { APIClient } from '../../../helpers/apiClient';
import { toast } from 'react-toastify';
import RatingStar from '../Component/RatingStar';

import { useTranslation } from 'react-i18next';

function SearchCenterDisplay(props) {
    const JsonData = props.searchData;
    const [loading, setloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [currentUser, setcurrentUser] = useState({});
    const [currentIndex, setcurrentIndex] = useState(-1);
    const admin = getLoggedInUser()[0];
    const [isWatchlist, setIsWatchlist] = useState({});
    const { t } = useTranslation();
    useEffect(() => {
        // This function will run after the component renders
        const timer = setTimeout(() => {
            if (props.component.state.loading)
                props.component.setState({ loading: false })
        }, 200);

        // Cleanup function to clear the timer when the component unmounts
        return () => clearTimeout(timer);
    });

    /*try {
        setTimeout(props.component.setState({ loading: false }), 2000);
    } catch (error) {
    }*/

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancelDetail = () => {


        setIsModalOpenDetail(false);
    }

    const handleDTClick = (id, index) => {
        setcurrentIndex(index)
        setIsModalOpenDetail(true)
        setcurrentUser(id)
        // setIsModalOpen(true)
    }
    const handleWLClick = (id, index) => {
        addwatclist(id)
        //JsonData.splice(index, 1);
        setIsModalOpenDetail(false);
    }

    const handleBlockClick = (id, index) => {
        blockwatclist(id)
        JsonData.splice(index, 1);
        setIsModalOpenDetail(false);
    }

    const handleHiddenClick = (id, index) => {
        JsonData.splice(index, 1);
        setIsModalOpenDetail(false);
    }

    const addwatclist = (values) => {
        if (currentUser) {
            new APIClient().get('user/ce5ed1af-adb5-4336-bc04-e70f17f30a16/user_template')
                .then(res => {
                    if (res) {
                        let tmp = values.user.prename + ' ' + values.user.lastname + ',\r' + res[0].description;
                        let obj_watchlist = {
                            message: tmp,
                            user_add_id: values.user.user_id,
                            user_id: admin.user_id,
                            type: 1
                        };
                        // console.log(obj_watchlist);
                        new APIClient().create('user_watchlist', obj_watchlist).then(val => {
                            if (val) {
                                toast.success('add successfully')
                            }
                        })
                    }
                });
        }

        /**/
    }

    const blockwatclist = (values) => {
        if (currentUser) {
            new APIClient().get('user/ce5ed1af-adb5-4336-bc04-e70f17f30a16/user_template')
                .then(res => {
                    if (res) {
                        let tmp = values.user.prename + ' ' + values.user.lastname + ',\r' + res[0].description;
                        let obj_watchlist = {
                            message: tmp,
                            user_add_id: values.user.user_id,
                            user_id: admin.user_id,
                            type: 0
                        };
                        console.log(obj_watchlist);
                        new APIClient().create('user_watchlist', obj_watchlist).then(val => {
                            if (val) {
                                toast.success('Block successfully')
                            }
                        })
                    }
                });
        }

        /**/
    }
    const rows = [...Array(Math.ceil(JsonData.length / 4))];
    JsonData.forEach(info => {
        new APIClient().get('user/' + admin.user_id + '/user_watchlist').then(res => {
            if (res.length > 0) {
                let check = res.filter(x => { return x.user_add_id == info.user.user_id });
                if (check.length > 0 && !isWatchlist[info.user.user_id]) {
                    const upd = { ...isWatchlist };
                    upd[info.user.user_id] = true;
                    setIsWatchlist(upd);
                }
            }
        });
    });
    const productRows = rows.length > 0 && rows.map((row, idx) => JsonData.slice(idx * 4, idx * 4 + 4));
    const DisplayData = productRows.length > 0 && productRows.map((row, idx) => (
        <div className='row' key={idx}>
            {
                row.map((info, index) => {
                    info.address = (info.address != undefined) ? info.address : [
                        {
                            street: null,
                            city: null,
                            country: null,
                        }
                    ];


                    // 
                    return (
                        <div className='col-md-3'>
                            <div className="info">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Avatar className='avatar' size={80}>{(info.user.prename.slice(0, 1)).toUpperCase()}{(info.user.lastname.slice(0, 1)).toUpperCase()}</Avatar>
                                    </div>

                                    <div className="col-md-6">
                                        <button onClick={(e) => handleDTClick(info, idx * 4 + index)} data-id={'detail_' + info.job_search_profile_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">{t("t_details").toUpperCase()}</button>
                                        <button disabled={isWatchlist[info.user.user_id]} onClick={(e) => handleWLClick(info, idx * 4 + index)} data-id={'watchlist_' + info.job_search_profile_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">{t("t_add_to_watchlist").toUpperCase()}</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md'>
                                        <div className="name1"><h4>{info.user.prename} {info.user.lastname}</h4></div>
                                        <div><img src="assets/img/location.svg" alt='' /> {info.address[0].street} {info.address[0].city} {info.address[0].country === null ? '' : ',' + info.address[0].country}</div>
                                        <div><img src="assets/img/year.svg" alt='' />{info.address[0].year_birthday}</div>
                                        <RatingStar user_id={info.user.user_id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )

            }
        </div>
    )
    );
    return (
        <React.Fragment>
            {loading === true ? (<div className="loader"></div>) : ""}
            <div className="table table-searchcenter">
                <div>
                    {DisplayData}
                </div>
            </div>
            {Object.keys(currentUser).length > 0 && (<SerchCenterModal currentUser={currentUser} handleWLClick={handleWLClick} handleBlockClick={handleBlockClick} handleHiddenClick={handleHiddenClick} currentIndex={currentIndex} JsonData={JsonData ? JsonData : null} isModalOpenDetail={isModalOpenDetail} handleCancelDetail={handleCancelDetail} />)}
            {Object.keys(currentUser).length > 0 && (<SerchCenterWachlistModal currentUser={currentUser} JsonData={JsonData ? JsonData : null} isModalOpen={isModalOpen} handleCancel={handleCancel} />)}
        </React.Fragment>

    )
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {
    setActiveTab
})(SearchCenterDisplay);