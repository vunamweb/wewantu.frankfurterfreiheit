import { Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import RatingStar from './RatingStar';
import { t } from "i18next";
import config from '../../../config';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { APIClient } from '../../../helpers/apiClient';

function UserItem({ info, index, handleDTClick, handleWLClick, watchlisted }) {
    const admin = getLoggedInUser()[0];
    const [hasPayment, setHasPayment] = useState(true);
    useEffect(() => {
        if (admin.userType != 0)
            new APIClient().get('user/' + admin.user_id + '/user_payment').then(res => {
                if (res.length > 0) {
                    let user_payment_list = res.filter((payment) => { return payment.user_id_payment == info.user.user_id && payment.type == "message" });
                    if (user_payment_list.length > 0) {
                        setHasPayment(true);
                    }
                } else {
                    setHasPayment(false);
                }
            })
            
    }, [info]);
    const fieldsHide = config.USER_FIELD_HIDE;
    const prename = (!hasPayment && fieldsHide.includes("prename")) ? "*****" : info.user.prename;
    const lastname = (!hasPayment && fieldsHide.includes("lastname")) ? "*****" : info.user.lastname;
    const city = (!hasPayment && fieldsHide.includes("city")) ? "*****" : info.address[0].city;
    const postal_code = (!hasPayment && fieldsHide.includes("postal_code")) ? "*****" : info.address[0].postal_code;
    const country = (!hasPayment && fieldsHide.includes("country")) ? "*****" : info.address[0].country;
    const year_birthday = (!hasPayment && fieldsHide.includes("year_birthday")) ? "*****" : info.address[0].year_birthday;

    return (
        <>
            <div className='col-md-3'>
                <div className="info">
                    <div className="row">
                        <div className="col-md-4">
                            <Avatar className='avatar' size={80}>{(info.user.prename.slice(0, 1)).toUpperCase()}{(info.user.lastname.slice(0, 1)).toUpperCase()}</Avatar>
                        </div>

                        <div className="col-md-8">
                            <button onClick={(e) => handleDTClick(info, index)} data-id={'detail_' + info.job_search_profile_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">{t("t_details").toUpperCase()}</button>
                            <button disabled={watchlisted} onClick={(e) => handleWLClick(info, index)} data-id={'watchlist_' + info.job_search_profile_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">{t("t_add_to_watchlist").toUpperCase()}</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-12'>
                            {fieldsHide.includes("prename")}
                            <div className="gold name1"><h4>{prename} {lastname}</h4></div>
                            <div class="loc">
                                <img src="assets/img/location.svg" alt='' />
                                {postal_code} {city}
                                {country === null ? '' : ',' + country}
                            </div>
                            <div class="loc"><img src="assets/img/year.svg" alt='' />
                                {year_birthday}
                            </div>
                            <RatingStar user_id={info.user.user_id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserItem;
