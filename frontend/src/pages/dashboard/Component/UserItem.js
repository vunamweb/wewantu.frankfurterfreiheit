import { Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import RatingStar from './RatingStar';
import {t} from "i18next";

function UserItem({info, index, handleDTClick, handleWLClick, watchlisted}) {
    
    return (
        <>
            <div className='col-md-3'>
                <div className="info">
                    <div className="row">
                        <div className="col-md-6">
                            <Avatar className='avatar' size={80}>{(info.user.prename.slice(0, 1)).toUpperCase()}{(info.user.lastname.slice(0, 1)).toUpperCase()}</Avatar>
                        </div>

                        <div className="col-md-6">
                            <button onClick={(e) => handleDTClick(info, index)} data-id={'detail_' + info.job_search_profile_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">{t("t_details").toUpperCase()}</button>
                            <button disabled={watchlisted} onClick={(e) => handleWLClick(info, index)} data-id={'watchlist_' + info.job_search_profile_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">{t("t_add_to_watchlist").toUpperCase()}</button>
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
        </>
    );
}

export default UserItem;