import React, { useState, useEffect } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { Avatar } from 'antd';

import { connect } from "react-redux";
import { setActiveTab } from "../../../redux/actions";
import SerchCenterWachlistModal from '../Modal/SerchCenterWachlistModal';
import { APIClient } from '../../../helpers/apiClient';
import { toast } from 'react-toastify';
import RatingStar from '../Component/RatingStar';

import { useTranslation } from 'react-i18next';
import UserItem from '../Component/UserItem';
import UserDetail from '../Component/UserDetail';
import functions from '../../../function/function';

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
    const [DisplayData, setDisplayData] = useState(null);

    const [userPayments, setUserPayments] = useState([]);

    useEffect(() => {
        // This function will run after the component renders
        // const timer = setTimeout(() => {
        //     if (props.component.state.loading)
        //         props.component.setState({ loading: false })
        // }, 200);

        // Cleanup function to clear the timer when the component unmounts
        // return () => clearTimeout(timer);
    });

    useEffect(() => {
        if (props.activeTab == "searchcenter") {
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

            new APIClient().get('user/' + admin.user_id + '/user_payment').then(res => {
                if (res.length > 0) {
                    setUserPayments(res);
                }
            })

        }

    }, [props.activeTab])
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
        setcurrentUser(id)
        setIsModalOpenDetail(true)

        // setIsModalOpen(true)
    }
    const handleWLClick = (id, index) => {
        addwatclist(id)
        //JsonData.splice(index, 1);
        setIsModalOpenDetail(false);
    }

    const handleBlockClick = (id, index) => {
        let job_search_profile_id = null;

        try {
            job_search_profile_id = props.component.state.searchItem.job_search_profile_id;
        } catch (error) {
            job_search_profile_id = null;
        }

        blockwatclist(id);

        if (job_search_profile_id == null)
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
                        let job_search_profile_id;

                        try {
                            job_search_profile_id = props.component.state.searchItem.job_search_profile_id;
                        } catch (error) {
                            job_search_profile_id = null;
                        }

                        let tmp = values.user.prename + ' ' + values.user.lastname + ',\r' + res[0].description;
                        let obj_watchlist = {
                            message: tmp,
                            user_add_id: values.user.user_id,
                            user_id: admin.user_id,
                            type: 0,
                            job_search_profile_id: job_search_profile_id
                        };

                        new APIClient().create('user_watchlist', obj_watchlist).then(val => {
                            if (val) {
                                toast.success('Block successfully');

                                obj_watchlist.user_watchlist_id = val.user_watchlist_id;

                                console.log(obj_watchlist);

                                // update local value of watchlist
                                obj_watchlist.user = {};
                                obj_watchlist.user.user_id = admin.user_id;

                                functions.addItemIntoWatchList(obj_watchlist);

                                // update count of search
                                try {
                                    props.component.setState({ countSearch: JsonData.length, callBack: true });
                                } catch (error) {
                                    console.log(error);
                                }
                                // end
                            }
                        })
                    }
                });
        }

        /**/
    }
    const rows = [...Array(Math.ceil(JsonData.length / 4))];

    const productRows = rows.length > 0 && rows.map((row, idx) => JsonData.slice(idx * 4, idx * 4 + 4));

    useEffect(() => {
        setloading(true);

        let DisplayData = productRows.length > 0 && productRows.map((row, idx) =>
        (
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
                            <>
                                <UserItem info={info} index={idx * 4 + index} handleDTClick={handleDTClick} handleWLClick={handleWLClick} userPayments={userPayments} watchlisted={isWatchlist[info.user.user_id]} />
                            </>
                        )
                    }
                    )

                }
            </div>
        )
        );
        setDisplayData(DisplayData);
        setloading(false);

    }, [JsonData]);

    const onNextDetail = () => {
        if (currentIndex < JsonData.length) {
            setcurrentUser(JsonData[currentIndex + 1]);
            setcurrentIndex(currentIndex + 1);
        }
    }

    const onPrevDetail = () => {
        if (currentIndex > 0) {

            setcurrentUser(JsonData[currentIndex - 1]);
            setcurrentIndex(currentIndex - 1);
        }
    }


    return (
        <React.Fragment>
            {loading == true && (<div className="loader"></div>)}
            <div className="table table-searchcenter">
                <div>
                    {DisplayData}

                </div>
            </div>
            {Object.keys(currentUser).length > 0 && (<UserDetail onNext={onNextDetail} onPrev={onPrevDetail} isWatchlist={isWatchlist[currentUser.user.user_id]} user={currentUser} handleWLClick={handleWLClick} handleBlockClick={handleBlockClick} handleHiddenClick={handleHiddenClick} currentIndex={currentIndex} isModalOpen={isModalOpenDetail} handleCancelDetail={handleCancelDetail} />)}
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